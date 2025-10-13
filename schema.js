import Database from 'better-sqlite3'

const db = new Database('videos.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file BLOB NOT NULL,
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    description TEXT NOT NULL
    );
`)

export default db;