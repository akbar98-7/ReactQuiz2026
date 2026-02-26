import React from "react";
import { useState, useEffect } from "react";

const Timer = ({ lock, next }) => {
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question

  useEffect(() => {
    if (lock) return; // Stop timer if user answered
    if (timeLeft === 0) {
      // Auto-advance or lock question when time hits 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, lock]);

  // Reset timer when question changes (you can pass index as a prop too)
  return (
    <div className="timer">
      Time Left:{" "}
      <span style={{ color: timeLeft < 5 ? "red" : "white" }}>{timeLeft}s</span>
    </div>
  );
};

export default Timer;
