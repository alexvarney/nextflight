import { createContext, useContext, useState } from "react";
import { type ViewState } from "~/components/map/deck-map";
import { BBox } from "~/server/db/airport";
import { trpc } from "~/utils/trpc";

export const _useBboxAirports = () => {
  const [bbox, setBbox] = useState<number[]>([0, 0, 0, 0]);

  const bboxResult = trpc.getAiportsInBBox.useQuery(
    { bbox },
    { keepPreviousData: true }
  );

  const onMapChanged = (state: ViewState & { bbox: BBox }) => {
    setBbox(state.bbox);
  };

  return { airports: bboxResult.data, onMapChanged };
};

export const BboxAiportsContext = createContext<
  ReturnType<typeof _useBboxAirports>
>({
  airports: undefined,
  onMapChanged: (...args: any[]) => null,
});

export const useBboxAirports = () => useContext(BboxAiportsContext);
