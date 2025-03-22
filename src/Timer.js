import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(25 * 60); // 25 minutos en segundos
  const [isRunning, setIsRunning] = useState(false);

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

  // Formatea el tiempo a MM:SS
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
      <button onClick={() => { setIsRunning(false); setTime(25 * 60); }}>
        Reset
      </button>
    </div>
  );
}

export default Timer;
