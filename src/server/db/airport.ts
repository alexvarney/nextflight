import type { Database } from "better-sqlite3";
import { z } from "zod";

const MOCK_AIRPORT: Airport = {
  airport_id: 1507,
  file_id: 1,
  ident: "CYKF",
  iata: "YKF",
  name: "Waterloo",
  country: "CAN",
  region: "CY",
  left_lonx: -80.39161682128906,
  top_laty: 43.46603775024414,
  right_lonx: -80.36580657958984,
  bottom_laty: 43.455509185791016,
  altitude: 1054,
  lonx: -80.37870788574219,
  laty: 43.46077346801758,
};

const AirportSchema = z.object({
  airport_id: z.number(),
  file_id: z.number(),
  ident: z.string(),
  iata: z.optional(z.string()).nullable(),
  name: z.string(),
  country: z.string(),
  region: z.string(),
  left_lonx: z.number(),
  top_laty: z.number(),
  right_lonx: z.number(),
  bottom_laty: z.number(),
  altitude: z.number(),
  lonx: z.number(),
  laty: z.number(),
});

const AirportArray = z.array(AirportSchema);

export type Airport = z.infer<typeof AirportSchema>;

export const getAirportByCode = (
  code: string,
  db: Database
): Airport | null => {
  const query = `SELECT * FROM airport WHERE lower(ident) = ? LIMIT 1;`;

  const row = db.prepare(query).get(code.toLowerCase()) as Airport | null;

  if (!row) return null;

  const parsed = AirportSchema.parse(row);

  return parsed;
};

/**
 *  BBox extent in minX, minY, maxX, maxY order
 */
export const BBoxSchema = z.number().array().length(4);
export type BBox = z.infer<typeof BBoxSchema>;

export const getAirportsByBbox = (bbox: BBox, db: Database) => {
  const [minX, minY, maxX, maxY] = bbox;

  const query = db.prepare(`SELECT * FROM airport_rtree
    RIGHT JOIN airport ON airport_rtree.id = airport.airport_id
    WHERE minX > ?
    AND maxX < ?
    AND minY > ?
    AND maxY < ?`);

  const results = query.all([minX, maxX, minY, maxY]);

  return AirportArray.parse(results);
};
