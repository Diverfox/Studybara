// src/pages/Home.jsx

import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import OptionsModal from "../components/OptionsModal";
import SpotifyPlayer from "../components/SpotifyPlayer";
import YouTubePlayer from "../components/YouTubePlayer";
import "../styles/Home.css";

import {
  loginUrl as spotifyLoginUrl,
  getTokenFromUrl as getSpotifyToken,
  getStoredToken as getStoredSpotifyToken
} from "../utils/Spotify.js";

function Home() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [musicSource, setMusicSource] = useState("spotify");
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    // Obtenemos token de Spotify al cargar
    const urlToken = getSpotifyToken();
    if (urlToken) {
      setSpotifyToken(urlToken);
    } else {
      setSpotifyToken(getStoredSpotifyToken());
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
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="corner-button"
        >
          {isFullscreen ? "🔽" : "⛶"}
        </button>

        <div className="music-menu-container">
          <button
            onClick={() => setShowMusicMenu(!showMusicMenu)}
            className="corner-button"
          >
            🎵
          </button>
          {showMusicMenu && (
            <div className="music-menu">
              <button
                onClick={() => {
                  setMusicSource("spotify");
                  setShowMusicMenu(false);
                }}
              >
                Spotify
              </button>
              <button
                onClick={() => {
                  setMusicSource("youtube");
                  setShowMusicMenu(false);
                }}
              >
                YouTube
              </button>
            </div>
          )}
        </div>
      </div>

      {musicSource === "spotify" ? (
        spotifyToken ? (
          <SpotifyPlayer />
        ) : (
          <a href={spotifyLoginUrl} className="spotify-login-btn">
            Iniciar sesión con Spotify
          </a>
        )
      ) : (
        // Mostramos siempre el mini-player público de YouTube
        <YouTubePlayer />
      )}
    </>
  );
}

export default Home;
