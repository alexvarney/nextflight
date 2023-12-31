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
  rating: 1,
  longest_runway_length: 7003,
  size: 1,
  tower_frequency: 118500,
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
  rating: z.number(),
  longest_runway_length: z.number(),
  size: z.optional(z.number()),
  tower_frequency: z.nullable(z.number()),
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

  const query = db.prepare(`
    SELECT 
      *,
      CASE 
        WHEN l.airport_id IS NOT NULL THEN 2
        WHEN m.airport_id IS NOT NULL THEN 1
        ELSE 0
      END AS size
      FROM airport_rtree
        LEFT JOIN 
          airport_large l ON airport_rtree.id = l.airport_id
        LEFT JOIN 
          airport_medium m ON airport_rtree.id = m.airport_id
        RIGHT JOIN 
          airport ON airport_rtree.id = airport.airport_id
      WHERE minX > ?
        AND maxX < ?
        AND minY > ?
        AND maxY < ?
      ORDER BY size DESC, longest_runway_length DESC
      LIMIT 250
`);

  const results = query.all([minX, maxX, minY, maxY]);

  return AirportArray.parse(results);
};

const RunwaySchema = z.object({
  runway_id: z.number(),
  length: z.number(),
  width: z.number(),
  primary_name: z.string(),
  secondary_name: z.string(),
});

const RunwayArray = z.array(RunwaySchema);

export type Runway = z.infer<typeof RunwaySchema>;

export const getAirportRunways = (code: string, db: Database) => {
  const query = db.prepare(`
    SELECT 
      runway_id, 
      length, 
      width, 
      primary_end.name AS primary_name, 
      secondary_end.name AS secondary_name 
    FROM airport
	    RIGHT JOIN runway 
        ON runway.airport_id = airport.airport_id
	    RIGHT JOIN runway_end primary_end 
        ON primary_end.runway_end_id = runway.primary_end_id
	    RIGHT JOIN runway_end secondary_end 
        ON secondary_end.runway_end_id = runway.secondary_end_id
    WHERE LOWER(airport.ident) = ?
    `);

  const results = query.all(code.toLowerCase());

  return RunwayArray.parse(results);
};
