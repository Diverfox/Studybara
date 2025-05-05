// src/components/YouTubePlayer.jsx
import React, { useEffect, useState } from "react";
import "../styles/index.css";

const LIVE_VIDEO_ID = "5RuM_n8lCRU";

export default function YouTubePlayer() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let player;

    const createPlayer = () => {
      console.log("▶️ Creando YT.Player…");
      player = new window.YT.Player("yt-mini-player", {
        videoId: LIVE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          mute: 0,
        },
        events: {
          onReady: () => {
            console.log("✅ YouTube listo");
            setIsReady(true);
          },
          onError: (e) => {
            console.error("❌ Error en YT.Player:", e);
          },
        },
      });
    };

    // Si la API ya estaba cargada, crear inmediatamente
    if (window.YT && window.YT.Player) {
      console.log("⚡ API ya cargada, inicializando player directo");
      createPlayer();
    } else {
      // Si no, inyectar el script y asignar el callback
      console.log("⬇️ Inyectando script de IFrame API");
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    // Cleanup: destruir player al desmontar
    return () => {
      if (player && player.destroy) player.destroy();
    };
  }, []);

  return (
    <div className="mini-player-container">
      <div id="yt-mini-player" />
      {!isReady && <div className="loader">Cargando…</div>}
    </div>
  );
}
