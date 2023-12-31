import type { AppType } from "next/app";
import dynamic from "next/dynamic";
import { Amiko, Spline_Sans_Mono } from "next/font/google";
import tw from "twin.macro";
import { Header } from "~/components/header";
import GlobalStyles from "~/styles/global-styles";
import { Providers } from "~/utils/providers";
import { trpc } from "../utils/trpc";

const amiko = Amiko({
  subsets: ["latin"],
  variable: "--font-amiko",
  weight: ["400", "600", "700"],
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-spline-sans-mono",
});

const AirportMap = dynamic(() => import("../components/map/deck-map"), {
  ssr: false,
});

const Wrapper = tw.div`w-screen h-screen flex flex-col relative box-border overflow-hidden font-sans`;

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <GlobalStyles />
      <Wrapper className={`${splineSansMono.variable} ${amiko.variable}`}>
        <Header />
        <Component {...pageProps} />
        <AirportMap />
      </Wrapper>
    </Providers>
  );
};

export default trpc.withTRPC(MyApp);
