let accessToken = '';
let expiresIn = '';
const clientID = '65dfb9d3e7ca48cb8970fe691da957cf';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } else {
            const url = window.location.href;
            const hasToken = url.match(/access_token=([^&]*)/);
            const hasExpiration = url.match(/expires_in=([^&]*)/);
            if (hasToken && hasExpiration) {
                accessToken = hasToken[1];
                expiresIn = hasExpiration[1];
                // clear access token and URL parameters
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            }
        }
    },
    search(searchTerm) {
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const header = {headers: {Authorization: `Bearer ${accessToken}`}};

        fetch(endpoint, header).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Unable to search Spotify library. GET request failed!');
        }, networkError => console.log(networkError.message).then(jsonResponse => {
            if(jsonResponse.tracks) {
                let spotifyTracks = jsonResponse.tracks.items.map(track => {
                    {
                        id = track.id,
                        name = track.name;
                        artist = track.artists[0].name,
                        album = track.album.name,
                        uri = track.uri
                    }
                });
                return spotifyTracks;
            } else {
                return [];
            }
        }));
    }
};

export default Spotify;