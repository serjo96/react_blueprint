import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

/**
 * Custom hook for creating a countdown timer.
 *
 * @param {number} targetUnixTime The UNIX timestamp until which the countdown is calculated.
 * @returns {string} A string representing the remaining time in a human-readable format (minutes and seconds).
 * If the target time is less than a minute away, it returns seconds only.
 *
 * This hook calculates the remaining time to a given UNIX timestamp and updates every second.
 * It's useful for displaying countdowns to users, such as waiting times or deadlines.
 */
export const useCountdownTimer = (targetUnixTime: number) => {
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = dayjs();
      const targetTime = dayjs.unix(targetUnixTime);
      const diffSeconds = targetTime.diff(now, 'second');

      if (diffSeconds > 0) {
        const minutes = Math.floor(diffSeconds / 60);
        const seconds = diffSeconds % 60;
        setRemainingTime(
          `${minutes > 0 ? `${minutes} min ` : ''}${seconds} sec`
        );
      } else {
        setRemainingTime('');
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [targetUnixTime]);

  return remainingTime;
};
