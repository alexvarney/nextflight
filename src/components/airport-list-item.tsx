import "twin.macro";
import { Airport } from "~/server/db/airport";
export const AirportListItem = (props: { airport: Airport }) => {
  const { airport } = props;

  return (
    <div tw="flex flex-wrap p-2 border border-gray-300 text-gray-900 rounded-lg w-64">
      <div tw="flex w-full mb-1 justify-between gap-4">
        <h2 tw="text-2xl">{airport.ident}</h2>
        <p tw="text-lg text-right">{airport.name}</p>
      </div>
      <p>{`${airport.laty.toFixed(4)}, ${airport.lonx.toFixed(4)}`}</p>
      <p tw="flex-auto text-right">{airport.country}</p>
    </div>
  );
};
