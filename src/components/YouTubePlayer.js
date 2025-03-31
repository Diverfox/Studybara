import React, { useState, useEffect } from "react";
import "../styles/YouTube.css";



const YouTubePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const iframe = document.getElementById("youtube-iframe");
    const player = iframe.contentWindow;
    if (isPlaying) {
      player.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
    } else {
      player.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-card">
      <iframe
        id="youtube-iframe"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/bPG90gwE47M?enablejsapi=1&autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="music-info">
        <p className="music-title">lofi hip hop radio 🎵 beats to relax/study to</p>
        <div className="music-controls">
          <button>⏪</button>
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
          <button>⏩</button>
          <button>⋯</button>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
