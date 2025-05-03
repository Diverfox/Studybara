import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import ClockSettings from "./ClockSettings";
import FeedbackSettings from "./FeedbackSettings";
import "../styles/Options.css";

function OptionsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("general");

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
    <div className="opciones-overlay">
      <div className="opciones-modal">
        <h2>Opciones</h2>
        <button onClick={onClose} className="close-button">Cerrar</button>

        <div className="tabs-container">
          <button
            className={activeTab === "general" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={activeTab === "clock" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("clock")}
          >
            Reloj
          </button>
          <button
            className={activeTab === "feedback" ? "tab active-tab" : "tab"}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </div>

        <div className="settings-container">{renderActiveTab()}</div>
      </div>
    </div>
  );
}

export default OptionsModal;
