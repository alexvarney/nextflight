import { useState } from "react";
import tw from "twin.macro";
import { useRoutes } from "~/hooks/use-route";

const TextArea = tw.textarea`
  h-20 p-2 rounded-lg border-2 border-gray-300 resize-none flex-grow
  pointer-events-auto
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
