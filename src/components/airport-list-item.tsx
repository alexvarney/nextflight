import { useEffect, useState } from "react";
import tw from "twin.macro";
import { AccentBar } from "~/components/primitives/accent-bar";
import { Airport } from "~/server/db/airport";
import { trpc } from "~/utils/trpc";
export const AirportListItem = (props: { airport: Airport }) => {
  const { airport } = props;

  const [shouldQuery, setShouldQuery] = useState(false);

  const runways = trpc.getRunways.useQuery(
    { code: airport.ident },
    { enabled: shouldQuery }
  );

  const handleClick = () => {
    if (runways.status === "success") {
      console.log({ airport, runways: runways.data });
    } else {
      setShouldQuery(true);
    }
  };

  useEffect(() => {
    if (runways.status === "success") {
      console.log({ airport, runways: runways.data });
    }
  }, [runways.status]);

  const hasTower = airport.tower_frequency != null;

  return (
    <div tw="rounded-lg min-w-6 bg-gray-100 p-2">
      <AccentBar
        css={[
          tw`flex flex-col gap-3 py-1 pl-4 pr-2 text-slate-700 w-full `,
          hasTower ? tw`before:bg-cyan-800` : tw`before:bg-fuchsia-800`,
        ]}
        onClick={handleClick}
      >
        <div tw="flex w-full justify-between gap-4 items-baseline">
          <p tw="basis-3/4 text-lg font-bold leading-6">{airport.name}</p>
          <p tw="basis-1/4 text-lg text-right">{airport.country}</p>
        </div>
        <div tw="flex w-full justify-between gap-4">
          <p tw="text-3xl font-bold m-0 leading-6">{airport.ident}</p>
          <p tw="text-lg text-zinc-500 font-semibold m-0 leading-6">
            {Intl.NumberFormat("en-US").format(airport.longest_runway_length)}{" "}
            ft
          </p>
        </div>
      </AccentBar>
    </div>
  );
};
