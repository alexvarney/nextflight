"use client";

import { MapView, WebMercatorViewport } from "@deck.gl/core/typed";
import DeckGL from "@deck.gl/react/typed";
import { useCallback, useState } from "react";
import { useAirportLayer } from "~/components/map/layers/airports";
import { useBasemapLayer } from "~/components/map/layers/base-map";
import { useRoutesLayer } from "~/components/map/layers/routes";
import { useBboxAirports } from "~/hooks/use-bbox-airports";

const INITIAL_VIEW_STATE = {
  latitude: 44,
  longitude: -80.5,
  zoom: 7.5,
  pitch: 0,
  bearing: 0,
};

export type ViewState = typeof INITIAL_VIEW_STATE;

export default function AirportMap() {
  const { airports, onMapChanged } = useBboxAirports();

  const [viewState, setViewState] =
    useState<Record<string, any>>(INITIAL_VIEW_STATE);

  const onViewChange = useCallback(
    (view: ViewState) => {
      const viewport = new WebMercatorViewport(view);
      const bbox = viewport.getBounds();

      setViewState(view);
      onMapChanged({ ...view, bbox });
    },
    [setViewState, onMapChanged]
  );

  const basemapLayer = useBasemapLayer();
  const airportLayer = useAirportLayer(airports ?? []);
  const routesLayer = useRoutesLayer();

  return (
    <DeckGL
      onViewStateChange={(e) => onViewChange(e.viewState as ViewState)}
      viewState={viewState}
      controller={true}
      layers={[basemapLayer, airportLayer, routesLayer]}
      views={[new MapView({ repeat: true })]}
    />
  );
}
