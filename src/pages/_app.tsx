import type { AppType } from "next/app";
import GlobalStyles from "~/styles/global-styles";
import { Providers } from "~/utils/providers";
import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <GlobalStyles />
      <Component {...pageProps} />
    </Providers>
  );
};

export default trpc.withTRPC(MyApp);
