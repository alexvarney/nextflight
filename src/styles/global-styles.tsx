import { Global, css } from "@emotion/react";
import tw, { GlobalStyles as BaseStyles, theme } from "twin.macro";

const customStyles = [
  css({
    body: {
      WebkitTapHighlightColor: theme`colors.purple.500`,
      ...tw`antialiased`,
    },
    "*": {
      boxSizing: "border-box",
    },
  }),
  css`
    font-family: var(--font-amiko);
  `,
  // css`
  //   @import url("https://fonts.googleapis.com/css2?family=Amiko:wght@400;600;700&family=Spline+Sans+Mono:wght@300;400;500;600;700&display=swap");
  // `,
];

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
