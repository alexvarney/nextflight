import { useState } from "react";
import tw, { styled } from "twin.macro";
import { useRoutes } from "~/hooks/use-route";

const TextArea = styled.textarea`
  ${tw`h-20 p-2 rounded-lg resize-none flex-grow
  pointer-events-auto shadow-lg`}
`;

export const RoutesInput = () => {
  const [textInput, setTextInput] = useState("");

  const routes = useRoutes();
  const setInput = (value: string) => {
    console.log(textInput.split(" "));

    routes.setWaypoints(textInput.split(" "));
    setTextInput(value);
  };

  return (
    <TextArea
      placeholder="Enter a route..."
      onChange={(e) => setInput(e.target.value)}
      value={textInput}
      // onBlur={() => routes.setWaypoints(textInput.split(" "))}
    ></TextArea>
  );
};
