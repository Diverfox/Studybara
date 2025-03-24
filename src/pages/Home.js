import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import OptionsModal from "../components/OptionsModal";
import { getTokenFromUrl, loginUrl } from "../utils/spotify";
import SpotifyPlayer from "../components/SpotifyPlayer";
import logo from "../assets/images/capigojo.jpg";

function Home() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [token, setToken] = useState(null);
  const playlistId = "1e7f1e4de724441883f5f6abd5b780d8";

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
    <div>
      <div className="home-header">
        <img src={logo} alt="Studybara Logo" className="logo" />
        <h1 className="title">Studybara</h1>
      </div>

      <Timer focusTime={focusTime} breakTime={breakTime} />

      {/* Mostrar modal si showModal es true */}
      {showModal && (
        <OptionsModal
          setFocusTime={setFocusTime}
          setBreakTime={setBreakTime}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Botones en la esquina inferior derecha */}
      <div className="corner-buttons-container">
        {!showModal && (
          <button onClick={() => setShowModal(true)} className="corner-button">
            ⚙
          </button>
        )}

        <button onClick={toggleFullscreen} className="corner-button">
          {isFullscreen ? "🔽" : "⛶"}
        </button>
      </div>

      {/* Mostrar el reproductor de Spotify si el usuario está autenticado */}
      {token && <SpotifyPlayer playlistId={playlistId} />}

      {/* Botón de inicio de sesión si el usuario no está autenticado */}
      {!token && (
        <a href={loginUrl} className="spotify-login-btn">
          Iniciar sesión con Spotify
        </a>
      )}
    </div>
  );
}

export default Home;
