import { useState } from "react";
import Timer from "./Timer";
import OptionsModal from "./OptionsModal";
import Sidebar from "./Sidebar";

function App() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showModal, setShowModal] = useState(false); // Estado para abrir/cerrar el modal
  const [isFullscreen, setIsFullscreen] = useState(false);


    // Función para alternar pantalla completa
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };


  return (
    <>
          {/* Sidebar */}
          <Sidebar />
        <button onClick={toggleFullscreen} >
        {isFullscreen ? "🔽" : "⛶"}
      </button>
      <div>
        <Timer focusTime={focusTime} breakTime={breakTime} />

        {/* Mostrar modal si showModal es true */}
        {showModal && (
          <OptionsModal
            setFocusTime={setFocusTime}
            setBreakTime={setBreakTime}
            onClose={() => setShowModal(false)} // Pasar función para cerrar el modal
          />
        )}

        {/* Botón para abrir el modal (solo si el modal no está abierto) */}
        {!showModal && (
          <button onClick={() => setShowModal(true)}>⚙ Opciones</button>
        )}
      </div>
    </>
  );
}

export default App;