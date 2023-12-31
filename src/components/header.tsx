import Link from "next/link";
import { MdConnectingAirports, MdHome } from "react-icons/md";
import tw, { styled } from "twin.macro";
import { IconButton } from "~/components/primitives/button";

const HeaderWrapper = styled.header`
  //base
  ${tw`z-10 flex`}

  //spacing
  ${tw`p-3 pl-4 m-2 rounded-lg gap-4 shadow-lg`}

  //Border
  ${tw`border-slate-900 border-solid border-4 border-opacity-60`}

  //colors & text
  ${tw`bg-slate-700 `}
`;

export const Header = () => (
  <HeaderWrapper>
    <Link href="/">
      <IconButton text={"Home"} icon={<MdHome />} />
    </Link>
    <Link href="/airport">
      <IconButton text={"Airports"} icon={<MdConnectingAirports />} />
    </Link>
    <p>Test is this working</p>
  </HeaderWrapper>
);
