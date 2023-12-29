import Link from "next/link";
import { MdConnectingAirports, MdHome } from "react-icons/md";
import tw, { css, styled } from "twin.macro";

const HeaderWrapper = styled.header`
  //base
  ${tw`z-10 flex`}

  //spacing
  ${tw`p-3 pl-4 m-2 rounded-lg gap-4 shadow-lg`}

  //Border
  ${tw`border-slate-900 border-solid border-4 border-opacity-60`}

  //colors & text
  ${tw`bg-gray-200 text-slate-900 fill-white text-base font-semibold`}
`;

const IconBase = css`
  ${tw`flex flex-col items-center leading-3 mb-1.5 cursor-pointer gap-1`};
  & > svg {
    font-size: 2em;
  }
`;

const Icon = styled(Link)`
  ${IconBase}
`;

export const Header = () => (
  <HeaderWrapper>
    <Icon href="/">
      <MdHome />
      <span>Home</span>
    </Icon>
    <Icon href="/airport">
      <MdConnectingAirports />
      <span>Airports</span>
    </Icon>
  </HeaderWrapper>
);
