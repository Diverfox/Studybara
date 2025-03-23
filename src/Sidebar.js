import React, { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Botón para abrir el sidebar */}
      <button onClick={() => setIsOpen(true)} style={menuButtonStyle}>
        ☰
      </button>

      {/* Modal estilo Sidebar */}
      {isOpen && (
        <div style={overlayStyle} onClick={() => setIsOpen(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} style={closeButtonStyle}>
              ✖
            </button>
            <h2>Menú</h2>
            <ul style={menuListStyle}>
              <li style={menuItemStyle}>🏠 Home</li>
              <li style={menuItemStyle}>📅 Calendar</li>
              <li style={menuItemStyle}>📖 Materias</li>
              <li style={menuItemStyle}>✨ Capi-IA</li>
              <li style={menuItemStyle}>👤 User</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const menuButtonStyle = {
  position: "fixed",
  top: "20px",
  left: "20px",
  backgroundColor: "#333",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 15px",
  cursor: "pointer",
  zIndex: 1001,
};

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
  maxWidth: "400px",
  width: "90%",
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

const menuListStyle = {
  listStyle: "none",
  padding: 0,
  marginTop: "20px",
};

const menuItemStyle = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #ccc",
  textAlign: "center",
  fontSize: "18px",
};

export default Sidebar;
