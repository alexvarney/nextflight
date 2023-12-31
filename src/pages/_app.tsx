import type { AppType } from "next/app";
import dynamic from "next/dynamic";
import tw from "twin.macro";
import { Header } from "~/components/header";
import GlobalStyles from "~/styles/global-styles";
import { Providers } from "~/utils/providers";
import { trpc } from "../utils/trpc";

const AirportMap = dynamic(() => import("../components/map/deck-map"), {
  ssr: false,
});

const Wrapper = tw.div`w-screen h-screen flex flex-col relative box-border overflow-hidden `;

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Component {...pageProps} />
        <AirportMap />
      </Wrapper>
    </Providers>
  );
};

export default trpc.withTRPC(MyApp);
