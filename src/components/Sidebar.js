import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Sidebar.css"; // Importa los estilos

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Botón para abrir el sidebar */}
      <button onClick={() => setIsOpen(true)} className="menu-button">
        ☰
      </button>

      {/* Modal estilo Sidebar */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} className="close-button">
              ✖
            </button>
            <h2>Menú</h2>
            <ul className="menu-list">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/materias">Materias</Link>
              </li>
              <li className="menu-item">📅 Calendar</li>
              <li className="menu-item">✨ Capi-IA</li>
              <li className="menu-item">👤 User</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
