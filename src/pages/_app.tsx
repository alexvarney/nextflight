import type { AppType } from "next/app";
import GlobalStyles from "~/styles/global-styles";
import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
