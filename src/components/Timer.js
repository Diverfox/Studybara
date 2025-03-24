import { useState, useEffect } from "react";
import "../styles/Timer.css"; // Importamos el archivo CSS separado

function Timer({ focusTime, breakTime }) {
  const [time, setTime] = useState(focusTime || 25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true); // Para rastrear si estamos en modo Focus o Break

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
    <div className="timer-container">
      {/* Botones de Focus y Break arriba */}
      <div className="mode-buttons">
        <button
          onClick={() => {
            setIsRunning(false);
            setTime(focusTime);
            setIsFocusMode(true);
          }}
          className={isFocusMode ? "active" : ""}
        >
          Focus
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setTime(breakTime);
            setIsFocusMode(false);
          }}
          className={!isFocusMode ? "active" : ""}
        >
          Break
        </button>
      </div>

      {/* Cronómetro */}
      <h1 className="timer-display">{formatTime(time)}</h1>

      {/* Botones de Start y Reset abajo */}
      <div className="control-buttons">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pausar" : "Start"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setTime(isFocusMode ? focusTime : breakTime);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
