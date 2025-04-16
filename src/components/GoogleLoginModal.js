// GoogleLoginModal.js
import React from 'react';
import '../styles/GoogleLoginModal.css';
import { auth } from '../firebase-config'; // Asegúrate de que la ruta sea correcta
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const GoogleLoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose(); // si usas modal
    } catch (error) {
      console.error("Error en el login:", error.message);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Iniciar sesión</h2>
        <button onClick={handleLogin}>Iniciar sesión con Google</button>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default GoogleLoginModal;
