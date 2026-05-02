import React from "react";
import ReactDOM from "react-dom/client";
import { Play, Pause, Square, Check, Settings as SettingsIcon, MonitorPlay } from "lucide-react";
import { YouTubeBreakPlayer, type YouTubePlayer } from "./components/YouTubeBreakPlayer";
import { YouTubeDurationProbe } from "./components/YouTubeDurationProbe";
import { api } from "./lib/api";
import { translate } from "./lib/i18n";
import { buildQueuedVideo, getNextPlayableVideo, secondsToClock, secondsToHoursMinutes, videoSuggestionKey } from "./lib/youtube";
import type { CycleRecord, CycleType, DailyPlan, Language, Metrics, SavedVideo, TimerStatus, VideoInput } from "./types";
import "./styles.css";

type Tab = "setup" | "main" | "dashboard" | "history" | "settings";

const emptyMetrics: Metrics = {
  completedPomodoros: 0,
  totalFocusSeconds: 0,
  totalBreakSeconds: 0,
  completionRate: 0,
  averageEnergy: 0,
  averageFocus: 0,
  totalVideoSeconds: 0,
  adaptation: { suggestFocusMinutes: null, suggestBreakMinutes: null }
};

class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="app-shell">
          <section className="panel error-screen">
            <h1>FocusTube Pomodoro</h1>
            <p>La app encontró un error en pantalla, pero no se refrescó.</p>
            <pre>{this.state.error.message}</pre>
            <button className="primary" onClick={() => this.setState({ error: null })}>
              Volver a intentar
            </button>
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [language, setLanguage] = React.useState<Language>("en");
  const [activeTab, setActiveTab] = React.useState<Tab>("setup");
  const [settings, setSettings] = React.useState<Record<string, string>>({});
  const [plan, setPlan] = React.useState<DailyPlan | null>(null);
  const [cycles, setCycles] = React.useState<CycleRecord[]>([]);
  const [metrics, setMetrics] = React.useState<Metrics>(emptyMetrics);
  const [message, setMessage] = React.useState("");
  const t = (key: string) => translate(language, key);

  const refresh = React.useCallback(async () => {
    const [settings, today, cycleRows, metricRows] = await Promise.all([api.settings(), api.today(), api.cycles(), api.metrics()]);
    setLanguage((settings.language as Language) || "en");
    setSettings(settings);
    setPlan(today);
    setCycles(cycleRows);
    setMetrics(metricRows);
  }, []);

  React.useEffect(() => {
    refresh().catch((error) => setMessage(error.message));
  }, [refresh]);

  async function changeLanguage(next: Language) {
    setLanguage(next);
    await api.saveSettings({ language: next });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>{t("appTitle")}</h1>
          <p>{t("tagline")}</p>
        </div>
        <div className="language-switch" aria-label={t("language")}>
          <button className={language === "en" ? "active" : ""} onClick={() => changeLanguage("en")}>
            EN
          </button>
          <button className={language === "es" ? "active" : ""} onClick={() => changeLanguage("es")}>
            ES
          </button>
        </div>
      </header>

      <nav className="tabs">
        {(["setup", "main", "dashboard", "history", "settings"] as Tab[]).map((tab) => (
          <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
            {tab === "settings" && <SettingsIcon size={16} />}
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </nav>

      {message && <div className="notice">{message}</div>}

      <main>
        {activeTab === "setup" && (
          <SetupScreen
            t={t}
            plan={plan}
            defaultFocusMinutes={Number(settings.defaultFocusMinutes || 25)}
            defaultBreakMinutes={Number(settings.defaultBreakMinutes || 5)}
            onSaved={(savedPlan) => {
              setPlan(savedPlan);
              setActiveTab("main");
              setMessage(t("setup.saved"));
            }}
          />
        )}
        {activeTab === "main" && (
          <MainScreen
            t={t}
            plan={plan}
            setPlan={setPlan}
            language={language}
            onRefresh={refresh}
            onMessage={setMessage}
          />
        )}
        {activeTab === "dashboard" && <Dashboard t={t} metrics={metrics} />}
        {activeTab === "history" && <History t={t} cycles={cycles} />}
        {activeTab === "settings" && (
          <Settings
            t={t}
            language={language}
            defaultFocusMinutes={Number(settings.defaultFocusMinutes || 25)}
            defaultBreakMinutes={Number(settings.defaultBreakMinutes || 5)}
            onSettingsSaved={refresh}
            onMessage={setMessage}
          />
        )}
      </main>
    </div>
  );
}

function SetupScreen({
  t,
  plan,
  defaultFocusMinutes,
  defaultBreakMinutes,
  onSaved
}: {
  t: (key: string) => string;
  plan: DailyPlan | null;
  defaultFocusMinutes: number;
  defaultBreakMinutes: number;
  onSaved: (plan: DailyPlan) => void;
}) {
  const [plannedPomodoros, setPlannedPomodoros] = React.useState(plan?.plannedPomodoros ?? 8);
  const [focusMinutes, setFocusMinutes] = React.useState(plan?.focusMinutes ?? defaultFocusMinutes);
  const [breakMinutes, setBreakMinutes] = React.useState(plan?.breakMinutes ?? defaultBreakMinutes);
  const [rawUrls, setRawUrls] = React.useState("");
  const [videos, setVideos] = React.useState<VideoInput[]>(plan?.videos ?? []);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [durationFallbacks, setDurationFallbacks] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!plan) {
      setFocusMinutes(defaultFocusMinutes);
      setBreakMinutes(defaultBreakMinutes);
    }
  }, [defaultFocusMinutes, defaultBreakMinutes, plan]);

  const requiredSeconds = plannedPomodoros * breakMinutes * 60;
  const totalVideoSeconds = videos.reduce((sum, video) => sum + video.durationSeconds, 0);
  const isValid = videos.length > 0 && totalVideoSeconds >= requiredSeconds;

  function loadVideos() {
    const nextErrors: string[] = [];
    const parsed = rawUrls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url, index) => {
        const video = buildQueuedVideo(url, index);
        if (!video) nextErrors.push(`${t("setup.badUrl")}: ${url}`);
        return video;
      })
      .filter(Boolean) as VideoInput[];
    setErrors(nextErrors);
    setDurationFallbacks([]);
    setVideos(parsed);
  }

  async function save() {
    const saved = await api.saveDay({ plannedPomodoros, focusMinutes, breakMinutes, videos });
    onSaved(saved);
  }

  return (
    <section className="panel">
      <h2>{t("setup.title")}</h2>
      <div className="form-grid">
        <NumberField label={t("setup.pomodoros")} value={plannedPomodoros} min={1} onChange={setPlannedPomodoros} />
        <NumberField label={t("setup.focus")} value={focusMinutes} min={1} onChange={setFocusMinutes} />
        <NumberField label={t("setup.break")} value={breakMinutes} min={1} onChange={setBreakMinutes} />
      </div>
      <div className="stat-line">
        <span>{t("setup.required")}</span>
        <strong>{secondsToHoursMinutes(requiredSeconds)}</strong>
      </div>
      <label className="field full">
        <span>{t("setup.youtubeUrls")}</span>
        <textarea value={rawUrls} onChange={(event) => setRawUrls(event.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
        <small>{t("setup.youtubeHint")}</small>
      </label>
      <button className="primary" onClick={loadVideos}>
        {t("setup.addVideos")}
      </button>
      {errors.map((error) => (
        <p className="error" key={error}>
          {error}
        </p>
      ))}
      <div className="video-list">
        {videos.map((video, index) => (
          <div className="video-row" key={video.videoId}>
            <span>
              {video.videoId}
              {video.durationSeconds <= 0 && !durationFallbacks.includes(video.videoId) ? (
                <small>{t("setup.durationLoading")}</small>
              ) : null}
              {durationFallbacks.includes(video.videoId) ? <small>{t("setup.durationFallback")}</small> : null}
            </span>
            <label>
              {t("setup.duration")}
              <input
                type="number"
                min="1"
                value={video.durationSeconds > 0 ? Math.ceil(video.durationSeconds / 60) : ""}
                onChange={(event) => {
                  const copy = [...videos];
                  copy[index] = { ...video, durationSeconds: Number(event.target.value) * 60 };
                  setVideos(copy);
                }}
              />
            </label>
          </div>
        ))}
      </div>
      <div className={`validation ${isValid ? "ok" : "bad"}`}>
        {t("setup.totalVideo")}: {secondsToHoursMinutes(totalVideoSeconds)}. {isValid ? t("setup.valid") : t("setup.invalid")}
      </div>
      <button className="primary" disabled={!isValid} onClick={save}>
        {t("setup.save")}
      </button>
      <YouTubeDurationProbe
        videos={videos}
        onResolved={(videoId, durationSeconds) => {
          setVideos((current) => current.map((video) => (video.videoId === videoId ? { ...video, durationSeconds } : video)));
          setDurationFallbacks((current) => current.filter((item) => item !== videoId));
        }}
        onUnavailable={(videoId) => {
          setDurationFallbacks((current) => (current.includes(videoId) ? current : [...current, videoId]));
        }}
      />
    </section>
  );
}

function MainScreen({
  t,
  plan,
  setPlan,
  onRefresh,
  onMessage
}: {
  t: (key: string) => string;
  plan: DailyPlan | null;
  setPlan: (plan: DailyPlan) => void;
  language: Language;
  onRefresh: () => Promise<void>;
  onMessage: (message: string) => void;
}) {
  const [phase, setPhase] = React.useState<CycleType>("focus");
  const [status, setStatus] = React.useState<TimerStatus>("idle");
  const [secondsLeft, setSecondsLeft] = React.useState((plan?.focusMinutes ?? 25) * 60);
  const [task, setTask] = React.useState("");
  const [energy, setEnergy] = React.useState(3);
  const [focusAfter, setFocusAfter] = React.useState(3);
  const [startedAt, setStartedAt] = React.useState<string | null>(null);
  const [activeVideo, setActiveVideo] = React.useState<SavedVideo | null>(plan ? getNextPlayableVideo(plan.videos) : null);
  const playerRef = React.useRef<YouTubePlayer | null>(null);
  const timestampStartRef = React.useRef(0);
  const finishingRef = React.useRef(false);
  const planRef = React.useRef(plan);
  const phaseRef = React.useRef(phase);
  const secondsLeftRef = React.useRef(secondsLeft);
  const startedAtRef = React.useRef(startedAt);
  const activeVideoRef = React.useRef(activeVideo);

  React.useEffect(() => {
    planRef.current = plan;
  }, [plan]);

  React.useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  React.useEffect(() => {
    secondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  React.useEffect(() => {
    startedAtRef.current = startedAt;
  }, [startedAt]);

  React.useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  React.useEffect(() => {
    if (status !== "running") return;
    const interval = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          window.clearInterval(interval);
          void finishCycle(true, durationFor(phase));
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [status, phase, activeVideo]);

  React.useEffect(() => {
    if (plan) setActiveVideo(getNextPlayableVideo(plan.videos));
  }, [plan?.id]);

  React.useEffect(() => {
    if (phase === "break" && activeVideo) {
      timestampStartRef.current = activeVideo.savedPositionSeconds;
    }
  }, [activeVideo?.id, phase]);

  if (!plan) return <section className="panel empty">{t("main.noPlan")}</section>;

  function durationFor(nextPhase: CycleType) {
    const currentPlan = planRef.current;
    return (nextPhase === "focus" ? currentPlan!.focusMinutes : currentPlan!.breakMinutes) * 60;
  }

  function start() {
    setStartedAt((current) => current ?? new Date().toISOString());
    setStatus("running");
    if (phase === "break") timestampStartRef.current = activeVideo?.savedPositionSeconds ?? 0;
  }

  async function finishCycle(completed: boolean, elapsedOverride?: number) {
    if (finishingRef.current) return;
    finishingRef.current = true;
    const currentPlan = planRef.current;
    const currentPhase = phaseRef.current;
    const currentVideo = activeVideoRef.current;
    const currentSecondsLeft = secondsLeftRef.current;
    const endTime = new Date().toISOString();
    const startTime = startedAtRef.current ?? endTime;
    let timestampEndSeconds = timestampStartRef.current;
    let videoId: string | null = null;

    if (!currentPlan) {
      finishingRef.current = false;
      return;
    }

    if (currentPhase === "break" && currentVideo && playerRef.current) {
      try {
        timestampEndSeconds = playerRef.current.getCurrentTime();
        playerRef.current.pauseVideo();
      } catch {
        timestampEndSeconds = currentVideo.savedPositionSeconds;
      }
      videoId = currentVideo.videoId;
      const done = timestampEndSeconds >= currentVideo.durationSeconds - 3;
      await api.saveVideoProgress(currentVideo.id, timestampEndSeconds, done);
      const updatedPlan = await api.today();
      if (updatedPlan) {
        setPlan(updatedPlan);
        setActiveVideo(getNextPlayableVideo(updatedPlan.videos));
      }
    }

    try {
      await api.saveCycle({
        date: currentPlan.date,
        startTime,
        endTime,
        cycleType: currentPhase,
        taskDescription: task,
        energyBefore: energy,
        focusAfter: currentPhase === "focus" ? focusAfter : null,
        completed,
        canceled: !completed,
        videoId,
        timestampStartSeconds: currentPhase === "break" ? timestampStartRef.current : 0,
        timestampEndSeconds: currentPhase === "break" ? timestampEndSeconds : 0,
        durationSeconds: elapsedOverride ?? durationFor(currentPhase) - currentSecondsLeft
      });

      const nextPhase = completed && currentPhase === "focus" ? "break" : "focus";
      const shouldAutoContinue = completed;
      if (currentPhase === "break") {
        playerRef.current?.pauseVideo();
      }
      setPhase(nextPhase);
      setSecondsLeft(durationFor(nextPhase));
      setStatus(shouldAutoContinue ? "running" : "idle");
      setStartedAt(shouldAutoContinue ? new Date().toISOString() : null);

      const updatedPlan = await api.today();
      if (updatedPlan) {
        setPlan(updatedPlan);
        setActiveVideo(getNextPlayableVideo(updatedPlan.videos));
      }
      await onRefresh();
    } finally {
      window.setTimeout(() => {
        finishingRef.current = false;
      }, 0);
    }
  }

  function handleVideoEnded() {
    onMessage(t("main.videoEnded"));
    if (!activeVideo) return;
    api.saveVideoProgress(activeVideo.id, activeVideo.durationSeconds, true)
      .then(api.today)
      .then((updatedPlan) => {
        if (updatedPlan) {
          setPlan(updatedPlan);
          setActiveVideo(getNextPlayableVideo(updatedPlan.videos));
        }
      })
      .catch((error) => onMessage(error.message));
  }

  return (
    <section className="timer-layout">
      <div className="timer-panel">
        <p className="phase">{phase === "focus" ? t("main.phaseFocus") : t("main.phaseBreak")}</p>
        <div className="timer">{secondsToClock(secondsLeft)}</div>
        <label className="field">
          <span>{t("main.task")}</span>
          <input value={task} onChange={(event) => setTask(event.target.value)} />
        </label>
        <div className="rating-row">
          <Rating label={t("main.energy")} value={energy} onChange={setEnergy} />
          <Rating label={t("main.focusAfter")} value={focusAfter} onChange={setFocusAfter} />
        </div>
        <p className="hint">{t(`suggestions.${videoSuggestionKey(energy)}`)}</p>
        <div className="controls">
          <button className="primary icon-button" onClick={start} disabled={status === "running"}>
            <Play size={18} /> {status === "paused" ? t("main.resume") : t("main.start")}
          </button>
          <button className="icon-button" onClick={() => setStatus("paused")} disabled={status !== "running"}>
            <Pause size={18} /> {t("main.pause")}
          </button>
          <button className="icon-button" onClick={() => finishCycle(false)} disabled={status === "idle"}>
            <Square size={18} /> {t("main.cancel")}
          </button>
          <button className="icon-button" onClick={() => finishCycle(true)}>
            <Check size={18} /> {t("main.complete")}
          </button>
        </div>
      </div>
      <div className={`player-panel ${phase === "break" ? "visible" : ""}`}>
        {activeVideo ? (
          <>
            <button
              className="primary icon-button activate-video"
              onClick={() => {
                playerRef.current?.unMute();
                playerRef.current?.playVideo();
              }}
            >
              <MonitorPlay size={18} /> {t("main.activateVideo")}
            </button>
          <YouTubeBreakPlayer
            activeVideo={activeVideo}
            shouldPlay={phase === "break" && status === "running"}
            onReady={(player) => {
              playerRef.current = player;
              timestampStartRef.current = activeVideo.savedPositionSeconds;
            }}
            onEnded={handleVideoEnded}
            onError={() => onMessage("Video not embeddable or unavailable.")}
          />
          </>
        ) : (
          <p className="empty">{t("setup.invalid")}</p>
        )}
      </div>
    </section>
  );
}

function Dashboard({ t, metrics }: { t: (key: string) => string; metrics: Metrics }) {
  const suggestions = [
    metrics.adaptation.suggestFocusMinutes === 30 ? t("dashboard.focus30") : "",
    metrics.adaptation.suggestFocusMinutes === 20 ? t("dashboard.focus20") : "",
    metrics.adaptation.suggestBreakMinutes ? t("dashboard.break8") : ""
  ].filter(Boolean);

  return (
    <section className="panel">
      <div className="metric-grid">
        <Metric label={t("dashboard.completed")} value={metrics.completedPomodoros.toString()} />
        <Metric label={t("dashboard.focusTime")} value={secondsToHoursMinutes(metrics.totalFocusSeconds)} />
        <Metric label={t("dashboard.breakTime")} value={secondsToHoursMinutes(metrics.totalBreakSeconds)} />
        <Metric label={t("dashboard.completion")} value={`${Math.round(metrics.completionRate * 100)}%`} />
        <Metric label={t("dashboard.energy")} value={metrics.averageEnergy.toFixed(1)} />
        <Metric label={t("dashboard.focus")} value={metrics.averageFocus.toFixed(1)} />
        <Metric label={t("dashboard.video")} value={secondsToHoursMinutes(metrics.totalVideoSeconds)} />
      </div>
      <div className="suggestion">
        <strong>{t("dashboard.suggestion")}</strong>
        <p>{suggestions.length ? suggestions.join(" ") : t("dashboard.none")}</p>
      </div>
    </section>
  );
}

function History({ t, cycles }: { t: (key: string) => string; cycles: CycleRecord[] }) {
  if (!cycles.length) return <section className="panel empty">{t("history.empty")}</section>;
  return (
    <section className="panel table-wrap">
      <table>
        <thead>
          <tr>
            <th>{t("tabs.main")}</th>
            <th>{t("history.task")}</th>
            <th>{t("history.status")}</th>
            <th>{t("history.duration")}</th>
            <th>{t("history.video")}</th>
          </tr>
        </thead>
        <tbody>
          {cycles.map((cycle) => (
            <tr key={cycle.id}>
              <td>{cycle.cycleType}</td>
              <td>{cycle.taskDescription || "-"}</td>
              <td>{cycle.canceled ? t("history.canceled") : t("history.completed")}</td>
              <td>{secondsToHoursMinutes(cycle.durationSeconds)}</td>
              <td>
                {cycle.videoId
                  ? `${cycle.videoId}: ${secondsToClock(cycle.timestampStartSeconds)} - ${secondsToClock(cycle.timestampEndSeconds)}`
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Settings({
  t,
  language,
  defaultFocusMinutes,
  defaultBreakMinutes,
  onSettingsSaved,
  onMessage
}: {
  t: (key: string) => string;
  language: Language;
  defaultFocusMinutes: number;
  defaultBreakMinutes: number;
  onSettingsSaved: () => Promise<void>;
  onMessage: (message: string) => void;
}) {
  const [focus, setFocus] = React.useState(defaultFocusMinutes);
  const [breakMinutes, setBreakMinutes] = React.useState(defaultBreakMinutes);

  React.useEffect(() => {
    setFocus(defaultFocusMinutes);
    setBreakMinutes(defaultBreakMinutes);
  }, [defaultFocusMinutes, defaultBreakMinutes]);

  async function save() {
    await api.saveSettings({ language, defaultFocusMinutes: focus, defaultBreakMinutes: breakMinutes });
    await onSettingsSaved();
    onMessage(t("settings.saved"));
  }

  return (
    <section className="panel">
      <h2>{t("settings.title")}</h2>
      <div className="form-grid">
        <NumberField label={t("settings.defaultFocus")} value={focus} min={1} onChange={setFocus} />
        <NumberField label={t("settings.defaultBreak")} value={breakMinutes} min={1} onChange={setBreakMinutes} />
      </div>
      <button className="primary" onClick={save}>
        {t("settings.save")}
      </button>
    </section>
  );
}

function NumberField({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (value: number) => void }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type="number" min={min} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Rating({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="rating">
      <span>{label}</span>
      <div>
        {[1, 2, 3, 4, 5].map((item) => (
          <button key={item} className={value === item ? "active" : ""} onClick={() => onChange(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>
);
