import sqlite from "better-sqlite3";

export const connectNavigationDatabase = (): sqlite.Database => {
  const db = sqlite("src/db/navigation.sqlite");

  console.log("Connected to Sqlite Database!");

  db.pragma("journal_mode = WAL");

  return db;
};
