const CLIENT_ID = "1053553813172-3r0i00dkb2sqc5bf7fpghv39plp03l2e.apps.googleusercontent.com"; // Reemplaza con tu CLIENT_ID de Google
//const API_KEY = "AIzaSyCUitH3vc2qx5Vo4AVOr-tZneDM0zYfXeA"; // Reemplaza con tu API Key de YouTube
const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const RESPONSE_TYPE = "token";
const REDIRECT_URI = "https://kevinzorro.github.io/Studybara";

// Permisos requeridos para YouTube
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/userinfo.profile"
];

// Construcción de la URL de autenticación
export const youtubeLoginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}
&redirect_uri=${encodeURIComponent(REDIRECT_URI)}
&response_type=${RESPONSE_TYPE}
&scope=${SCOPES.join("%20")}
&include_granted_scopes=true`.replace(/\n/g, "");

// Función para obtener el token desde la URL
export const getYouTubeTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  
  const accessToken = params.get("access_token");
  const expiresIn = params.get("expires_in");

  if (accessToken) {
    const expirationTime = Date.now() + expiresIn * 1000;
    localStorage.setItem("youtubeToken", accessToken);
    localStorage.setItem("youtubeTokenExpiration", expirationTime);
    window.location.hash = ""; // Limpiar la URL
    return accessToken;
  }
  return null;
};

// Función para verificar si el token sigue siendo válido
export const getStoredYouTubeToken = () => {
  const token = localStorage.getItem("youtubeToken");
  const expiration = localStorage.getItem("youtubeTokenExpiration");

  if (!token || !expiration || Date.now() > expiration) {
    localStorage.removeItem("youtubeToken");
    localStorage.removeItem("youtubeTokenExpiration");
    return null;
  }

  return token;
};

// Función para cerrar sesión en YouTube
export const youtubeLogout = () => {
  localStorage.removeItem("youtubeToken");
  localStorage.removeItem("youtubeTokenExpiration");
  window.location.reload();
};
