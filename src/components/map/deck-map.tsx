"use client";

import { WebMercatorViewport } from "@deck.gl/core/typed";
import DeckGL from "@deck.gl/react/typed";
import { useCallback, useState } from "react";
import { useAirportLayer } from "~/components/map/layers/airports";
import { useBasemapLayer } from "~/components/map/layers/base-map";
import { useRoutesLayer } from "~/components/map/layers/routes";
import { Airport, BBox } from "~/server/db/airport";

const INITIAL_VIEW_STATE = {
  latitude: 44,
  longitude: -80.5,
  zoom: 7.5,
  pitch: 0,
  bearing: 0,
};

export type ViewState = typeof INITIAL_VIEW_STATE;

interface MapProps {
  onViewStateChange?: (state: ViewState & { bbox: BBox }) => void;
  airports: Airport[];
}

export default function AirportMap(props: MapProps) {
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

  const basemapLayer = useBasemapLayer();
  const airportLayer = useAirportLayer(props.airports);
  const routesLayer = useRoutesLayer();

  return (
    <DeckGL
      onViewStateChange={(e) => onViewChange(e.viewState as ViewState)}
      viewState={viewState}
      controller={true}
      layers={[basemapLayer, airportLayer, routesLayer]}
    />
  );
}
