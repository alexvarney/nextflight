import tw from "twin.macro";

const ButtonWrapper = tw.button`
  p-1.5 rounded-lg flex flex-col gap-2 items-center max-w-24
  font-bold tracking-tighter
  text-xs leading-3 [&_svg]:text-[2em]
  bg-gray-100 text-slate-700
`;

const DarkButtonStyle = tw`bg-slate-700 text-gray-200`;

export const IconButton = (props: {
  text: string;
  icon: React.ReactNode;
  dark?: boolean;
}) => {
  return (
    <ButtonWrapper css={props.dark ? DarkButtonStyle : undefined}>
      {props.icon}
      <span>{props.text}</span>
    </ButtonWrapper>
  );
};
