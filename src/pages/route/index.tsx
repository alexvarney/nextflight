"use client";
import tw from "twin.macro";
import { GridLayout } from "~/components/primitives/grid-layout";
import { RoutesInput } from "~/components/route";

export default function IndexPage() {
  return (
    <GridLayout>
      <div
        css={[
          tw`bg-gray-200 w-full row-span-2 rounded-lg`,
          tw`border-slate-700 border-solid border-4 border-opacity-60`,
        ]}
      ></div>
      <div
        css={[tw`flex pointer-events-none col-span-2 row-start-2 col-start-2`]}
      >
        <RoutesInput />
      </div>
    </GridLayout>
  );
}
