const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchYouTubeVideos = async (playlistId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.items) {
      return data.items.map((item) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener videos de YouTube:", error);
    return [];
  }
};
