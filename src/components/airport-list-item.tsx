import { useEffect, useState } from "react";
import "twin.macro";
import { Airport } from "~/server/db/airport";
import { trpc } from "~/utils/trpc";
export const AirportListItem = (props: { airport: Airport }) => {
  const { airport } = props;

  const [shouldQuery, setShouldQuery] = useState(true);

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

  return (
    <div
      tw="flex flex-wrap min-h-20 p-2 border-2 border-gray-300 text-gray-900 rounded-lg min-w-64 bg-white"
      onClick={handleClick}
    >
      <div tw="flex w-full mb-1 justify-between gap-4">
        <h2 tw="text-xl font-bold">{airport.ident}</h2>
        <p tw="text-lg text-right">{airport.name}</p>
      </div>
      <p tw="mr-1">
        {airport.size}
        {` -`}
      </p>
      <p>{`${airport.longest_runway_length}ft`}</p>
      <p tw="flex-auto text-right">{airport.country}</p>
    </div>
  );
};
