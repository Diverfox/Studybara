// GoogleLogin.js
import Modal from 'react-modal';
import { auth } from '../firebase-config'; // Configuración de Firebase

const GoogleLogin = ({ isModalOpen, closeModal }) => {
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
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Login">
      <h2>Iniciar sesión</h2>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </Modal>
  );
};

export default GoogleLogin;
