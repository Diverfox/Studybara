import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import OptionsModal from "../components/OptionsModal";
import SpotifyPlayer from "../components/SpotifyPlayer";
import YouTubePlayer from "../components/YouTubePlayer";
import "../styles/Home.css";
import { loginUrl as spotifyLoginUrl, getTokenFromUrl as getSpotifyToken, getStoredToken as getStoredSpotifyToken } from "../utils/Spotify.js";
import { youtubeLoginUrl, getYouTubeTokenFromUrl, getStoredYouTubeToken, youtubeLogout } from "../utils/YouTube.js";

function Home() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [musicSource, setMusicSource] = useState("spotify");
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [youtubeToken, setYouTubeToken] = useState(null);

  useEffect(() => {
    // Primero intenta recuperar token del hash de la URL después del login con Spotify
    const urlToken = getSpotifyToken(); // Internamente verifica y guarda si es válido
    if (urlToken) {
      setSpotifyToken(urlToken);
      return;
    }
    // Si no había token en la URL, revisa si hay uno válido en localStorage
    const storedToken = getStoredSpotifyToken();
    if (storedToken) {
      setSpotifyToken(storedToken);
    }
  }, []);
  
  

  return (
    <>
      <Timer focusTime={focusTime} breakTime={breakTime} />
  
      {showModal && (
        <OptionsModal
          setFocusTime={setFocusTime}
          setBreakTime={setBreakTime}
          onClose={() => setShowModal(false)}
        />
      )}
  
      <div className="corner-buttons-container">
        <button onClick={() => setIsFullscreen(!isFullscreen)} className="corner-button">
          {isFullscreen ? "🔽" : "⛶"}
        </button>
  
        <div className="music-menu-container">
          <button onClick={() => setShowMusicMenu(!showMusicMenu)} className="corner-button">
            🎵
          </button>
          {showMusicMenu && (
            <div className="music-menu">
              <button onClick={() => { setMusicSource("spotify"); setShowMusicMenu(false); }}>Spotify</button>
              <button onClick={() => { setMusicSource("youtube"); setShowMusicMenu(false); }}>YouTube</button>
            </div>
          )}
        </div>
      </div>
  
      {musicSource === "spotify" ? (
        spotifyToken ? (
          <SpotifyPlayer />
        ) : (
          <a href={spotifyLoginUrl} className="spotify-login-btn">Iniciar sesión con Spotify</a>
          
        )
      ) : (
        youtubeToken ? (
          <>
            <YouTubePlayer />
            <button onClick={youtubeLogout} className="logout-btn">Cerrar sesión de YouTube</button>
          </>
        ) : (
          <a href={youtubeLoginUrl} className="youtube-login-btn">Iniciar sesión con YouTube</a>
        )
      )}
    </>
  );
  
}

export default Home;
