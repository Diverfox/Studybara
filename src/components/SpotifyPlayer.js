import React from "react";
import "../styles/index.css";

const SpotifyPlayer = () => {
  return (
    <div className="spotify-container">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/artist/6U6IOHuRO6CQ07uNc7s45e?utm_source=generator"
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;

