"use client";
import tw from "twin.macro";
import { PanelLayout } from "~/components/primitives/panel-layout";
import { RoutesInput } from "~/components/route";

export default function IndexPage() {
  return (
    <PanelLayout>
      <div css={tw`p-2 w-full flex`}>
        <RoutesInput />
      </div>
    </PanelLayout>
  );
}
