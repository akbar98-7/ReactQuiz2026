import React, { useState, useEffect } from "react";

const Timer = ({ lock, setLock, next }) => {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    // If the user already answered (lock is true), stop the countdown
    if (lock) return;

    // If time runs out
    if (timeLeft === 0) {
      setLock(true); // This locks the options in the parent Quiz component
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, lock, setLock]);

  return (
    <div className="timer">
      Time Left:{" "}
      <span style={{ color: timeLeft < 5 ? "red" : "inherit" }}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default Timer;
