import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import GoogleLoginModal from "./GoogleLoginModal";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useContext(AuthContext); // obtener usuario
  const navigate = useNavigate();

  const handleCapiIA = () => {
    setIsOpen(false);
    if (user) {
      navigate("/capiia");
    } else {
      setShowLogin(true);
    }
  };

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

        {user && (
          <>
            <Link to="/materias" className="menu-item" onClick={() => setIsOpen(false)}>🧾 Materias</Link>
            <button className="menu-item" onClick={handleCapiIA}>✨ Capi-IA</button>
          </>
        )}

        {!user && (
          <button className="menu-item" onClick={() => setShowLogin(true)}>🧍‍♂️ Iniciar sesión</button>
        )}
      </div>

      {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}
      <GoogleLoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

export default Sidebar;
