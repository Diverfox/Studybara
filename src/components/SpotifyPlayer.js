import React from "react";
import "../styles/index.css";

const SpotifyPlayer = () => {
  return (
    <div className="spotify-container">
      <iframe
        title="Spotify Player"
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/album/1nMHkGDJwTvoW3LTTdUVwA?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;

