import React, { useState } from "react";

const GeneralSettings = () => {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [usePomodoro, setUsePomodoro] = useState(false);

  return (
    <div>
      <h3>Time</h3>
      <label>Focus</label>
      <input type="number" value={focusTime} onChange={(e) => setFocusTime(e.target.value)} />
      
      <label>Break</label>
      <input type="number" value={breakTime} onChange={(e) => setBreakTime(e.target.value)} />
      
      <label>
        <input 
          type="checkbox" 
          checked={usePomodoro} 
          onChange={() => setUsePomodoro(!usePomodoro)} 
        />
        Use the Pomodoro sequence
      </label>
    </div>
  );
};

export default GeneralSettings;
