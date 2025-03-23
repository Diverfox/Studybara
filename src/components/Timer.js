import { useState, useEffect } from "react";

function Timer({ focusTime, breakTime }) {
  const [time, setTime] = useState(focusTime || 25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true); // Nuevo estado para rastrear el modo actual

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    setTime(focusTime);
  }, [focusTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", fontSize: "2rem", marginTop: "20px" }}>
      <h1>{formatTime(time)}</h1>

      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pausar" : "Start"}
      </button>

      <button
        onClick={() => {
          setIsRunning(false);
          setTime(isFocusMode ? focusTime : breakTime); // Resetea según el modo actual
        }}
      >
        Reset
      </button>

      <button
        onClick={() => {
          setIsRunning(false);
          setTime(breakTime);
          setIsFocusMode(false); // Cambia a modo "Break"
        }}
      >
        Break
      </button>

      <button
        onClick={() => {
          setIsRunning(false);
          setTime(focusTime);
          setIsFocusMode(true); // Cambia a modo "Focus"
        }}
      >
        Focus
      </button>
    </div>
  );
}

export default Timer;