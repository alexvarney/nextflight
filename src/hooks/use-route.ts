import React, { useContext, useMemo } from "react";
import { trpc } from "~/utils/trpc";

export const _useRoutes = () => {
  const [waypoints, setWaypoints] = React.useState<string[]>([]);

  const waypointQueries = trpc.useQueries((t) =>
    waypoints.map((icao) => t.getWaypoint({ code: icao }))
  );

  const results = useMemo(
    () => waypointQueries.map((result) => result.data),
    [waypointQueries]
  );

  return { results, waypoints, setWaypoints };
};

export const RoutesContext = React.createContext<ReturnType<typeof _useRoutes>>(
  {
    results: [],
    waypoints: [],
    setWaypoints: (...args: any[]) => null,
  }
);

export const useRoutes = () => useContext(RoutesContext);
