import React from "react";

type Props = {
  signin: () => Promise<void>;
};

export const Page: React.VFC<Props> = ({ signin }) => {
  return (
    <div className="py-20 px-20">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-6xl text-center font-bold">🖌 Tweet Decorator</h1>
        <button
          onClick={signin}
          className="p-4 bg-blue-500 rounded-lg shadow-lg text-white transform transition-transform hover:scale-105"
        >
          Getting Started!
        </button>
      </div>
    </div>
  );
};
