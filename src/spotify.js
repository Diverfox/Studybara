Code
JS
JavaScript
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDzO1rwhz3w9sLQiCgfQ0NY9pU73AEwk59lIMSJRnf14NRggnRlz2qIp4ykpS-8Ml_z-gN_I8UtTc0dB2bEAUvAhN5bytlea6pIBHG6vK97m9nlfmtIJlLIXWGkdc8lEze4T2F2_dqiMdfrmGlk0kja3dVH6YzhUPjkWQOmid65qvB7H0AfBjKEdGajqLMv3ERh91ul4Tzz_dM2-FpKxGNevQ2UmJ69KZTkLXerqZePbHSeA_3CGnoVQ1vilvuH0MhILma8XPsK2tS8hr_T8dXMi2dAwXvUu1ZJeUCGJRauYMg7EEOyIzJo';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);