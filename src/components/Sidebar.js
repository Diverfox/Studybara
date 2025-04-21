// Sidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import GoogleLoginModal from "./GoogleLoginModal";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
        <Link to="/" className="menu-item" onClick={() => setIsOpen(false)}>🏠 Inicio</Link>
        <Link to="/materias" className="menu-item" onClick={() => setIsOpen(false)}>🧾 Materias</Link>
        <button className="menu-item">✨ Capi-IA</button>
        <button className="menu-item" onClick={() => setShowLogin(true)}>🧍‍♂️ Iniciar sesión</button>
      </div>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}

      {/* Modal de login */}
      <GoogleLoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

export default Sidebar;
