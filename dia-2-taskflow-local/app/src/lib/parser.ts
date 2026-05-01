import type { Client, DraftLogEntry, EntryType, Language, ParsedSuggestion, Project } from "../types";
import { isoDate } from "./date";

const weekdays: Record<string, number> = {
  domingo: 0,
  sunday: 0,
  lunes: 1,
  monday: 1,
  martes: 2,
  tuesday: 2,
  miercoles: 3,
  wednesday: 3,
  jueves: 4,
  thursday: 4,
  viernes: 5,
  friday: 5,
  sabado: 6,
  saturday: 6
};

const numberWords: Record<string, number> = {
  una: 1,
  un: 1,
  one: 1,
  dos: 2,
  two: 2,
  tres: 3,
  three: 3,
  cuatro: 4,
  four: 4,
  cinco: 5,
  five: 5,
  seis: 6,
  six: 6,
  siete: 7,
  seven: 7,
  ocho: 8,
  eight: 8
};

const months: Record<string, number> = {
  enero: 0,
  january: 0,
  febrero: 1,
  february: 1,
  marzo: 2,
  march: 2,
  abril: 3,
  april: 3,
  mayo: 4,
  may: 4,
  junio: 5,
  june: 5,
  julio: 6,
  july: 6,
  agosto: 7,
  august: 7,
  septiembre: 8,
  setiembre: 8,
  september: 8,
  octubre: 9,
  october: 9,
  noviembre: 10,
  november: 10,
  diciembre: 11,
  december: 11
};

export function detectLanguage(text: string): Language {
  const lower = normalize(text);
  const esSignals = [" para ", " trabaje ", " horas ", " pidio ", " hoy", " ayer", " lunes", " martes", " miercoles", " jueves", " viernes"];
  const enSignals = [" for ", " worked ", " hours ", " asked ", " today", " yesterday", " monday", " tuesday", " wednesday", " thursday", " friday"];
  const es = esSignals.filter((signal) => lower.includes(signal)).length;
  const en = enSignals.filter((signal) => lower.includes(signal)).length;
  return en > es ? "en" : "es";
}

export function parseNaturalText(text: string, clients: Client[], projects: Project[], activeLanguage?: Language): ParsedSuggestion[] {
  const language = activeLanguage ?? detectLanguage(text);
  const parts = splitIntoParts(text);
  return parts.map((part) => parsePart(part, clients, projects, language));
}

function parsePart(raw: string, clients: Client[], projects: Project[], language: Language): ParsedSuggestion {
  const source = raw.trim();
  const lowered = normalize(` ${source} `);
  const client = findClient(source, clients);
  const clientProjects = client ? projects.filter((project) => project.client_id === client.id) : projects;
  const project = findProject(source, clientProjects);
  const dates = parseDates(source);
  const hours = parseHours(source);
  const entryType = inferType(lowered);
  const action = cleanAction(source, client?.name, project?.name);
  const title = action || (language === "es" ? "Entrada de bitacora" : "Logbook entry");
  const issues: string[] = [];

  if (!client) {
    const possibleName = extractPossibleClient(source);
    if (possibleName) issues.push(possibleName);
  }

  const draft: DraftLogEntry = {
    client_id: client?.id ?? "",
    project_id: project?.id ?? null,
    title: title.slice(0, 90),
    description: source,
    entry_type: entryType,
    status: "open",
    entry_date: dates.entry_date,
    start_date: dates.start_date,
    end_date: dates.end_date,
    hours,
    source_text: source
  };

  return {
    ...draft,
    clientName: client?.name ?? extractPossibleClient(source),
    projectName: project?.name,
    confidence: client ? (project ? "high" : "medium") : "low",
    issues
  };
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function splitIntoParts(text: string) {
  const byLine = text
    .split(/\n|;|\. (?=(?:para|for)\s+[A-ZÁÉÍÓÚÑ])/i)
    .map((part) => part.replace(/\.$/, "").trim())
    .filter(Boolean);
  return byLine.length ? byLine : [text.trim()];
}

function findClient(text: string, clients: Client[]) {
  const lower = normalize(text);
  return clients.find((client) => lower.includes(normalize(client.name)));
}

function findProject(text: string, projects: Project[]) {
  const lower = normalize(text);
  return projects.find((project) => lower.includes(normalize(project.name)));
}

function extractPossibleClient(text: string) {
  const match = text.match(/\b(?:para|for)\s+([A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ-]+)/) ?? text.match(/^([A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ-]+)\s+(?:me\s+)?(?:pidio|asked)/i);
  return match?.[1];
}

function inferType(lowered: string): EntryType {
  if (/(pidio|asked|requested|solicito)/.test(lowered)) return "client_request";
  if (/(reunion|meeting|call|llamada)/.test(lowered)) return "meeting";
  if (/(seguimiento|follow.?up|revisar|review)/.test(lowered)) return "follow_up";
  if (/(trabaje|worked|hice|tuve que|hacer|made|avance|built|fixed|ajustes)/.test(lowered)) return "work_done";
  return "general_note";
}

function cleanAction(text: string, clientName?: string, projectName?: string) {
  const actionMatch = text.match(/\b(?:tuve que|hice|trabaje|trabajé|avance|avancé|worked on|worked|had to|made|built|fixed)\s+(.+)/i);
  let title = (actionMatch?.[1] ?? text)
    .replace(/\b(para|for)\s+[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ-]+/i, "")
    .replace(/\b(?:para|for)\s+(?:la|el|the)?\s*[^.]+?\s+(?:de|for)\s+[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ-]+/i, "")
    .replace(/^[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ-]+\s+(?:me\s+)?(?:pidio|pidió|asked)(?:\s+me)?(?:\s+to)?\s*/i, "")
    .replace(/^(?:me\s+)?(?:pidio|pidió|asked)(?:\s+me)?(?:\s+to)?\s*/i, "")
    .replace(/\b(?:el|on|from|de|del|al|to|next|antes|before|esta semana|this week)\s+(?:lunes|martes|miercoles|miércoles|jueves|viernes|sabado|sábado|domingo|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi, "")
    .replace(/\b(?:el|on)?\s*(?:lunes|martes|miercoles|miércoles|jueves|viernes|sabado|sábado|domingo|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi, "")
    .replace(/\b\d{1,2}\s+de\s+\w+\s+(?:del?|de)?\s*\d{4}\b/gi, "")
    .replace(/\b(?:de|this)\s+(?:esta\s+)?semana\b/gi, "")
    .replace(/\b\d+(?:[.,]\d+)?\s*(h|hr|hrs|hora|horas|hours?)\b/gi, "")
    .replace(/\b(una|un|one|two|three|four|five|six|seven|eight|dos|tres|cuatro|cinco|seis|siete|ocho)\s+(hora|horas|hours?)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (clientName) title = title.replace(new RegExp(clientName, "i"), "").trim();
  if (projectName) title = title.replace(new RegExp(projectName, "i"), projectName).trim();
  title = title.replace(/^[,.\s-]+|[,.\s-]+$/g, "");
  return title ? title.charAt(0).toUpperCase() + title.slice(1) : "";
}

function parseHours(text: string) {
  const lower = normalize(text);
  const numeric = lower.match(/\b(\d+(?:[.,]\d+)?)\s*(h|hr|hrs|hora|horas|hours?)\b/);
  if (numeric) return Number(numeric[1].replace(",", "."));
  const word = lower.match(/\b(una|un|one|two|three|four|five|six|seven|eight|dos|tres|cuatro|cinco|seis|siete|ocho)\s+(hora|horas|hours?)\b/);
  if (word) return numberWords[word[1]];
  return null;
}

function parseDates(text: string) {
  const lower = normalize(text);
  const today = new Date();
  const absoluteDate = parseAbsoluteDate(lower);
  const weekdayBeforeAbsolute = Object.keys(weekdays).find((name) => new RegExp(`\\b${name}\\b.*\\b(antes|before)\\b`).test(lower));

  if (absoluteDate && weekdayBeforeAbsolute) {
    return oneDate(previousWeekday(weekdayBeforeAbsolute, absoluteDate));
  }

  if (/\b(hoy|today)\b/.test(lower)) return oneDate(today);
  if (/\b(ayer|yesterday)\b/.test(lower)) {
    const date = new Date(today);
    date.setDate(date.getDate() - 1);
    return oneDate(date);
  }

  const range = lower.match(/\b(?:de|from)\s+(\w+)\s+(?:a|al|to)\s+(\w+)\b/);
  if (range && weekdays[range[1]] !== undefined && weekdays[range[2]] !== undefined) {
    return rangeDates(weekdayInCurrentWeek(range[1], today), weekdayInCurrentWeek(range[2], today));
  }

  const next = lower.match(/\bnext\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/);
  if (next) return oneDate(nextWeekday(next[1], today));

  if (absoluteDate) return oneDate(absoluteDate);

  const weekday = Object.keys(weekdays).find((name) => new RegExp(`\\b${name}\\b`).test(lower));
  if (weekday) return oneDate(weekdayInCurrentWeek(weekday, today));

  return oneDate(today);
}

function parseAbsoluteDate(lower: string) {
  const spanish = lower.match(/\b(\d{1,2})\s+de\s+(\w+)\s+(?:del?|de)?\s*(\d{4})\b/);
  if (spanish && months[spanish[2]] !== undefined) {
    return new Date(Number(spanish[3]), months[spanish[2]], Number(spanish[1]));
  }

  const english = lower.match(/\b(\w+)\s+(\d{1,2}),?\s+(\d{4})\b/);
  if (english && months[english[1]] !== undefined) {
    return new Date(Number(english[3]), months[english[1]], Number(english[2]));
  }

  return null;
}

function oneDate(date: Date) {
  const value = isoDate(date);
  return { entry_date: value, start_date: null, end_date: null };
}

function rangeDates(start: Date, end: Date) {
  if (end < start) end.setDate(end.getDate() + 7);
  return { entry_date: isoDate(start), start_date: isoDate(start), end_date: isoDate(end) };
}

function nextOrCurrentWeekday(name: string, from: Date) {
  const date = new Date(from);
  const target = weekdays[name];
  const diff = (target + 7 - date.getDay()) % 7;
  date.setDate(date.getDate() + diff);
  return date;
}

function weekdayInCurrentWeek(name: string, from: Date) {
  const date = new Date(from);
  const target = weekdays[name];
  const current = date.getDay();
  date.setDate(date.getDate() + target - current);
  return date;
}

function previousWeekday(name: string, from: Date) {
  const date = new Date(from);
  const target = weekdays[name];
  let diff = (date.getDay() - target + 7) % 7;
  if (diff === 0) diff = 7;
  date.setDate(date.getDate() - diff);
  return date;
}

function nextWeekday(name: string, from: Date) {
  const date = nextOrCurrentWeekday(name, from);
  if (date.toDateString() === from.toDateString()) date.setDate(date.getDate() + 7);
  return date;
}
