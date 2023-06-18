import type { Database } from "better-sqlite3";

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

export interface Airport {
  airport_id: number;
  file_id: number;
  ident: string;
  iata: string;
  name: string;
  country: string;
  region: string;
  left_lonx: number;
  top_laty: number;
  right_lonx: number;
  bottom_laty: number;
  altitude: number;
  lonx: number;
  laty: number;
}

type AirportKey = keyof Airport;

const filterKeys = <T extends Airport>(obj: T): Airport => {
  const allowedKeys = new Set(Object.keys(MOCK_AIRPORT));

  const isAllowedKey = (arg: string): arg is AirportKey => {
    return allowedKeys.has(arg);
  };

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (isAllowedKey(key)) {
      acc[key] = value;
    }
    return acc;
  }, {} as Partial<Airport>) as Airport;
};

export const getAirportByCode = (
  code: string,
  db: Database
): Airport | null => {
  const query = `SELECT * FROM airport WHERE ident = ? LIMIT 1;`;

  const row = db.prepare(query).get(code) as Airport | null;

  if (!row) return null;

  return filterKeys(row);
};
