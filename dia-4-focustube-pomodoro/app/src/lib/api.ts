import type { CycleRecord, DailyPlan, Metrics, SavedVideo, VideoInput } from "../types";

const STORAGE_KEY = "focustube-pomodoro-state-v2";

interface LocalState {
  settings: Record<string, string>;
  plan: DailyPlan | null;
  cycles: CycleRecord[];
  nextPlanId: number;
  nextVideoId: number;
  nextCycleId: number;
}

const todayKey = () => new Date().toISOString().slice(0, 10);

function defaultState(): LocalState {
  return {
    settings: {
      language: "en",
      defaultFocusMinutes: "25",
      defaultBreakMinutes: "5"
    },
    plan: null,
    cycles: [],
    nextPlanId: 1,
    nextVideoId: 1,
    nextCycleId: 1
  };
}

function readState(): LocalState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();

  try {
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function writeState(state: LocalState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function mapVideos(planId: number, videos: VideoInput[], startId: number): { videos: SavedVideo[]; nextVideoId: number } {
  let nextVideoId = startId;
  return {
    nextVideoId: startId + videos.length,
    videos: videos.map((video, index) => ({
      ...video,
      id: nextVideoId++,
      planId,
      savedPositionSeconds: 0,
      completed: false,
      sortOrder: index
    }))
  };
}

function getTodayCycles(state: LocalState) {
  return state.cycles.filter((cycle) => cycle.date === todayKey());
}

function calculateMetrics(cycles: CycleRecord[]): Metrics {
  const completed = cycles.filter((cycle) => cycle.completed && !cycle.canceled);
  const focusCycles = completed.filter((cycle) => cycle.cycleType === "focus");
  const breakCycles = completed.filter((cycle) => cycle.cycleType === "break");
  const average = (values: number[]) => (values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0);
  const lowFocusOrCanceled = cycles.filter(
    (cycle) => cycle.canceled || (cycle.cycleType === "focus" && cycle.focusAfter !== null && cycle.focusAfter <= 2)
  ).length;
  const lastThreeFocus = focusCycles.slice(-3);
  const strongFocusStreak = lastThreeFocus.length === 3 && lastThreeFocus.every((cycle) => Number(cycle.focusAfter || 0) >= 4);
  const lowEnergy = cycles.some((cycle) => Number(cycle.energyBefore || 5) <= 2);

  return {
    completedPomodoros: focusCycles.length,
    totalFocusSeconds: focusCycles.reduce((sum, cycle) => sum + cycle.durationSeconds, 0),
    totalBreakSeconds: breakCycles.reduce((sum, cycle) => sum + cycle.durationSeconds, 0),
    completionRate: cycles.length ? completed.length / cycles.length : 0,
    averageEnergy: average(cycles.map((cycle) => cycle.energyBefore).filter((value): value is number => Boolean(value))),
    averageFocus: average(cycles.map((cycle) => cycle.focusAfter).filter((value): value is number => Boolean(value))),
    totalVideoSeconds: breakCycles.reduce(
      (sum, cycle) => sum + Math.max(0, cycle.timestampEndSeconds - cycle.timestampStartSeconds),
      0
    ),
    adaptation: {
      suggestFocusMinutes: strongFocusStreak ? 30 : lowFocusOrCanceled >= 2 ? 20 : null,
      suggestBreakMinutes: lowEnergy ? 8 : null
    }
  };
}

export const api = {
  async settings() {
    return clone(readState().settings);
  },

  async saveSettings(settings: Record<string, string | number>) {
    const state = readState();
    state.settings = {
      ...state.settings,
      ...Object.fromEntries(Object.entries(settings).map(([key, value]) => [key, String(value)]))
    };
    writeState(state);
    return clone(state.settings);
  },

  async today() {
    const state = readState();
    return state.plan?.date === todayKey() ? clone(state.plan) : null;
  },

  async saveDay(payload: {
    plannedPomodoros: number;
    focusMinutes: number;
    breakMinutes: number;
    videos: VideoInput[];
  }) {
    const state = readState();
    const requiredBreakSeconds = payload.plannedPomodoros * payload.breakMinutes * 60;
    const totalVideoSeconds = payload.videos.reduce((sum, video) => sum + video.durationSeconds, 0);

    if (!payload.videos.length || totalVideoSeconds < requiredBreakSeconds) {
      throw new Error("Not enough video duration for planned breaks.");
    }

    const planId = state.nextPlanId++;
    const mapped = mapVideos(planId, payload.videos, state.nextVideoId);
    state.nextVideoId = mapped.nextVideoId;
    state.plan = {
      id: planId,
      date: todayKey(),
      plannedPomodoros: payload.plannedPomodoros,
      focusMinutes: payload.focusMinutes,
      breakMinutes: payload.breakMinutes,
      requiredBreakSeconds,
      videos: mapped.videos
    };
    state.cycles = state.cycles.filter((cycle) => cycle.date !== todayKey());
    writeState(state);
    return clone(state.plan);
  },

  async saveCycle(payload: Partial<CycleRecord>) {
    const state = readState();
    const endTime = payload.endTime || new Date().toISOString();
    const startTime = payload.startTime || endTime;
    const calculatedDuration = Math.max(0, Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000));
    const cycle: CycleRecord = {
      id: state.nextCycleId++,
      date: payload.date || todayKey(),
      startTime,
      endTime,
      cycleType: payload.cycleType || "focus",
      taskDescription: payload.taskDescription || "",
      energyBefore: payload.energyBefore ?? null,
      focusAfter: payload.focusAfter ?? null,
      completed: Boolean(payload.completed),
      canceled: Boolean(payload.canceled),
      videoId: payload.videoId || null,
      timestampStartSeconds: payload.timestampStartSeconds || 0,
      timestampEndSeconds: payload.timestampEndSeconds || 0,
      durationSeconds: payload.durationSeconds ?? calculatedDuration
    };
    state.cycles.push(cycle);
    writeState(state);
    return clone(cycle);
  },

  async cycles() {
    return clone(getTodayCycles(readState()).sort((a, b) => b.startTime.localeCompare(a.startTime)));
  },

  async metrics() {
    return calculateMetrics(getTodayCycles(readState()).sort((a, b) => a.startTime.localeCompare(b.startTime)));
  },

  async saveVideoProgress(id: number, savedPositionSeconds: number, completed: boolean) {
    const state = readState();
    if (!state.plan) return null;
    state.plan.videos = state.plan.videos.map((video) =>
      video.id === id ? { ...video, savedPositionSeconds, completed } : video
    );
    writeState(state);
    return clone(state.plan.videos.find((video) => video.id === id) || null);
  }
};
