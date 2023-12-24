import { WebMercatorViewport } from "@deck.gl/core/typed";
import { TileLayer } from "@deck.gl/geo-layers/typed";
import { BitmapLayer, GeoJsonLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react/typed";
import * as Turf from "@turf/turf";
import { useCallback, useState } from "react";
import { Airport, BBox } from "~/server/db/airport";

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

export type ViewState = typeof INITIAL_VIEW_STATE;

interface MapProps {
  onViewStateChange?: (state: ViewState & { bbox: BBox }) => void;
  airports: Airport[];
}

export default function AirportMap(props: MapProps) {
  const streetMapLayer = new TileLayer({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",

    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props) => {
      const {
        //@ts-ignore
        bbox: { west, south, east, north },
      } = props.tile;

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [west, south, east, north],
      });
    },
  });

  const airportLayer = new GeoJsonLayer({
    data: Turf.featureCollection(
      props.airports.map((airport) =>
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
  });

  const [viewState, setViewState] =
    useState<Record<string, any>>(INITIAL_VIEW_STATE);

  const onViewChange = useCallback(
    (view: ViewState) => {
      const viewport = new WebMercatorViewport(view);
      const bbox = viewport.getBounds();

      props.onViewStateChange?.({ ...view, bbox });
      setViewState(view);
    },
    [setViewState, props.onViewStateChange]
  );

  return (
    <DeckGL
      onViewStateChange={(e) => onViewChange(e.viewState as ViewState)}
      viewState={viewState}
      controller={true}
      layers={[streetMapLayer, airportLayer]}
    />
  );
}
