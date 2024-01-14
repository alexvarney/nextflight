import tw from "twin.macro";
import { AirportListItem } from "~/components/airport-list-item";
import { PanelLayout } from "~/components/primitives/panel-layout";
import { useBboxAirports } from "~/hooks/use-bbox-airports";

export default function AiportPage() {
  const { airports } = useBboxAirports();
  return (
    <PanelLayout>
      <div css={tw`flex flex-col gap-3 px-3 pb-3`}>
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
