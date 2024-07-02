"use client";

import Button from "@/components/atoms/Button";
import { useStopwatch } from "./hooks";
import clsx from "clsx";
import { formatTime } from "./utils";

const Stopwatch = () => {
  const {
    resetHandler,
    stopHandler,
    startPauseHandler,
    elapsedTime,
    isRunning,
  } = useStopwatch();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="mb-8 font-mono text-6xl">{formatTime(elapsedTime)}</div>
      <div className="space-x-4">
        <Button
          className={clsx("bg-green-400 hover:scale-105 hover:bg-green-500", {
            "bg-yellow-400 hover:scale-105 hover:bg-yellow-500": isRunning,
          })}
          onClick={startPauseHandler}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={stopHandler}
          disabled={!elapsedTime}
        >
          Stop
        </Button>
        <Button
          className="bg-gray-500 text-white hover:bg-gray-600"
          onClick={resetHandler}
          disabled={!elapsedTime}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
