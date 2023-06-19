import sqlite from "better-sqlite3";

export const connectNavigationDatabase = (): sqlite.Database => {
  const db = sqlite("src/db/navigation.sqlite");

  console.log("Connected to Sqlite Database!");

  db.pragma("journal_mode = WAL");

  db.prepare(
    `
    CREATE VIRTUAL TABLE IF NOT EXISTS airport_rtree USING rtree(
      id,              -- Integer primary key
      minX, maxX,      -- Minimum and maximum X coordinate
      minY, maxY       -- Minimum and maximum Y coordinate
      UNIQUE(id)
    );
  `
  ).run();

  db.prepare(
    `
    INSERT OR IGNORE INTO airport_rtree (id, minX, maxX, minY, maxY)
      SELECT airport_id, left_lonx, right_lonx, bottom_laty, top_laty
      FROM airport;
  `
  ).run();

  return db;
};
