import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { api } from "./lib/api";
import { addDays, endOfMonth, endOfWeek, inRange, isoDate, startOfMonth, startOfWeek } from "./lib/date";
import { downloadCsv, downloadPdf, clientName, projectName } from "./lib/export";
import { statusLabels, t, typeLabels } from "./lib/i18n";
import { detectLanguage, parseNaturalText } from "./lib/parser";
import type { Client, DraftLogEntry, Language, LogEntry, ParsedSuggestion, Project, User } from "./types";

type View = "dashboard" | "clients" | "projects" | "logbook" | "calendar" | "reports" | "profile" | "permissions" | "settings";
type EntryFilters = { clientId: string; projectId: string; status: string };

const emptyEntry = (clientId = "", projectId: string | null = null): DraftLogEntry => ({
  title: "",
  description: "",
  client_id: clientId,
  project_id: projectId,
  entry_type: "work_done",
  status: "open",
  entry_date: isoDate(),
  start_date: null,
  end_date: null,
  hours: null,
  source_text: null
});

function getSpeechRecognition() {
  if (typeof window === "undefined") return undefined;
  const speechWindow = window as unknown as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

export default function App() {
  const [language, setLanguage] = useState<Language>("es");
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [logFilters, setLogFilters] = useState<EntryFilters>({ clientId: "", projectId: "", status: "" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refresh(activeUser = user) {
    if (!activeUser) return;
    const [nextClients, nextProjects, nextEntries] = await Promise.all([
      api.clients(activeUser.id),
      api.projects(activeUser.id),
      api.entries(activeUser.id)
    ]);
    setClients(nextClients);
    setProjects(nextProjects);
    setEntries(nextEntries);
  }

  async function run(action: () => Promise<void>, success?: string) {
    setError("");
    setNotice("");
    try {
      await action();
      if (success) setNotice(success);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function seedDemo() {
    if (!user) return;
    await run(async () => {
      const gen = await api.saveClient(user.id, { name: "Gen", email: "gen@example.com", notes: "Demo client" });
      const diego = await api.saveClient(user.id, { name: "Diego", notes: "Requests quick visual changes" });
      const dashboard = await api.saveProject(user.id, { name: "Dashboard", client_id: gen.id, description: "Product dashboard", status: "open" });
      await api.saveEntry(user.id, {
        ...emptyEntry(gen.id, dashboard.id),
        title: "Trabaje tres horas en el dashboard",
        description: "Para Gen trabaje tres horas en el dashboard el lunes.",
        hours: 3,
        source_text: "Para Gen trabaje tres horas en el dashboard el lunes."
      });
      await api.saveEntry(user.id, {
        ...emptyEntry(diego.id, null),
        title: "Cambiar la seccion de precios",
        description: "Diego me pidio cambiar la seccion de precios.",
        entry_type: "client_request",
        source_text: "Diego me pidio cambiar la seccion de precios."
      });
      await refresh();
    }, t(language, "saved"));
  }

  if (!user) {
    return <AuthScreen language={language} setLanguage={setLanguage} setUser={setUser} refresh={refresh} run={run} error={error} />;
  }

  const navigation: [View, string][] = [
    ["dashboard", "dashboard"],
    ["clients", "clients"],
    ["projects", "projects"],
    ["logbook", "logbook"],
    ["calendar", "calendar"],
    ["reports", "reports"],
    ["profile", "profile"],
    ["permissions", "permissions"],
    ["settings", "settings"]
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">TF</span>
          <div>
            <strong>{t(language, "appName")}</strong>
            <span>{t(language, "tagline")}</span>
          </div>
        </div>
        <nav>
          {navigation.map(([key, label]) => (
            <button className={view === key ? "active" : ""} key={key} onClick={() => setView(key)}>
              {t(language, label)}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label={t(language, "language")}>
            <option value="es">Espanol</option>
            <option value="en">English</option>
          </select>
          <button onClick={() => setUser(null)}>{t(language, "logout")}</button>
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace-top">
          <div>
            <p className="eyebrow">Usuario {">"} Cliente {">"} Proyecto {">"} Entradas</p>
            <h1>{t(language, view)}</h1>
          </div>
          <button className="button-secondary" onClick={seedDemo}>{t(language, "demoData")}</button>
        </header>

        {error && <p className="alert">{t(language, "error")}: {error}</p>}
        {notice && <p className="notice">{notice}</p>}

        {view === "dashboard" && <Dashboard language={language} clients={clients} projects={projects} entries={entries} />}
        {view === "clients" && <ClientsView language={language} user={user} clients={clients} refresh={refresh} run={run} />}
        {view === "projects" && <ProjectsView language={language} user={user} clients={clients} projects={projects} refresh={refresh} run={run} onOpenProjectLog={(project) => { setLogFilters({ clientId: project.client_id, projectId: project.id, status: "" }); setView("logbook"); }} />}
        {view === "logbook" && <EntriesView language={language} user={user} clients={clients} projects={projects} entries={entries} refresh={refresh} run={run} filters={logFilters} setFilters={setLogFilters} />}
        {view === "calendar" && <CalendarView language={language} clients={clients} projects={projects} entries={entries} />}
        {view === "reports" && <ReportsView language={language} clients={clients} projects={projects} entries={entries} />}
        {view === "profile" && <ProfileView language={language} user={user} setUser={setUser} run={run} />}
        {view === "permissions" && <PermissionsView language={language} />}
        {view === "settings" && <SettingsView language={language} />}
      </main>

      <Assistant language={language} user={user} clients={clients} projects={projects} refresh={refresh} run={run} />
    </div>
  );
}

function AuthScreen({ language, setLanguage, setUser, refresh, run, error }: {
  language: Language;
  setLanguage: (language: Language) => void;
  setUser: (user: User) => void;
  refresh: (user: User) => Promise<void>;
  run: (action: () => Promise<void>) => Promise<void>;
  error: string;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      const activeUser = mode === "login" ? await api.login(email, password) : await api.register(email, password);
      setUser(activeUser);
      await refresh(activeUser);
    });
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Day 02 / Desktop work log</p>
        <h1>TaskFlow Local</h1>
        <p>{t(language, "authHint")}</p>
        <form onSubmit={submit}>
          <label>{t(language, "email")}<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required /></label>
          <label>{t(language, "password")}<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={8} required /></label>
          {error && <p className="alert">{error}</p>}
          <button className="button-primary" type="submit">{t(language, mode)}</button>
        </form>
        <div className="auth-actions">
          <button onClick={() => setMode(mode === "login" ? "register" : "login")}>{t(language, mode === "login" ? "register" : "login")}</button>
          <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
            <option value="es">Espanol</option>
            <option value="en">English</option>
          </select>
        </div>
      </section>
    </main>
  );
}

function Dashboard({ language, clients, projects, entries }: { language: Language; clients: Client[]; projects: Project[]; entries: LogEntry[] }) {
  const weekStart = isoDate(startOfWeek());
  const weekEnd = isoDate(endOfWeek());
  const weekEntries = entries.filter((entry) => inRange(entry.entry_date, weekStart, weekEnd));
  const byClient = clients.map((client) => ({
    client,
    count: entries.filter((entry) => entry.client_id === client.id).length,
    hours: entries.filter((entry) => entry.client_id === client.id).reduce((sum, entry) => sum + (entry.hours ?? 0), 0)
  }));

  return (
    <section className="stack">
      <div className="metric-grid">
        <Metric label={t(language, "totalClients")} value={clients.length} />
        <Metric label={t(language, "totalProjects")} value={projects.length} />
        <Metric label={t(language, "recentEntries")} value={entries.slice(0, 7).length} />
        <Metric label={t(language, "thisWeek")} value={weekEntries.length} />
      </div>
      <div className="panel">
        <h2>{t(language, "quickByClient")}</h2>
        <div className="table">
          {byClient.map((row) => <div className="table-row" key={row.client.id}><strong>{row.client.name}</strong><span>{row.count} entradas</span><span>{row.hours}h</span></div>)}
          {!byClient.length && <p>{t(language, "noRows")}</p>}
        </div>
      </div>
      <EntryList language={language} entries={entries.slice(0, 6)} clients={clients} projects={projects} />
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong></article>;
}

function ClientsView({ language, user, clients, refresh, run }: { language: Language; user: User; clients: Client[]; refresh: () => Promise<void>; run: (action: () => Promise<void>, success?: string) => Promise<void> }) {
  const [draft, setDraft] = useState<Partial<Client>>({ name: "" });
  return (
    <CrudPanel title={t(language, "clients")}>
      <form className="form-grid" onSubmit={(event) => {
        event.preventDefault();
        run(async () => {
          await api.saveClient(user.id, { id: draft.id, name: draft.name ?? "", email: draft.email, notes: draft.notes });
          setDraft({ name: "" });
          await refresh();
        }, t(language, "saved"));
      }}>
        <input placeholder={t(language, "name")} value={draft.name ?? ""} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />
        <input placeholder={t(language, "optionalEmail")} value={draft.email ?? ""} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
        <input placeholder={t(language, "notes")} value={draft.notes ?? ""} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} />
        <button className="button-primary">{t(language, "save")}</button>
      </form>
      <Cards items={clients} render={(client) => (
        <>
          <h3>{client.name}</h3><p>{client.email}</p><p>{client.notes}</p>
          <div className="row-actions"><button onClick={() => setDraft(client)}>{t(language, "edit")}</button><button onClick={() => run(async () => { await api.deleteClient(user.id, client.id); await refresh(); })}>{t(language, "delete")}</button></div>
        </>
      )} empty={t(language, "noRows")} />
    </CrudPanel>
  );
}

function ProjectsView({ language, user, clients, projects, refresh, run, onOpenProjectLog }: { language: Language; user: User; clients: Client[]; projects: Project[]; refresh: () => Promise<void>; run: (action: () => Promise<void>, success?: string) => Promise<void>; onOpenProjectLog: (project: Project) => void }) {
  const [draft, setDraft] = useState<Partial<Project>>({ name: "", client_id: clients[0]?.id, status: "open" });
  return (
    <CrudPanel title={t(language, "projects")}>
      <form className="form-grid" onSubmit={(event) => {
        event.preventDefault();
        run(async () => {
          await api.saveProject(user.id, { id: draft.id, name: draft.name ?? "", client_id: draft.client_id ?? clients[0]?.id, description: draft.description, status: draft.status ?? "open" });
          setDraft({ name: "", client_id: clients[0]?.id, status: "open" });
          await refresh();
        }, t(language, "saved"));
      }}>
        <input placeholder={t(language, "name")} value={draft.name ?? ""} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />
        <select value={draft.client_id ?? ""} onChange={(event) => setDraft({ ...draft, client_id: event.target.value })} required>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select>
        <input placeholder={t(language, "description")} value={draft.description ?? ""} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
        <select value={draft.status ?? "open"} onChange={(event) => setDraft({ ...draft, status: event.target.value as Project["status"] })}><option value="open">{t(language, "open")}</option><option value="closed">{t(language, "closed")}</option></select>
        <button className="button-primary">{t(language, "save")}</button>
      </form>
      <Cards items={projects} render={(project) => (
        <>
          <h3>{project.name}</h3><p>{clientName(clients, project.client_id)} | <span className={`status-pill status-${project.status}`}>{statusLabels[language][project.status]}</span></p><p>{project.description}</p>
          <div className="row-actions"><button onClick={() => onOpenProjectLog(project)}>{t(language, "viewLog")}</button><button onClick={() => setDraft(project)}>{t(language, "edit")}</button><button onClick={() => run(async () => { await api.deleteProject(user.id, project.id); await refresh(); })}>{t(language, "delete")}</button></div>
        </>
      )} empty={t(language, "noRows")} />
    </CrudPanel>
  );
}

function EntriesView({ language, user, clients, projects, entries, refresh, run, filters, setFilters }: { language: Language; user: User; clients: Client[]; projects: Project[]; entries: LogEntry[]; refresh: () => Promise<void>; run: (action: () => Promise<void>, success?: string) => Promise<void>; filters: EntryFilters; setFilters: (filters: EntryFilters) => void }) {
  const [draft, setDraft] = useState<DraftLogEntry | (LogEntry & DraftLogEntry)>(emptyEntry(clients[0]?.id));
  const [showForm, setShowForm] = useState(false);
  const clientProjects = projects.filter((project) => project.client_id === draft.client_id);
  const filteredEntries = entries.filter((entry) => (!filters.clientId || entry.client_id === filters.clientId) && (!filters.projectId || entry.project_id === filters.projectId) && (!filters.status || entry.status === filters.status));
  function editEntry(entry: LogEntry) {
    setDraft(entry);
    setShowForm(true);
  }
  return (
    <section className="stack">
      <Filters language={language} clients={clients} projects={projects} filters={filters} setFilters={setFilters} />
      <div className="panel compact-panel">
        <div>
          <h2>{t(language, "filterSummary")}</h2>
          <p>{filteredEntries.length} / {entries.length} entradas</p>
        </div>
        <button className="button-primary" onClick={() => setShowForm(!showForm)}>{showForm ? t(language, "hideForm") : t(language, "showForm")}</button>
      </div>
      {showForm && (
      <div className="panel">
        <h2>{t(language, "newEntry")}</h2>
        <form className="entry-form" onSubmit={(event) => {
          event.preventDefault();
          run(async () => {
            await api.saveEntry(user.id, draft);
            setDraft(emptyEntry(clients[0]?.id));
            setShowForm(false);
            await refresh();
          }, t(language, "saved"));
        }}>
          <label className="field">{t(language, "title")}<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required /></label>
          <label className="field field-wide">{t(language, "description")}<textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} required /></label>
          <label className="field">{t(language, "client")}<select value={draft.client_id} onChange={(event) => setDraft({ ...draft, client_id: event.target.value, project_id: null })}>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label>
          <label className="field">{t(language, "project")}<select value={draft.project_id ?? ""} onChange={(event) => setDraft({ ...draft, project_id: event.target.value || null })}><option value="">{t(language, "project")}</option>{clientProjects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
          <label className="field">{t(language, "entryDate")}<input type="date" value={draft.entry_date} onChange={(event) => setDraft({ ...draft, entry_date: event.target.value })} /></label>
          <label className="field">{t(language, "startDate")}<input type="date" value={draft.start_date ?? ""} onChange={(event) => setDraft({ ...draft, start_date: event.target.value || null })} /></label>
          <label className="field">{t(language, "endDate")}<input type="date" value={draft.end_date ?? ""} onChange={(event) => setDraft({ ...draft, end_date: event.target.value || null })} /></label>
          <label className="field">{t(language, "hours")}<input type="number" step="0.25" value={draft.hours ?? ""} onChange={(event) => setDraft({ ...draft, hours: event.target.value ? Number(event.target.value) : null })} /></label>
          <label className="field">{t(language, "type")}<select value={draft.entry_type ?? "general_note"} onChange={(event) => setDraft({ ...draft, entry_type: event.target.value as DraftLogEntry["entry_type"] })}>{Object.entries(typeLabels[language]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label className="field">{t(language, "status")}<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as DraftLogEntry["status"] })}><option value="open">{t(language, "open")}</option><option value="closed">{t(language, "closed")}</option></select></label>
          <p className="form-help">{t(language, "dateHelp")}</p>
          <button className="button-primary">{t(language, "save")}</button>
        </form>
      </div>
      )}
      <EntryList language={language} entries={filteredEntries} clients={clients} projects={projects} onEdit={editEntry} onDelete={(entry) => run(async () => { await api.deleteEntry(user.id, entry.id); await refresh(); })} />
    </section>
  );
}

function CalendarView({ language, clients, projects, entries }: { language: Language; clients: Client[]; projects: Project[]; entries: LogEntry[] }) {
  const [filters, setFilters] = useState<EntryFilters>({ clientId: "", projectId: "", status: "" });
  const [mode, setMode] = useState<"week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState(isoDate());
  const selected = new Date(`${selectedDate}T00:00:00`);
  const start = isoDate(mode === "week" ? startOfWeek(selected) : startOfMonth(selected));
  const end = isoDate(mode === "week" ? endOfWeek(selected) : endOfMonth(selected));
  const totalDays = mode === "week" ? 7 : endOfMonth(selected).getDate();
  const firstDay = mode === "week" ? startOfWeek(selected) : startOfMonth(selected);
  const filtered = entries.filter((entry) => (!filters.clientId || entry.client_id === filters.clientId) && (!filters.projectId || entry.project_id === filters.projectId) && (!filters.status || entry.status === filters.status) && inRange(entry.entry_date, start, end));
  const days = Array.from({ length: totalDays }, (_, index) => isoDate(addDays(firstDay, index)));
  return (
    <section className="stack">
      <Filters language={language} clients={clients} projects={projects} filters={filters} setFilters={setFilters} />
      <div className="panel calendar-toolbar">
        <label className="field">{t(language, "selectedDate")}<input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></label>
        <div className="segmented"><button className={mode === "week" ? "active" : ""} onClick={() => setMode("week")}>{t(language, "weekView")}</button><button className={mode === "month" ? "active" : ""} onClick={() => setMode("month")}>{t(language, "monthView")}</button></div>
        <p className="muted">{start} - {end}</p>
      </div>
      <div className={mode === "week" ? "week-grid" : "month-grid"}>
        {days.map((day) => <article className="day-card" key={day}><strong>{day}</strong>{filtered.filter((entry) => entry.entry_date === day).map((entry) => <p key={entry.id}>{clientName(clients, entry.client_id)}: {entry.title}</p>)}</article>)}
      </div>
    </section>
  );
}

function ReportsView({ language, clients, projects, entries }: { language: Language; clients: Client[]; projects: Project[]; entries: LogEntry[] }) {
  const [filters, setFilters] = useState<EntryFilters>({ clientId: "", projectId: "", status: "" });
  const [start, setStart] = useState(isoDate(startOfMonth()));
  const [end, setEnd] = useState(isoDate(endOfMonth()));
  const filtered = entries.filter((entry) => (!filters.clientId || entry.client_id === filters.clientId) && (!filters.projectId || entry.project_id === filters.projectId) && (!filters.status || entry.status === filters.status) && inRange(entry.entry_date, start, end));
  const title = `${t(language, "byRange")} ${start} - ${end}`;
  return (
    <section className="stack">
      <Filters language={language} clients={clients} projects={projects} filters={filters} setFilters={setFilters} />
      <div className="form-grid"><label className="field">{t(language, "startDate")}<input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></label><label className="field">{t(language, "endDate")}<input type="date" value={end} onChange={(e) => setEnd(e.target.value)} /></label></div>
      <div className="panel actions-panel">
        <div><h2>{title}</h2><p>{filtered.length} entradas | {filtered.reduce((sum, entry) => sum + (entry.hours ?? 0), 0)}h</p></div>
        <button onClick={() => downloadCsv("taskflow-report.csv", filtered, clients, projects)}>{t(language, "exportCsv")}</button>
        <button onClick={() => downloadPdf("taskflow-report.pdf", title, filtered, clients, projects)}>{t(language, "exportPdf")}</button>
      </div>
      <EntryList language={language} entries={filtered} clients={clients} projects={projects} />
    </section>
  );
}

function Filters(props: { language: Language; clients: Client[]; projects: Project[]; filters: EntryFilters; setFilters: (filters: EntryFilters) => void }) {
  const clientProjects = props.filters.clientId ? props.projects.filter((project) => project.client_id === props.filters.clientId) : props.projects;
  const update = (patch: Partial<EntryFilters>) => props.setFilters({ ...props.filters, ...patch });
  return (
    <div className="panel form-grid">
      <select value={props.filters.clientId} onChange={(e) => props.setFilters({ clientId: e.target.value, projectId: "", status: props.filters.status })}><option value="">{t(props.language, "all")} {t(props.language, "clients")}</option>{props.clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select>
      <select value={props.filters.projectId} onChange={(e) => update({ projectId: e.target.value })}><option value="">{t(props.language, "all")} {t(props.language, "projects")}</option>{clientProjects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select>
      <select value={props.filters.status} onChange={(e) => update({ status: e.target.value })}><option value="">{t(props.language, "all")} {t(props.language, "status")}</option><option value="open">{t(props.language, "open")}</option><option value="closed">{t(props.language, "closed")}</option></select>
      <button onClick={() => props.setFilters({ clientId: "", projectId: "", status: "" })}>{t(props.language, "clearFilters")}</button>
    </div>
  );
}

function Assistant({ language, user, clients, projects, refresh, run }: { language: Language; user: User; clients: Client[]; projects: Project[]; refresh: () => Promise<void>; run: (action: () => Promise<void>, success?: string) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<ParsedSuggestion[]>([]);
  const [listening, setListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechApi = getSpeechRecognition();
  const detectedLanguage = text.trim() ? detectLanguage(text) : language;
  const examples = language === "es"
    ? ["Para Gen trabaje tres horas en el dashboard el lunes.", "Diego me pidio cambiar la seccion de precios."]
    : ["For Gen I worked three hours on the dashboard on Monday.", "Diego asked me to update the pricing section."];

  function processText(nextText = text) {
    setSuggestions(parseNaturalText(nextText, clients, projects, language));
  }

  async function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setListening(false);
      setVoiceStatus(t(language, "voiceCaptured"));
      return;
    }
    if (!speechApi) {
      setVoiceStatus(t(language, "speechUnsupported"));
      return;
    }
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch {
      setVoiceStatus(t(language, "micDenied"));
      return;
    }
    const recognition = new speechApi();
    recognitionRef.current = recognition;
    recognition.lang = language === "es" ? "es-ES" : "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = () => {
      setListening(true);
      setVoiceStatus(t(language, "voiceReady"));
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognition.onerror = () => {
      setListening(false);
      setVoiceStatus(t(language, "voicePermissionHelp"));
    };
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      const nextText = transcript;
      setText(nextText);
      setVoiceStatus(t(language, "voiceCaptured"));
    };
    try {
      recognition.start();
    } catch {
      setVoiceStatus(t(language, "voicePermissionHelp"));
    }
  }

  async function saveSuggestions() {
    await run(async () => {
      for (const suggestion of suggestions) {
        if (!suggestion.client_id) continue;
        const { confidence: _confidence, issues: _issues, clientName: _clientName, projectName: _projectName, ...draft } = suggestion;
        await api.saveEntry(user.id, draft);
      }
      await refresh();
      setText("");
      setSuggestions([]);
    }, t(language, "saved"));
  }

  return (
    <>
      <button className="assistant-button" onClick={() => setOpen(!open)}>{t(language, "assistant")}</button>
      {open && <section className="assistant-panel">
        <div className="section-heading"><h2>{t(language, "assistant")}</h2><button onClick={() => setOpen(false)}>x</button></div>
        <p className="assistant-status">
          <span className={speechApi ? "status-dot ok" : "status-dot off"}></span>
          {speechApi ? t(language, "voiceReady") : t(language, "speechUnsupported")}
        </p>
        {listening && <div className="voice-waves" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>}
        <div className="quick-examples">
          <span>{t(language, "quickExamples")}</span>
          {examples.map((example) => <button key={example} onClick={() => setText(example)}>{example}</button>)}
        </div>
        <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder={t(language, "assistantPlaceholder")} />
        <p className="muted">{t(language, "detected")}: {detectedLanguage.toUpperCase()} {voiceStatus ? `| ${voiceStatus}` : ""}</p>
        {!speechApi && <p className="muted">{t(language, "voiceUnavailable")}</p>}
        <div className="row-actions">
          <button disabled={!speechApi} onClick={toggleVoice}>{listening ? t(language, "stop") : t(language, "speak")}</button>
          <button disabled={!text.trim()} onClick={() => processText()}>{t(language, "process")}</button>
          <button onClick={() => { setText(""); setSuggestions([]); setVoiceStatus(""); }}>{t(language, "clear")}</button>
        </div>
        <div className="suggestions">
          {suggestions.map((suggestion, index) => <article key={`${suggestion.title}-${index}`}>
            <strong>{suggestion.title}</strong>
            <p>{suggestion.clientName ? `${t(language, "client")}: ${suggestion.clientName}` : `${t(language, "missingClient")}: ${suggestion.issues[0] ?? "?"}. ${t(language, "createIt")}`}</p>
            <p>{suggestion.projectName ? `${t(language, "project")}: ${suggestion.projectName} | ` : ""}{suggestion.entry_date} {suggestion.hours ? `| ${suggestion.hours}h` : ""}</p>
          </article>)}
        </div>
        {!!suggestions.length && <button className="button-primary" onClick={saveSuggestions}>{t(language, "confirmSave")}</button>}
      </section>}
    </>
  );
}

function ProfileView({ language, user, setUser, run }: { language: Language; user: User; setUser: (user: User) => void; run: (action: () => Promise<void>, success?: string) => Promise<void> }) {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  return (
    <section className="panel copy-panel">
      <h2>{t(language, "profileTitle")}</h2>
      <form className="profile-form" onSubmit={(event) => {
        event.preventDefault();
        run(async () => {
          const updated = await api.updateUser(user.id, { email, password: password || undefined });
          setUser(updated);
          setPassword("");
        }, t(language, "saved"));
      }}>
        <label className="field">{t(language, "email")}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label className="field">{t(language, "newPassword")}<input type="password" value={password} minLength={password ? 8 : undefined} onChange={(event) => setPassword(event.target.value)} /></label>
        <p className="muted">{t(language, "accountCreated")}: {new Date(user.created_at).toLocaleDateString()}</p>
        <button className="button-primary">{t(language, "save")}</button>
      </form>
    </section>
  );
}

function PermissionsView({ language }: { language: Language }) {
  const [status, setStatus] = useState("");
  const speechApi = getSpeechRecognition();
  const speechSupported = Boolean(speechApi);

  async function testMicrophone() {
    setStatus("");
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus(t(language, "micDenied"));
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setStatus(t(language, "micGranted"));
    } catch {
      setStatus(t(language, "micDenied"));
    }
  }

  return (
    <section className="stack">
      <div className="panel copy-panel">
        <h2>{t(language, "permissionSection")}</h2>
        <p>{speechSupported ? t(language, "voiceReady") : t(language, "speechUnsupported")}</p>
        <p className="muted">{t(language, "voicePermissionHelp")}</p>
        <div className="permission-grid">
          <article><strong>Web Speech API</strong><span className={speechSupported ? "status-pill status-open" : "status-pill status-closed"}>{speechSupported ? "OK" : "No disponible"}</span></article>
          <article><strong>Contexto seguro</strong><span className={window.isSecureContext ? "status-pill status-open" : "status-pill status-closed"}>{window.isSecureContext ? "OK" : "No"}</span></article>
          <article><strong>Microfono</strong><button onClick={testMicrophone}>{t(language, "requestMic")}</button></article>
        </div>
        {status && <p className="notice">{status}</p>}
      </div>
    </section>
  );
}

function SettingsView({ language }: { language: Language }) {
  return (
    <section className="panel copy-panel">
      <h2>Parser local + LLM opcional</h2>
      <p>{t(language, "parserDefault")} {t(language, "offline")}</p>
      <p>{t(language, "ollamaHelp")}</p>
      <p>{t(language, "llmModels")}</p>
      <p>La interfaz futura puede enviar texto, clientes y proyectos a un proveedor local compatible con Ollama, pero el guardado y el parser actual no dependen de internet.</p>
    </section>
  );
}

function CrudPanel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="stack"><div className="panel"><h2>{title}</h2>{children}</div></section>;
}

function Cards<T extends { id: string }>({ items, render, empty }: { items: T[]; render: (item: T) => ReactNode; empty: string }) {
  return <div className="card-grid">{items.length ? items.map((item) => <article className="data-card" key={item.id}>{render(item)}</article>) : <p>{empty}</p>}</div>;
}

function EntryList({ language, entries, clients, projects, onEdit, onDelete }: { language: Language; entries: LogEntry[]; clients: Client[]; projects: Project[]; onEdit?: (entry: LogEntry) => void; onDelete?: (entry: LogEntry) => void }) {
  return (
    <div className="panel">
      <h2>{t(language, "logbook")}</h2>
      <div className="entry-list">
        {entries.map((entry) => <article key={entry.id} className={`entry-card entry-${entry.status}`}>
          <div className="entry-heading">
            <div><strong>{entry.title}</strong><p>{entry.description}</p></div>
            <span className={`status-pill status-${entry.status}`}>{statusLabels[language][entry.status]}</span>
          </div>
          <div className="entry-meta">
            <span><small>{t(language, "entryDate")}</small>{entry.entry_date}</span>
            <span><small>{t(language, "client")}</small>{clientName(clients, entry.client_id)}</span>
            <span><small>{t(language, "project")}</small>{projectName(projects, entry.project_id) || "-"}</span>
            <span><small>{t(language, "hours")}</small>{entry.hours ? `${entry.hours}h` : "-"}</span>
            <span><small>{t(language, "type")}</small>{entry.entry_type ? typeLabels[language][entry.entry_type] : "-"}</span>
          </div>
          {(entry.start_date || entry.end_date) && <div className="entry-range"><span>{t(language, "startDate")}: {entry.start_date ?? "-"}</span><span>{t(language, "endDate")}: {entry.end_date ?? "-"}</span></div>}
          {(onEdit || onDelete) && <div className="row-actions">{onEdit && <button onClick={() => onEdit(entry)}>{t(language, "edit")}</button>}{onDelete && <button onClick={() => onDelete(entry)}>{t(language, "delete")}</button>}</div>}
        </article>)}
        {!entries.length && <p>{t(language, "noRows")}</p>}
      </div>
    </div>
  );
}
