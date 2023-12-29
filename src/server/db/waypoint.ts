import type { Database } from "better-sqlite3";
import { z } from "zod";
// there is a list of waypoint types here: https://github.com/albar965/littlenavmap/blob/da80a04983bf20094b7929ed5cb135dcee5814f9/src/search/navsearch.cpp#L92

const WaypointSchema = z.object({
  ident: z.string(),
  lonx: z.number(),
  laty: z.number(),
});

export type Waypoint = z.infer<typeof WaypointSchema>;

export const getWaypoint = (code: string, db: Database): Waypoint[] | null => {
  const waypointQuery = `SELECT * FROM nav_search WHERE lower(ident) = ?;`;

  const waypointRows = db.prepare(waypointQuery).all(code.toLowerCase());

  if (waypointRows.length > 0) {
    return z.array(WaypointSchema).parse(waypointRows);
  }

  const airportQuery = `SELECT * FROM airport WHERE lower(ident) = ? LIMIT 1;`;
  const airportRow = db.prepare(airportQuery).get(code.toLowerCase());

  if (!airportRow) return null;

  return [WaypointSchema.parse(airportRow)];
};
