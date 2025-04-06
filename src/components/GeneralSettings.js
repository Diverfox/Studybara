import React, { useState } from "react";

function GeneralSettings({ setFocusTime, setBreakTime }) {
  const [focus, setFocus] = useState(25);
  const [breakTime, setBreak] = useState(5);
  const [background, setBackground] = useState("default.jpg");

  const handleFocusChange = (e) => {
    const value = parseInt(e.target.value);
    setFocus(value);
    setFocusTime(value);
  };

  const handleBreakChange = (e) => {
    const value = parseInt(e.target.value);
    setBreak(value);
    setBreakTime(value);
  };

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
    // Aquí puedes usar una función prop para cambiar el fondo si la tienes
  };

  return (
    <div className="general-settings">
      <label>Time</label>
      <div className="time-group">
        <input
          type="number"
          value={focus}
          onChange={handleFocusChange}
          placeholder="Focus"
        />
        <input
          type="number"
          value={breakTime}
          onChange={handleBreakChange}
          placeholder="Break"
        />
      </div>

      <label>Background</label>
      <select value={background} onChange={handleBackgroundChange}>
        <option value="default.jpg">default.jpg</option>
        <option value="stars.jpg">stars.jpg</option>
        <option value="forest.jpg">forest.jpg</option>
      </select>
    </div>
  );
}

export default GeneralSettings;
