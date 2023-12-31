import tw, { styled } from "twin.macro";

export const GridLayout = styled.div`
  ${tw`grid basis-full h-screen z-20 pointer-events-none overflow-hidden`};
  grid-template-areas: "left center right";
  grid-template-columns: 30rem 1fr auto;

  & > * {
    ${tw`pointer-events-auto`}
  }
`;
