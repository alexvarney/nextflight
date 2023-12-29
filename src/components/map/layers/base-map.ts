import { TileLayer } from "@deck.gl/geo-layers/typed";
import { BitmapLayer } from "@deck.gl/layers/typed";
import { useMemo } from "react";

export const useBasemapLayer = () => {
  return useMemo(
    () =>
      new TileLayer({
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
      }),
    []
  );
};
