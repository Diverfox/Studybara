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
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/" className="sidebar-link">🏠 Inicio</Link>
          </li>
          <li>
            <Link to="/materias" className="sidebar-link">📚 Materias</Link>
          </li>
          <li className="sidebar-link disabled">📅 Calendar</li>
          <li className="sidebar-link">✨ Capi-IA</li>
          <li className="sidebar-link">👤 User</li>
        </ul>
      </div>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}
    </>
  );
}

export default Sidebar;
