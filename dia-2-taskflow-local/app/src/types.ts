export type Language = "es" | "en";
export type Status = "open" | "closed";

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Client = {
  id: string;
  user_id: string;
  name: string;
  email?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  client_id: string;
  name: string;
  description?: string | null;
  status: Status;
  created_at: string;
  updated_at: string;
};

export type EntryType = "client_request" | "work_done" | "meeting" | "follow_up" | "general_note";

export type LogEntry = {
  id: string;
  user_id: string;
  client_id: string;
  project_id?: string | null;
  title: string;
  description: string;
  entry_type?: EntryType | null;
  status: Status;
  entry_date: string;
  start_date?: string | null;
  end_date?: string | null;
  hours?: number | null;
  source_text?: string | null;
  created_at: string;
  updated_at: string;
};

export type DraftLogEntry = Omit<LogEntry, "id" | "user_id" | "created_at" | "updated_at">;

export type ParsedSuggestion = DraftLogEntry & {
  clientName?: string;
  projectName?: string;
  confidence: "high" | "medium" | "low";
  issues: string[];
};
