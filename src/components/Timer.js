import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function Timer() {
  const { focusTime, breakTime } = useContext(SettingsContext);
  const [time, setTime] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);

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
    setTime(isFocusMode ? focusTime : breakTime);
  }, [focusTime, breakTime, isFocusMode]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      {/* Botones Focus y Break arriba del temporizador */}
      <div className="mode-buttons">
        <button 
          className={isFocusMode ? "active" : ""} 
          onClick={() => {
            setIsRunning(false);
            setIsFocusMode(true);
            setTime(focusTime);
          }}
        >
          Focus
        </button>
        <button 
          className={!isFocusMode ? "active" : ""} 
          onClick={() => {
            setIsRunning(false);
            setIsFocusMode(false);
            setTime(breakTime);
          }}
        >
          Break
        </button>
      </div>

      {/* Temporizador */}
      <h1 className="timer-display">{formatTime(time)}</h1>

      {/* Botones Start/Pausa y Reiniciar debajo del temporizador */}
      <div className="control-buttons">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pausar" : "Start"}
        </button>
        <button onClick={() => {
          setIsRunning(false);
          setTime(isFocusMode ? focusTime : breakTime);
        }}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default Timer;
