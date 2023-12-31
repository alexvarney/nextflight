import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdConnectingAirports,
  MdEditCalendar,
  MdHome,
  MdSettingsSuggest,
} from "react-icons/md";
import tw, { styled } from "twin.macro";
import { IconButton } from "~/components/primitives/button";

const HeaderWrapper = styled.header`
  //base
  ${tw`z-10 flex w-[max-content]`}

  //spacing
  ${tw`p-2 m-2 rounded-lg gap-2 shadow-lg`}

  //colors & text
  ${tw`bg-slate-700 `}
`;

export const Header = () => {
  const { pathname } = useRouter();

  return (
    <HeaderWrapper>
      <Link href="/airport">
        <IconButton
          dark={pathname != "/airport"}
          text={"Airports"}
          icon={<MdHome />}
        />
      </Link>
      <Link href="/route">
        <IconButton
          dark={pathname != "/route"}
          text={"Routes"}
          icon={<MdConnectingAirports />}
        />
      </Link>
      <IconButton dark text={"Schedule"} icon={<MdEditCalendar />}></IconButton>
      <IconButton
        dark
        text={"Options"}
        icon={<MdSettingsSuggest />}
      ></IconButton>
    </HeaderWrapper>
  );
};
