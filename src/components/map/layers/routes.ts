import { GeoJsonLayer } from "@deck.gl/layers/typed";
import * as Turf from "@turf/turf";
import { useMemo } from "react";
import { useRoutes } from "~/hooks/use-route";

export const useRoutesLayer = () => {
  const { results, waypoints } = useRoutes();

  const lines = useMemo(() => {
    if (results.length < 2) return [];

    const lineSegments = [];
    const initialSegments = results.map((route) => route?.[0]);

    for (let i = 1; i < initialSegments.length; i++) {
      const start = initialSegments[i - 1];
      const end = initialSegments[i];

      lineSegments.push(
        Turf.lineString(
          [
            [start?.lonx ?? 0, start?.laty ?? 0],
            [end?.lonx ?? 0, end?.laty ?? 0],
          ],
          {
            start,
            end,
          }
        )
      );
    }

    return lineSegments;
  }, [results]);

  const points = useMemo(
    () =>
      results.map((waypoint) =>
        Turf.point([waypoint?.[0]?.lonx ?? 0, waypoint?.[0]?.laty ?? 0])
      ),
    [results]
  );

  console.log(lines, results, waypoints);

  return useMemo(
    () =>
      new GeoJsonLayer({
        id: "routes",
        data: Turf.featureCollection<Turf.LineString | Turf.Point>([
          ...points,
          ...lines,
        ]),
        getLineWidth: 5,
        getPointRadius: 5,
        pointRadiusUnits: "pixels",
        lineWidthUnits: "pixels",
        getFillColor: () => [89, 13, 92, 255],
        getLineColor: () => [89, 13, 92, 192],
        getElevation: 30,
      }),
    [lines, points]
  );
};
