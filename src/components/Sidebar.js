import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="menu-button">
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button onClick={() => setIsOpen(false)} className="close-sidebar">
          ✖
        </button>

        <h2>Menu</h2>

        <button className="menu-item">🏠 Inicio</button>
        <button className="menu-item">🧾 Materias</button>
        <button className="menu-item">✨ Capi-IA</button>
        <button className="menu-item">🧍‍♂️ User</button>
      </div>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}
    </>
  );
}

export default Sidebar;
