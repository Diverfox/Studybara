import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

const GeneralSettings = () => {
  const { focusTime, setFocusTime, breakTime, setBreakTime, background, setBackground } =
    useContext(SettingsContext);

  const backgrounds = ["default.jpg", "forest.jpg", "ocean.jpg", "city.jpg", "mountains.jpg"];

  return (
    <div>
      <h3>Time</h3>
      <label>Focus</label>
      <input
        type="number"
        value={focusTime / 60}
        onChange={(e) => setFocusTime(e.target.value * 60)}
      />

      <label>Break</label>
      <input
        type="number"
        value={breakTime / 60}
        onChange={(e) => setBreakTime(e.target.value * 60)}
      />

      <h3>Background</h3>
      <select value={background} onChange={(e) => setBackground(e.target.value)}>
        {backgrounds.map((bg) => (
          <option key={bg} value={bg}>
            {bg}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GeneralSettings;
