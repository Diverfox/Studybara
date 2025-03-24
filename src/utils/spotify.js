const CLIENT_ID = "1e7f1e4de724441883f5f6abd5b780d8"; // ID de tu app en Spotify Developer
const REDIRECT_URI = window.location.origin; // Redirige al dominio actual
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

// Definir permisos (scopes) de Spotify
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

// Construir la URL de autenticación
export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}
&redirect_uri=${encodeURIComponent(REDIRECT_URI)}
&response_type=${RESPONSE_TYPE}
&scope=${SCOPES.join("%20")}
&show_dialog=true`.replace(/\n/g, ""); // Limpia saltos de línea

// Función para obtener el token de la URL y manejar su expiración
export const getTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  
  const accessToken = params.get("access_token");
  const expiresIn = params.get("expires_in");

  if (accessToken) {
    const expirationTime = Date.now() + expiresIn * 1000; // Guardar la expiración
    localStorage.setItem("spotifyToken", accessToken);
    localStorage.setItem("spotifyTokenExpiration", expirationTime);
    window.location.hash = ""; // Limpia la URL
    return accessToken;
  }
  return null;
};

// Función para verificar si el token sigue siendo válido
export const getStoredToken = () => {
  const token = localStorage.getItem("spotifyToken");
  const expiration = localStorage.getItem("spotifyTokenExpiration");

  if (!token || !expiration || Date.now() > expiration) {
    localStorage.removeItem("spotifyToken");
    localStorage.removeItem("spotifyTokenExpiration");
    return null;
  }

  return token;
};

// Función para cerrar sesión en Spotify
export const logout = () => {
  localStorage.removeItem("spotifyToken");
  localStorage.removeItem("spotifyTokenExpiration");
  window.location.reload();
};
