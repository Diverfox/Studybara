import { createContext, useState, useContext } from "react";

export const SettingsContext = createContext();
export const ModalContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [focusTime, setFocusTime] = useState(25 * 60); // en segundos
  const [breakTime, setBreakTime] = useState(5 * 60); // en segundos
  const [background, setBackground] = useState("fondochill.jpg");


  return (
    <SettingsContext.Provider
      value={{ focusTime, setFocusTime, breakTime, setBreakTime, background, setBackground }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);