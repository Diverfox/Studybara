import React from "react";

const SpotifyPlayer = ({ playlistId }) => {
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;

  return (
    <iframe
      src={embedUrl}
      width="300"
      height="380"
      frameBorder="0"
      allow="encrypted-media"
      title="Spotify Player"
    ></iframe>
  );
};

export default SpotifyPlayer;
