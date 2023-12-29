import { GeoJsonLayer } from "@deck.gl/layers/typed";
import * as Turf from "@turf/turf";
import { useMemo } from "react";
import { Airport } from "~/server/db/airport";

export const useAirportLayer = (airports: Airport[]) => {
  return useMemo(
    () =>
      new GeoJsonLayer({
        data: Turf.featureCollection(
          airports.map((airport) =>
            Turf.point([airport.lonx, airport.laty], airport)
          )
        ),
        pointType: "circle",
        getPointRadius: (f) => {
          switch (f.properties?.size) {
            case "large":
              return 2500;
            case "medium":
              return 1500;
            case "small":
            default:
              return 750;
          }
        },
        pointRadiusUnits: "meters",
        pointRadiusMinPixels: 5,
        lineWidthMinPixels: 1,
        stroked: true,
        getLineWidth: 400,
        lineWidthUnits: "meters",
        getFillColor: (f) =>
          f.properties?.tower_frequency !== null
            ? [18, 72, 136, 128]
            : [102, 28, 65, 128],
        getLineColor: (f) =>
          f.properties?.tower_frequency !== null
            ? [18, 72, 136, 255]
            : [102, 28, 65, 255],
      }),
    [airports]
  );
};
