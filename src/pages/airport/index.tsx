import Link from "next/link";
import tw from "twin.macro";
import { AirportListItem } from "~/components/airport-list-item";
import { PanelLayout } from "~/components/primitives/panel-layout";
import { useBboxAirports } from "~/hooks/use-bbox-airports";

export default function AirportListPage() {
  const { airports } = useBboxAirports();
  return (
    <PanelLayout>
      <div css={tw`flex flex-col gap-3 px-3 pb-3`}>
        {airports?.map((result) => (
          <Link href={`/airport/${result.ident}`}>
            <AirportListItem
              key={result.airport_id}
              airport={result}
            ></AirportListItem>
          </Link>
        ))}
      </div>
    </PanelLayout>
  );
}
