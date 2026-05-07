// lib/db.js
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

// Ensure the data folder exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Path to SQLite DB
const dbPath = path.join(dataDir, "blogs.db");

// Initialize DB
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database at", dbPath);

    // Create table
    db.run(
      `
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        metaTitle TEXT,
        metaDesc TEXT,
        author TEXT,
        category TEXT,
        content TEXT,
        image TEXT,
        createdAt TEXT,
        updatedAt TEXT,
        slugTitle TEXT UNIQUE
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log("Blogs table ready");
        }
      },
    );
  }
});

// Helper functions
export const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else
        resolve({
          lastID: this.lastID, // ← This is what you use
          changes: this.changes,
        });
    });
  });
};

export default db;
