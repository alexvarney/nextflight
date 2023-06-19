import { useState } from "react";
import tw from "twin.macro";

const Input = tw.input`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`;

const Label = tw.label`
  flex items-center justify-center gap-2
`;

export const CoordinateSearch = (props: {
  onSearch: (distance: number, latY: number, lonX: number) => void;
}) => {
  const [inputValue, setInputValue] = useState(10);
  const [latY, setLatY] = useState(0);
  const [lonX, setLonX] = useState(0);

  return (
    <div tw="flex flex-wrap border p-2 justify-between">
      <Label tw="w-full items-baseline">
        <input
          tw="mb-4 mt-2 flex-auto"
          type="range"
          value={inputValue}
          min={0}
          max={50}
          onChange={(e) => setInputValue(Number.parseFloat(e.target.value))}
        />
        <span tw="text-lg">{inputValue}km</span>
      </Label>
      <Label>
        <span>{"lat (y):"}</span>
        <Input
          type="number"
          value={latY}
          onChange={(e) => setLatY(Number.parseFloat(e.target.value))}
        />
      </Label>
      <Label>
        <span>{"lon (x):"}</span>
        <Input
          type="number"
          value={lonX}
          onChange={(e) => setLonX(Number.parseFloat(e.target.value))}
        />
      </Label>
      <button
        tw="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => props.onSearch(inputValue, latY, lonX)}
      >
        Search
      </button>
    </div>
  );
};
