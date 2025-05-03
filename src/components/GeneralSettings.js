import React, { useState, useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function GeneralSettings() {
  const {
    setFocusTime,
    setBreakTime,
    focusTime,
    breakTime,
    background,
    setBackground,
  } = useContext(SettingsContext);

  const [focus, setFocus] = useState(focusTime / 60); // Convertir a minutos para mostrar
  const [breakDur, setBreakDur] = useState(breakTime / 60); // Convertir a minutos

  const handleFocusChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 99) {
      setFocus(value);
      setFocusTime(value * 60);
    }
  };
  
  const handleBreakChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 60) {
      setBreakDur(value);
      setBreakTime(value * 60);
    }
  };
  

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  };

  return (
    <div className="general-settings">
      <label>Tiempo</label>
      <div className="time-group">
        <input
          type="number"
          value={focus}
          onChange={handleFocusChange}
          placeholder="Enfoque (min)"
          min={1}
          max={99}
        />
        <input
          type="number"
          value={breakDur}
          onChange={handleBreakChange}
          placeholder="Descanso (min)"
          min={1}
          max={60}
        />
      </div>

      <label>Fondo</label>
      <select value={background} onChange={handleBackgroundChange}>
        <option value="default.jpg">default.jpg</option>
        <option value="stars.jpg">stars.jpg</option>
        <option value="forest.jpg">forest.jpg</option>
      </select>
    </div>
  );
}

export default GeneralSettings;
