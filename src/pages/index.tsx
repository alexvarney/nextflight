"use client";

import { useState } from "react";
import tw from "twin.macro";
import { AirportListItem } from "~/components/airport-list-item";

import dynamic from "next/dynamic";
import { BBox } from "~/server/db/airport";
import type { ViewState } from "../components/map";
import { trpc } from "../utils/trpc";

const AirportMap = dynamic(() => import("../components/map"), { ssr: false });

const Wrapper = tw.div`w-screen h-screen flex flex-col justify-center items-center relative`;

export default function IndexPage() {
  const [bbox, setBbox] = useState<number[]>([0, 0, 0, 0]);

  const bboxResult = trpc.getAiportsInBBox.useQuery(
    { bbox },
    { keepPreviousData: true }
  );

  const onMapChanged = (state: ViewState & { bbox: BBox }) => {
    setBbox(state.bbox);
  };

  return (
    <Wrapper>
      <div tw="absolute h-auto max-h-[75vh] overflow-y-scroll overflow-x-hidden scroll-m-0 left-0 z-10 bg-white flex flex-col gap-4 p-2">
        {bboxResult.data?.map((result) => (
          <AirportListItem
            key={result.airport_id}
            airport={result}
          ></AirportListItem>
        ))}
      </div>
      <div tw="relative w-full grow ">
        <AirportMap
          onViewStateChange={onMapChanged}
          airports={bboxResult.data ?? []}
        />
      </div>
    </Wrapper>
  );
}
