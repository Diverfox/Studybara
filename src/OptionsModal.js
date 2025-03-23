import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import ClockSettings from "./ClockSettings";
import FeedbackSettings from "./FeedbackSettings";

function OptionsModal({ setFocusTime, setBreakTime, onClose }) {
  const [activeTab, setActiveTab] = useState("general"); // Estado para la pestaña activa

  const renderActiveTab = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "clock":
        return <ClockSettings />;
      case "feedback":
        return <FeedbackSettings />;
      default:
        return null;
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Opciones</h2>
        <button onClick={onClose} style={closeButtonStyle}>Cerrar</button>

        {/* Menú de pestañas */}
        <div style={tabsContainerStyle}>
          <button
            style={activeTab === "general" ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            style={activeTab === "clock" ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab("clock")}
          >
            Reloj
          </button>
          <button
            style={activeTab === "feedback" ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </div>

        {/* Contenido de la pestaña activa */}
        <div style={settingsContainerStyle}>{renderActiveTab()}</div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  maxWidth: "600px",
  width: "90%",
  maxHeight: "90%",
  overflowY: "auto",
  position: "relative",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "5px 10px",
  cursor: "pointer",
};

const tabsContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const tabStyle = {
  padding: "10px 20px",
  margin: "0 5px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f4f4f4",
  cursor: "pointer",
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: "#ddd",
  fontWeight: "bold",
};

const settingsContainerStyle = {
  textAlign: "left",
};

export default OptionsModal;