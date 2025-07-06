import { useState, useEffect, useRef } from "react";

export const useCountdown = (initialMinutes, onTimeout) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);

  const timeoutCallback = useRef(onTimeout);
  useEffect(() => {
    timeoutCallback.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          clearInterval(timerId);
          if (timeoutCallback.current) {
            timeoutCallback.current();
          }
        }
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [minutes, seconds]);

  return { minutes, seconds };
};
