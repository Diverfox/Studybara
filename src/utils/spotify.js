const CLIENT_ID = "1e7f1e4de724441883f5f6abd5b780d8"; // Lo obtienes en la consola de desarrolladores de Spotify
const REDIRECT_URI = "http://localhost:3000"; // Cambia esto a tu dominio en producción
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

// Construir la URL de autenticación
export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private`;

// Función para obtener el token de la URL
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
