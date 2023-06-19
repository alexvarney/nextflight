import * as Turf from "@turf/turf";
import { useCallback, useState } from "react";
import tw from "twin.macro";
import { AirportListItem } from "~/components/airport-list-item";
import { CoordinateSearch } from "~/components/coordinate-search";
import { trpc } from "../utils/trpc";

const Wrapper = tw.div`w-screen flex flex-col justify-center items-center`;

const Input = tw.input`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`;

export default function IndexPage() {
  const [inputValue, setInputValue] = useState("");
  const [bbox, setBbox] = useState<number[]>([0, 0, 0, 0]);

  const airportResult = trpc.getAirport.useQuery({ code: inputValue });

  const bboxResult = trpc.getAiportsInBBox.useQuery({ bbox });

  const onSearch = useCallback(
    (distanceKm: number, latY: number, lonX: number) => {
      const circle = Turf.circle([lonX, latY], distanceKm, {
        units: "kilometers",
      });

      const bbox = Turf.bbox(circle);

      setBbox(bbox);
    },
    [setBbox]
  );

  return (
    <Wrapper>
      <CoordinateSearch onSearch={onSearch} />
      <div tw="w-full my-2 border-t-2" />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div tw="max-w-full grid grid-cols-3 gap-4 mt-4">
        {airportResult.data ? (
          <AirportListItem airport={airportResult.data} />
        ) : (
          <h1>Loading...</h1>
        )}

        {bboxResult.data &&
          bboxResult.data.map((result) => (
            <AirportListItem
              key={result.airport_id}
              airport={result}
            ></AirportListItem>
          ))}
      </div>
    </Wrapper>
  );
}
