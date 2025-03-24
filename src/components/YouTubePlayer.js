import { useState, useEffect } from "react";
import { fetchYouTubeVideos } from "../utils/youtube";

const YouTubePlayer = ({ playlistId }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      const videoList = await fetchYouTubeVideos(playlistId);
      setVideos(videoList);
      if (videoList.length > 0) {
        setCurrentVideo(videoList[0].id);
      }
    };

    loadVideos();
  }, [playlistId]);

  return (
    <div className="youtube-player">
      {currentVideo ? (
        <iframe
          title="YouTube Video"
          width="100%"
          height="300"
          src={`https://www.youtube.com/embed/${currentVideo}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Cargando videos...</p>
      )}

      <div className="video-thumbnails">
        {videos.map((video) => (
          <img
            key={video.id}
            src={video.thumbnail}
            alt={video.title}
            onClick={() => setCurrentVideo(video.id)}
            className="thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default YouTubePlayer;
