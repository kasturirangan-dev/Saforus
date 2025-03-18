import { useState, useEffect } from "react";

const useSetExpiredTime = (expirationTime: number) => {
  const [remainingTime, setRemainingTime] = useState(expirationTime - Math.floor(Date.now() / 1000));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateRemainingTime = () => {
      const currentTime: number = Math.floor(Date.now() / 1000);
      const newRemainingTime = expirationTime - currentTime;

      if (newRemainingTime <= 0) {
        setIsExpired(true)
        if (intervalId) {
          clearInterval(intervalId);
        }
      } else {
        setRemainingTime(newRemainingTime);
      }
    };

    // Update remainingTime every hour by default
    let intervalLength = 60 * 60 * 1000;

    if (remainingTime <= 60 * 60 && remainingTime > 60 * 5) {
      // less than an hour but more than 5 minutes
      intervalLength = 60 * 1000; // update every minute
    } else if (remainingTime <= 60 * 5) {
      // less than 5 minute
      intervalLength = 1000; // update every second
    }

    // Start the interval
    const intervalId = setInterval(updateRemainingTime, intervalLength);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [expirationTime]);

  return [remainingTime, isExpired];
};

export default useSetExpiredTime;

