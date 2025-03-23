import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import OptionsModal from "./OptionsModal";
import Sidebar from "./Sidebar";
import { getTokenFromUrl, loginUrl } from "./utils/spotify";
import SpotifyPlayer from "./components/SpotifyPlayer"; // Mantén solo la correcta



function App() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showModal, setShowModal] = useState(false); // Estado para abrir/cerrar el modal
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [token, setToken] = useState(null);
  const playlistId = "1e7f1e4de724441883f5f6abd5b780d8"; // ID de tu playlist

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

        {/* Mostrar el reproductor de Spotify si el usuario está autenticado */}
        {token && <SpotifyPlayer playlistId={playlistId} />}
      </div>

      {/* Botón de inicio de sesión si el usuario no está autenticado */}
      {!token && (
      <a href={loginUrl} className="spotify-login-btn">
      Iniciar sesión con Spotify
      </a>
    
         
      )}
    </>
  );
}

export default App;
