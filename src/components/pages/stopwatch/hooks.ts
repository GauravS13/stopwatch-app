import { useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

export const useStopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Throttled function to update elapsedTime
  const throttledUpdateElapsedTime = useRef(
    throttle((time: number) => {
      setElapsedTime(time - startTimeRef.current);
    }, 1000)
  );

  useEffect(() => {
    if (isRunning) {
      // Start interval to update elapsedTime
      intervalIdRef.current = setInterval(() => {
        throttledUpdateElapsedTime.current(Date.now());
      }, 10);
    } else {
      // Stop interval when stopwatch is not running
      clearInterval(intervalIdRef.current!);
    }

    // Clean up interval on component unmount or when isRunning changes
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]);

  const startPauseHandler = useCallback(() => {
    if (isRunning) {
      // Pause stopwatch
      setIsRunning(false);
    } else {
      // Start stopwatch and calculate start time
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTime;
    }
  }, [isRunning, elapsedTime]);

  const stopHandler = useCallback(() => {
    // Reset elapsed time and stop stopwatch
    setElapsedTime(0);
    setIsRunning(false);
  }, []);

  const resetHandler = useCallback(() => {
    // Reset elapsed time, start stopwatch, and reset start time
    setElapsedTime(0);
    setIsRunning(true);
    startTimeRef.current = Date.now();
  }, []);

  return {
    resetHandler,
    stopHandler,
    startPauseHandler,
    isRunning,
    elapsedTime,
  };
};
