import { useState } from "react";
import tw from "twin.macro";
import { trpc } from "../utils/trpc";

const Wrapper = tw.div`w-screen h-screen flex flex-col justify-center items-center`;

const Input = tw.input`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5`;

export default function IndexPage() {
  const [inputValue, setInputValue] = useState("");

  const airportResult = trpc.getAirport.useQuery({ code: inputValue });

  return (
    <Wrapper>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {airportResult.data ? (
        <p tw="font-sans">
          {JSON.stringify(airportResult.data ?? "", null, 2)}
        </p>
      ) : (
        <h1>Loading...</h1>
      )}
    </Wrapper>
  );
}
