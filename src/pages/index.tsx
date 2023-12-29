"use client";

import { useState } from "react";
import tw, { styled } from "twin.macro";
import { AirportListItem } from "~/components/airport-list-item";

import dynamic from "next/dynamic";
import { RoutesInput } from "~/components/route";
import { BBox } from "~/server/db/airport";
import type { ViewState } from "../components/map/deck-map";
import { trpc } from "../utils/trpc";

const AirportMap = dynamic(() => import("../components/map/deck-map"), {
  ssr: false,
});

const Wrapper = tw.div`w-screen h-screen flex flex-col justify-center items-center relative`;

const GridLayout = styled.div`
  ${tw`grid w-full h-full z-20 pointer-events-none overflow-hidden`};
  grid-template-areas: "left center right" "left bottom right";
  grid-template-columns: 24rem 1fr auto;
  grid-template-rows: 1fr auto;

  & > * {
    ${tw`pointer-events-auto`}
  }
`;

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
      <GridLayout>
        <div
          css={[
            tw`[grid-area:left] overflow-y-auto overflow-x-hidden scrollbar-hide scroll-m-0 pointer-events-auto`,
            tw`flex flex-col gap-4 p-2`,
          ]}
        >
          {bboxResult.data?.map((result) => (
            <AirportListItem
              key={result.airport_id}
              airport={result}
            ></AirportListItem>
          ))}
        </div>
        <div tw="[grid-area:center] m-2 flex box-content pointer-events-none">
          <RoutesInput></RoutesInput>
        </div>
      </GridLayout>
      <div tw="absolute w-full h-full">
        <AirportMap
          onViewStateChange={onMapChanged}
          airports={bboxResult.data ?? []}
        />
      </div>
    </Wrapper>
  );
}
