import tw from "twin.macro";
import { AirportListItem } from "~/components/airport-list-item";
import { GridLayout } from "~/components/primitives/grid-layout";
import { useBboxAirports } from "~/hooks/use-bbox-airports";

export default function AiportPage() {
  const { airports } = useBboxAirports();
  return (
    <GridLayout>
      <div
        css={[
          tw`[grid-area:left] overflow-y-auto overflow-x-hidden scrollbar-hide scroll-m-0 pointer-events-auto`,
          tw`flex flex-col gap-4 p-2`,
          tw`bg-gray-200 rounded-lg`,
          tw`border-slate-700 border-solid border-4 border-opacity-60`,
        ]}
      >
        {airports?.map((result) => (
          <AirportListItem
            key={result.airport_id}
            airport={result}
          ></AirportListItem>
        ))}
      </div>
    </GridLayout>
  );
}
