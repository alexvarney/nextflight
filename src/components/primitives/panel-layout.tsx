import tw from "twin.macro";
import { Header } from "~/components/header";
import { GridLayout } from "~/components/primitives/grid-layout";

export const PanelLayout = (props: { children: React.ReactNode }) => {
  return (
    <GridLayout>
      <div
        tw="[grid-area:left] h-full flex flex-col
        overflow-hidden"
      >
        <div tw="[flex:1_1_100%] grid grid-rows-[auto_auto_auto_1fr] overflow-auto p-12">
          <div tw="row-start-1 row-span-2 col-start-1 z-10 w-full p-3">
            <Header />
          </div>
          <div
            tw="max-h-full row-start-2 row-span-2 col-start-1
              grid grid-rows-[subgrid]
            bg-stone-50 rounded-lg shadow-2xl"
          >
            <div
              css={[
                tw`pointer-events-auto`,
                tw`flex flex-col row-start-3 h-full`,
                tw`overflow-auto scrollbar-hide scroll-m-0`,
              ]}
            >
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </GridLayout>
  );
};

//gap-4 p-2
