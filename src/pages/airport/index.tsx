import tw from "twin.macro";
import { AirportListItem } from "~/components/airport-list-item";
import { PanelLayout } from "~/components/primitives/panel-layout";
import { useBboxAirports } from "~/hooks/use-bbox-airports";

export default function AiportPage() {
  const { airports } = useBboxAirports();
  return (
    <PanelLayout>
      <div css={tw`flex flex-col gap-2 pl-2 pr-2`}>
        {airports?.map((result) => (
          <AirportListItem
            key={result.airport_id}
            airport={result}
          ></AirportListItem>
        ))}
      </div>
    </PanelLayout>
  );
}
