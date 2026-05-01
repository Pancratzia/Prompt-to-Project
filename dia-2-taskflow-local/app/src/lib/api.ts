import type { Client, DraftLogEntry, LogEntry, Project, User } from "../types";

type Command =
  | "register_user"
  | "login_user"
  | "update_user"
  | "list_clients"
  | "save_client"
  | "delete_client"
  | "list_projects"
  | "save_project"
  | "delete_project"
  | "list_log_entries"
  | "save_log_entry"
  | "delete_log_entry";

declare global {
  interface Window {
    __TAURI_INTERNALS__?: unknown;
  }
}

async function call<T>(command: Command, args?: Record<string, unknown>): Promise<T> {
  if (!window.__TAURI_INTERNALS__) {
    throw new Error("Esta app debe abrirse con Tauri. Usa `npm run tauri:dev` desde `dia-2-taskflow-local/app`; `npm run dev` solo abre el frontend y no puede acceder a SQLite.");
  }

  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<T>(command, args);
}

export const api = {
  register: (email: string, password: string) => call<User>("register_user", { email, password }),
  login: (email: string, password: string) => call<User>("login_user", { email, password }),
  updateUser: (userId: string, input: { email: string; password?: string }) => call<User>("update_user", { userId, input }),
  clients: (userId: string) => call<Client[]>("list_clients", { userId }),
  saveClient: (userId: string, input: Partial<Client> & { name: string }) => call<Client>("save_client", { userId, input }),
  deleteClient: (userId: string, id: string) => call<void>("delete_client", { userId, id }),
  projects: (userId: string) => call<Project[]>("list_projects", { userId }),
  saveProject: (userId: string, input: Partial<Project> & { name: string; client_id: string; status: string }) =>
    call<Project>("save_project", { userId, input }),
  deleteProject: (userId: string, id: string) => call<void>("delete_project", { userId, id }),
  entries: (userId: string) => call<LogEntry[]>("list_log_entries", { userId }),
  saveEntry: (userId: string, input: DraftLogEntry | (Partial<LogEntry> & DraftLogEntry)) => call<LogEntry>("save_log_entry", { userId, input }),
  deleteEntry: (userId: string, id: string) => call<void>("delete_log_entry", { userId, id })
};
