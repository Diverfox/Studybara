import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [focusTime, setFocusTime] = useState(25 * 60); // en segundos
  const [breakTime, setBreakTime] = useState(5 * 60); // en segundos
  const [background, setBackground] = useState("default.jpg"); // Fondo predeterminado


  return (
    <SettingsContext.Provider
      value={{ focusTime, setFocusTime, breakTime, setBreakTime, background, setBackground }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
