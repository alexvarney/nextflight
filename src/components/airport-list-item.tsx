import "twin.macro";
import { Airport } from "~/server/db/airport";
export const AirportListItem = (props: { airport: Airport }) => {
  const { airport } = props;

  return (
    <div tw="flex flex-wrap min-h-20 p-2 border-2 border-gray-300 text-gray-900 rounded-lg min-w-64 bg-white">
      <div tw="flex w-full mb-1 justify-between gap-4">
        <h2 tw="text-xl font-bold">{airport.ident}</h2>
        <p tw="text-lg text-right">{airport.name}</p>
      </div>
      <p tw="mr-1">
        {airport.size}
        {` -`}
      </p>
      <p>{`${airport.laty.toFixed(4)}, ${airport.lonx.toFixed(4)}`}</p>
      <p tw="flex-auto text-right">{airport.country}</p>
    </div>
  );
};
