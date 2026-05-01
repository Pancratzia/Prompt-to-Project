use argon2::{
    password_hash::{PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Algorithm, Argon2, Params, Version,
};
use chrono::Utc;
use rand_core::OsRng;
use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::Manager;
use uuid::Uuid;

struct AppState {
    db: Mutex<Connection>,
}

#[derive(Debug, thiserror::Error)]
enum AppError {
    #[error("Database error: {0}")]
    Db(#[from] rusqlite::Error),
    #[error("Password error")]
    Password,
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("Email already exists")]
    DuplicateEmail,
    #[error("Filesystem error: {0}")]
    Fs(#[from] std::io::Error),
    #[error("Application data directory not found")]
    MissingDataDir,
    #[error("Internal lock error")]
    Lock,
}

impl serde::Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

#[derive(Serialize)]
struct User {
    id: String,
    email: String,
    created_at: String,
}

#[derive(Deserialize)]
struct UserInput {
    email: String,
    password: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct Client {
    id: String,
    user_id: String,
    name: String,
    email: Option<String>,
    notes: Option<String>,
    created_at: String,
    updated_at: String,
}

#[derive(Deserialize)]
struct ClientInput {
    id: Option<String>,
    name: String,
    email: Option<String>,
    notes: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct Project {
    id: String,
    user_id: String,
    client_id: String,
    name: String,
    description: Option<String>,
    status: String,
    created_at: String,
    updated_at: String,
}

#[derive(Deserialize)]
struct ProjectInput {
    id: Option<String>,
    client_id: String,
    name: String,
    description: Option<String>,
    status: String,
}

#[derive(Serialize, Deserialize)]
struct LogEntry {
    id: String,
    user_id: String,
    client_id: String,
    project_id: Option<String>,
    title: String,
    description: String,
    entry_type: Option<String>,
    status: String,
    entry_date: String,
    start_date: Option<String>,
    end_date: Option<String>,
    hours: Option<f64>,
    source_text: Option<String>,
    created_at: String,
    updated_at: String,
}

#[derive(Deserialize)]
struct LogEntryInput {
    id: Option<String>,
    client_id: String,
    project_id: Option<String>,
    title: String,
    description: String,
    entry_type: Option<String>,
    status: String,
    entry_date: String,
    start_date: Option<String>,
    end_date: Option<String>,
    hours: Option<f64>,
    source_text: Option<String>,
}

fn now() -> String {
    Utc::now().to_rfc3339()
}

fn password_hasher() -> Argon2<'static> {
    let params = Params::new(12 * 1024, 2, 1, None).expect("valid Argon2 params");
    Argon2::new(Algorithm::Argon2id, Version::V0x13, params)
}

fn db_path(app: &tauri::AppHandle) -> Result<PathBuf, AppError> {
    let dir = app.path().app_data_dir().map_err(|_| AppError::MissingDataDir)?;
    fs::create_dir_all(&dir)?;
    Ok(dir.join("taskflow-local.sqlite"))
}

fn init_db(conn: &Connection) -> Result<(), AppError> {
    conn.execute_batch(
        r#"
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS clients (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          email TEXT,
          notes TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          client_id TEXT NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL CHECK(status IN ('open','closed')),
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS log_entries (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          client_id TEXT NOT NULL,
          project_id TEXT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          entry_type TEXT,
          status TEXT NOT NULL CHECK(status IN ('open','closed')),
          entry_date TEXT NOT NULL,
          start_date TEXT,
          end_date TEXT,
          hours REAL,
          source_text TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE,
          FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE SET NULL
        );
        "#,
    )?;
    Ok(())
}

fn state_conn<'a>(state: &'a tauri::State<AppState>) -> Result<std::sync::MutexGuard<'a, Connection>, AppError> {
    state.db.lock().map_err(|_| AppError::Lock)
}

#[tauri::command]
fn register_user(state: tauri::State<AppState>, email: String, password: String) -> Result<User, AppError> {
    if password.len() < 8 || !email.contains('@') {
        return Err(AppError::InvalidCredentials);
    }
    let conn = state_conn(&state)?;
    let exists: Option<String> = conn.query_row("SELECT id FROM users WHERE lower(email) = lower(?1)", [&email], |row| row.get(0)).optional()?;
    if exists.is_some() {
        return Err(AppError::DuplicateEmail);
    }
    let id = Uuid::new_v4().to_string();
    let created = now();
    let salt = SaltString::generate(&mut OsRng);
    let hash = password_hasher()
        .hash_password(password.as_bytes(), &salt)
        .map_err(|_| AppError::Password)?
        .to_string();
    conn.execute(
        "INSERT INTO users (id, email, password_hash, created_at) VALUES (?1, ?2, ?3, ?4)",
        params![id, email, hash, created],
    )?;
    Ok(User { id, email, created_at: created })
}

#[tauri::command]
fn login_user(state: tauri::State<AppState>, email: String, password: String) -> Result<User, AppError> {
    let conn = state_conn(&state)?;
    let record = conn
        .query_row(
            "SELECT id, email, password_hash, created_at FROM users WHERE lower(email) = lower(?1)",
            [&email],
            |row| Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?, row.get::<_, String>(2)?, row.get::<_, String>(3)?)),
        )
        .optional()?;
    let (id, normalized_email, hash, created_at) = record.ok_or(AppError::InvalidCredentials)?;
    let parsed_hash = PasswordHash::new(&hash).map_err(|_| AppError::Password)?;
    password_hasher()
        .verify_password(password.as_bytes(), &parsed_hash)
        .map_err(|_| AppError::InvalidCredentials)?;
    Ok(User { id, email: normalized_email, created_at })
}

#[tauri::command]
fn update_user(state: tauri::State<AppState>, user_id: String, input: UserInput) -> Result<User, AppError> {
    if !input.email.contains('@') {
        return Err(AppError::InvalidCredentials);
    }
    if let Some(password) = &input.password {
        if !password.is_empty() && password.len() < 8 {
            return Err(AppError::InvalidCredentials);
        }
    }
    let conn = state_conn(&state)?;
    let exists: Option<String> = conn
        .query_row(
            "SELECT id FROM users WHERE lower(email) = lower(?1) AND id <> ?2",
            params![input.email, user_id],
            |row| row.get(0),
        )
        .optional()?;
    if exists.is_some() {
        return Err(AppError::DuplicateEmail);
    }
    if let Some(password) = input.password.filter(|value| !value.is_empty()) {
        let salt = SaltString::generate(&mut OsRng);
        let hash = password_hasher()
            .hash_password(password.as_bytes(), &salt)
            .map_err(|_| AppError::Password)?
            .to_string();
        conn.execute("UPDATE users SET email=?1, password_hash=?2 WHERE id=?3", params![input.email, hash, user_id])?;
    } else {
        conn.execute("UPDATE users SET email=?1 WHERE id=?2", params![input.email, user_id])?;
    }
    Ok(conn.query_row(
        "SELECT id, email, created_at FROM users WHERE id=?1",
        [user_id],
        |row| Ok(User { id: row.get(0)?, email: row.get(1)?, created_at: row.get(2)? }),
    )?)
}

#[tauri::command]
fn list_clients(state: tauri::State<AppState>, user_id: String) -> Result<Vec<Client>, AppError> {
    let conn = state_conn(&state)?;
    let mut stmt = conn.prepare("SELECT id, user_id, name, email, notes, created_at, updated_at FROM clients WHERE user_id = ?1 ORDER BY name")?;
    let rows = stmt.query_map([user_id], |row| {
        Ok(Client {
            id: row.get(0)?,
            user_id: row.get(1)?,
            name: row.get(2)?,
            email: row.get(3)?,
            notes: row.get(4)?,
            created_at: row.get(5)?,
            updated_at: row.get(6)?,
        })
    })?;
    Ok(rows.collect::<Result<Vec<_>, _>>()?)
}

#[tauri::command]
fn save_client(state: tauri::State<AppState>, user_id: String, input: ClientInput) -> Result<Client, AppError> {
    let conn = state_conn(&state)?;
    let id = input.id.unwrap_or_else(|| Uuid::new_v4().to_string());
    let created = now();
    let updated = created.clone();
    conn.execute(
        r#"INSERT INTO clients (id, user_id, name, email, notes, created_at, updated_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
           ON CONFLICT(id) DO UPDATE SET name=excluded.name, email=excluded.email, notes=excluded.notes, updated_at=excluded.updated_at
           WHERE clients.user_id = excluded.user_id"#,
        params![id, user_id, input.name, input.email, input.notes, created, updated],
    )?;
    Ok(conn.query_row(
        "SELECT id, user_id, name, email, notes, created_at, updated_at FROM clients WHERE id=?1 AND user_id=?2",
        params![id, user_id],
        |row| Ok(Client { id: row.get(0)?, user_id: row.get(1)?, name: row.get(2)?, email: row.get(3)?, notes: row.get(4)?, created_at: row.get(5)?, updated_at: row.get(6)? }),
    )?)
}

#[tauri::command]
fn delete_client(state: tauri::State<AppState>, user_id: String, id: String) -> Result<(), AppError> {
    let conn = state_conn(&state)?;
    conn.execute("DELETE FROM clients WHERE id=?1 AND user_id=?2", params![id, user_id])?;
    Ok(())
}

#[tauri::command]
fn list_projects(state: tauri::State<AppState>, user_id: String) -> Result<Vec<Project>, AppError> {
    let conn = state_conn(&state)?;
    let mut stmt = conn.prepare("SELECT id, user_id, client_id, name, description, status, created_at, updated_at FROM projects WHERE user_id = ?1 ORDER BY name")?;
    let rows = stmt.query_map([user_id], |row| {
        Ok(Project { id: row.get(0)?, user_id: row.get(1)?, client_id: row.get(2)?, name: row.get(3)?, description: row.get(4)?, status: row.get(5)?, created_at: row.get(6)?, updated_at: row.get(7)? })
    })?;
    Ok(rows.collect::<Result<Vec<_>, _>>()?)
}

#[tauri::command]
fn save_project(state: tauri::State<AppState>, user_id: String, input: ProjectInput) -> Result<Project, AppError> {
    let conn = state_conn(&state)?;
    let id = input.id.unwrap_or_else(|| Uuid::new_v4().to_string());
    let created = now();
    let updated = created.clone();
    conn.execute(
        r#"INSERT INTO projects (id, user_id, client_id, name, description, status, created_at, updated_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
           ON CONFLICT(id) DO UPDATE SET client_id=excluded.client_id, name=excluded.name, description=excluded.description, status=excluded.status, updated_at=excluded.updated_at
           WHERE projects.user_id = excluded.user_id"#,
        params![id, user_id, input.client_id, input.name, input.description, input.status, created, updated],
    )?;
    Ok(conn.query_row(
        "SELECT id, user_id, client_id, name, description, status, created_at, updated_at FROM projects WHERE id=?1 AND user_id=?2",
        params![id, user_id],
        |row| Ok(Project { id: row.get(0)?, user_id: row.get(1)?, client_id: row.get(2)?, name: row.get(3)?, description: row.get(4)?, status: row.get(5)?, created_at: row.get(6)?, updated_at: row.get(7)? }),
    )?)
}

#[tauri::command]
fn delete_project(state: tauri::State<AppState>, user_id: String, id: String) -> Result<(), AppError> {
    let conn = state_conn(&state)?;
    conn.execute("DELETE FROM projects WHERE id=?1 AND user_id=?2", params![id, user_id])?;
    Ok(())
}

#[tauri::command]
fn list_log_entries(state: tauri::State<AppState>, user_id: String) -> Result<Vec<LogEntry>, AppError> {
    let conn = state_conn(&state)?;
    let mut stmt = conn.prepare("SELECT id, user_id, client_id, project_id, title, description, entry_type, status, entry_date, start_date, end_date, hours, source_text, created_at, updated_at FROM log_entries WHERE user_id = ?1 ORDER BY entry_date DESC, created_at DESC")?;
    let rows = stmt.query_map([user_id], |row| {
        Ok(LogEntry { id: row.get(0)?, user_id: row.get(1)?, client_id: row.get(2)?, project_id: row.get(3)?, title: row.get(4)?, description: row.get(5)?, entry_type: row.get(6)?, status: row.get(7)?, entry_date: row.get(8)?, start_date: row.get(9)?, end_date: row.get(10)?, hours: row.get(11)?, source_text: row.get(12)?, created_at: row.get(13)?, updated_at: row.get(14)? })
    })?;
    Ok(rows.collect::<Result<Vec<_>, _>>()?)
}

#[tauri::command]
fn save_log_entry(state: tauri::State<AppState>, user_id: String, input: LogEntryInput) -> Result<LogEntry, AppError> {
    let conn = state_conn(&state)?;
    let id = input.id.unwrap_or_else(|| Uuid::new_v4().to_string());
    let created = now();
    let updated = created.clone();
    conn.execute(
        r#"INSERT INTO log_entries (id, user_id, client_id, project_id, title, description, entry_type, status, entry_date, start_date, end_date, hours, source_text, created_at, updated_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15)
           ON CONFLICT(id) DO UPDATE SET client_id=excluded.client_id, project_id=excluded.project_id, title=excluded.title, description=excluded.description, entry_type=excluded.entry_type, status=excluded.status, entry_date=excluded.entry_date, start_date=excluded.start_date, end_date=excluded.end_date, hours=excluded.hours, source_text=excluded.source_text, updated_at=excluded.updated_at
           WHERE log_entries.user_id = excluded.user_id"#,
        params![id, user_id, input.client_id, input.project_id, input.title, input.description, input.entry_type, input.status, input.entry_date, input.start_date, input.end_date, input.hours, input.source_text, created, updated],
    )?;
    Ok(conn.query_row(
        "SELECT id, user_id, client_id, project_id, title, description, entry_type, status, entry_date, start_date, end_date, hours, source_text, created_at, updated_at FROM log_entries WHERE id=?1 AND user_id=?2",
        params![id, user_id],
        |row| Ok(LogEntry { id: row.get(0)?, user_id: row.get(1)?, client_id: row.get(2)?, project_id: row.get(3)?, title: row.get(4)?, description: row.get(5)?, entry_type: row.get(6)?, status: row.get(7)?, entry_date: row.get(8)?, start_date: row.get(9)?, end_date: row.get(10)?, hours: row.get(11)?, source_text: row.get(12)?, created_at: row.get(13)?, updated_at: row.get(14)? }),
    )?)
}

#[tauri::command]
fn delete_log_entry(state: tauri::State<AppState>, user_id: String, id: String) -> Result<(), AppError> {
    let conn = state_conn(&state)?;
    conn.execute("DELETE FROM log_entries WHERE id=?1 AND user_id=?2", params![id, user_id])?;
    Ok(())
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let path = db_path(app.handle())?;
            let conn = Connection::open(path)?;
            init_db(&conn)?;
            app.manage(AppState { db: Mutex::new(conn) });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            register_user,
            login_user,
            update_user,
            list_clients,
            save_client,
            delete_client,
            list_projects,
            save_project,
            delete_project,
            list_log_entries,
            save_log_entry,
            delete_log_entry
        ])
        .run(tauri::generate_context!())
        .expect("error while running TaskFlow Local");
}
