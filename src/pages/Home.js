import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import OptionsModal from "../components/OptionsModal";
import SpotifyPlayer from "../components/SpotifyPlayer";
import YouTubePlayer from "../components/YouTubePlayer";
import logo from "../assets/images/capigojo.jpg";
import { loginUrl, getTokenFromUrl, getStoredToken } from "../utils/spotify";

function Home() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [token, setToken] = useState(null);
  const [musicSource, setMusicSource] = useState("spotify");
  const [showMusicMenu, setShowMusicMenu] = useState(false);

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

      {showModal && (
        <OptionsModal
          setFocusTime={setFocusTime}
          setBreakTime={setBreakTime}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="corner-buttons-container">
        {!showModal && (
          <button onClick={() => setShowModal(true)} className="corner-button">
            ⚙
          </button>
        )}

        <button onClick={toggleFullscreen} className="corner-button">
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
        token ? <SpotifyPlayer /> : <a href={loginUrl} className="spotify-login-btn">Iniciar sesión con Spotify</a>
      ) : (
        <YouTubePlayer playlistId="PLMC9KNkIncKseYxDN2niH6glGRWKsLtde" />
      )}
    </div>
  );
}

export default Home;
