import Link from "next/link";
import { useRouter } from "next/router";
import { MdAddLocationAlt, MdArrowBack, MdStar } from "react-icons/md";
import tw from "twin.macro";
import { AccentBar } from "~/components/primitives/accent-bar";
import { IconButton } from "~/components/primitives/button";
import { PanelLayout } from "~/components/primitives/panel-layout";
import { Runway } from "~/server/db/airport";
import { trpc } from "~/utils/trpc";

const getQuery = (query: string | string[] | undefined): string => {
  if (typeof query === "string") return query;
  if (Array.isArray(query) && query[0] != null) return query[0];
  return "";
};

const Frame = (props: { children?: React.ReactNode }) => {
  return (
    <PanelLayout>
      <div tw="p-3 grid gap-3 [grid-template-columns:auto_1fr]">
        <div tw="flex flex-col gap-3 max-w-16 items-stretch">
          <Link href="/airport" tw="[&>*]:w-full">
            <IconButton text={"Back"} icon={<MdArrowBack />} dark />
          </Link>
          <IconButton text={"Add to Route"} icon={<MdAddLocationAlt />} />
          <IconButton text={"Save"} icon={<MdStar />} />
        </div>

        {props.children}
      </div>
    </PanelLayout>
  );
};

const RunwayListItem = (props: { runway: Runway }) => (
  <div tw="flex font-mono justify-between items-baseline">
    <p tw="text-gray-700 flex font-mono font-bold">
      <span>{props.runway.primary_name}</span>
      <span tw="text-gray-400 mx-[1ch]">{"/"}</span>
      <span>{props.runway.secondary_name}</span>
    </p>
    <p tw="text-sm text-zinc-500 font-bold">
      <span>{new Intl.NumberFormat().format(props.runway.length)}</span>
      <span>ft</span>
    </p>
  </div>
);

export default function AirportPage() {
  const router = useRouter();
  const ident = getQuery(router.query.ident);

  const airportQuery = trpc.getAirport.useQuery({ code: ident });
  const runwayQuery = trpc.getRunways.useQuery({ code: ident });

  const airport = airportQuery.data;
  const runways = runwayQuery.data;

  if (airport == null || runways == null) return <Frame />;

  const hasTower = airport.tower_frequency != null;

  return (
    <Frame>
      <div tw="flex-grow p-2 shadow-lg rounded-md">
        <AccentBar
          css={[
            tw`text-gray-700 font-bold py-2`,
            hasTower ? tw`before:bg-cyan-800` : tw`before:bg-fuchsia-800`,
          ]}
        >
          <h2 tw="text-3xl font-bold">{airport.ident}</h2>
          <p tw="text-xl">{airport.name}</p>
          <p tw="text-lg">{airport.country}</p>
          <div tw="flex w-full font-mono text-zinc-500 text-sm justify-between">
            <p tw="">
              {airport.laty.toFixed(4)},{airport.lonx.toFixed(4)}
            </p>
            <p>{airport.altitude}ft</p>
          </div>
        </AccentBar>
        <p tw="bg-zinc-200 text-zinc-700 font-mono font-bold  tracking-wider mt-2 py-1 px-2 rounded-md text-sm">
          CYYZ 300000Z 26011KT 5SM -RA BR FEW009 OVC025 03/03 A2968 RMK SF2SC6
          SLP058
        </p>
        {/* Runways Listing */}
        <div tw="p-4">
          <h3 tw="uppercase">Runways</h3>
          {runways.map((runway) => (
            <RunwayListItem key={runway.runway_id} runway={runway} />
          ))}
        </div>
      </div>
    </Frame>
  );
}
