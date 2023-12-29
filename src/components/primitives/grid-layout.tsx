import tw, { styled } from "twin.macro";

export const GridLayout = styled.div`
  ${tw`grid basis-full z-20 pointer-events-none ml-2 mr-2 mb-2 gap-2 overflow-hidden`};
  grid-template-areas: "left center right" "left bottom right";
  grid-template-columns: 24rem 1fr auto;
  grid-template-rows: 1fr auto;

  & > * {
    ${tw`pointer-events-auto`}
  }
`;
