import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import OptionsModal from "../components/OptionsModal";
import SpotifyPlayer from "../components/SpotifyPlayer";
import { loginUrl, getTokenFromUrl, getStoredToken } from "../utils/spotify";
import logo from "../assets/images/capigojo.jpg";

function Home() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [token, setToken] = useState(null);
  const playlistId = "1e7f1e4de724441883f5f6abd5b780d8";

  // Alternar pantalla completa
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const _token = getTokenFromUrl();
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    const storedToken = getStoredToken();
    if (storedToken) {
      setToken(storedToken);
    } else {
      const _token = getTokenFromUrl();
      if (_token) {
        setToken(_token);
      }
    }
  }, []);
  

  return (
    <div>
      <div className="home-header">
        <img src={logo} alt="Studybara Logo" className="logo" />
        <h1 className="title">Studybara</h1>
      </div>

      <Timer focusTime={focusTime} breakTime={breakTime} />

      {/* Modal de opciones */}
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
      {token ? <SpotifyPlayer playlistId={playlistId} /> : (
        <a href={loginUrl} className="spotify-login-btn">
          Iniciar sesión con Spotify
        </a>
      )}
    </div>
  );
}

export default Home;
