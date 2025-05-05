// YouTube.js

// Reemplaza con tu CLIENT_ID de Google
const CLIENT_ID = "1053553813172-3r0i00dkb2sqc5bf7fpghv39plp03l2e.apps.googleusercontent.com";

// Endpoints y parámetros de OAuth
const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const RESPONSE_TYPE = "token";

// Calculamos el REDIRECT_URI dinámicamente según tu despliegue
const REDIRECT_URI =
  window.location.origin +
  (window.location.pathname.includes("Studybara") ? "/Studybara" : "");

// Scopes que necesitamos para leer datos de YouTube (solo readonly) y perfil
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/userinfo.profile"
];

// Construcción de la URL de login de YouTube
export const youtubeLoginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=${RESPONSE_TYPE}` +
  `&scope=${SCOPES.join("%20")}` +
  `&include_granted_scopes=true`;

// Extrae el token de la URL tras el redirect de OAuth y lo guarda en localStorage
export const getYouTubeTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const expiresIn = params.get("expires_in");

  if (accessToken) {
    // Calculamos tiempo de expiración en ms
    const expirationTime = Date.now() + Number(expiresIn) * 1000;

    localStorage.setItem("youtubeToken", accessToken);
    localStorage.setItem("youtubeTokenExpiration", expirationTime.toString());

    // Limpiamos el hash de la URL
    window.location.hash = "";
    return accessToken;
  }
  return null;
};

// Lee el token de localStorage y comprueba si sigue siendo válido
export const getStoredYouTubeToken = () => {
  const token = localStorage.getItem("youtubeToken");
  const expiration = localStorage.getItem("youtubeTokenExpiration");

  if (!token || !expiration || Date.now() > Number(expiration)) {
    // Si no existe o ya expiró, lo borramos
    localStorage.removeItem("youtubeToken");
    localStorage.removeItem("youtubeTokenExpiration");
    return null;
  }

  return token;
};

// Cierra sesión eliminando el token y recargando la página
export const youtubeLogout = () => {
  localStorage.removeItem("youtubeToken");
  localStorage.removeItem("youtubeTokenExpiration");
  window.location.reload();
};
