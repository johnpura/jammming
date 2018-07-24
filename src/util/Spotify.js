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
            // Check if an access token and expiration time are in the URL
            if (hasToken && hasExpiration) {
                accessToken = hasToken[1];
                expiresIn = hasExpiration[1];
                // Clears the access token and URL parameters
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            }
        }
    },
    search(searchTerm) {
        accessToken = Spotify.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const header = { headers: {Authorization: `Bearer ${accessToken}`} };
        // Search the Spotify library for term that the user provided
        return fetch(endpoint, header).then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(jsonResponse => {
            if(jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => (
                    {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                ));
            } else {
                return [];
            }
        });
    },
    savePlaylist (playlistName, trackURIs) {
        if (playlistName && trackURIs) {
            accessToken = Spotify.getAccessToken();
            let userID = '';
            const endpoint = 'https://api.spotify.com/v1/me';
            const headers = { headers: {Authorization: `Bearer ${accessToken}`} };
            // Make a request that returns the user's Spotify username
            fetch(endpoint, headers).then(response => {
                if(response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                userID = jsonResponse.id;
                // Make a POST request that creates a new playlist in the user's account and returns a playlist ID
                const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
                const playlistOptions = { headers: {Authorization: `Bearer ${accessToken}`}, method: 'POST', body: JSON.stringify({ name: playlistName})};
                return fetch(createPlaylistEndpoint, playlistOptions).then(response => {
                    if(response.ok) {
                        return response.json();
                    }
                }).then(jsonResonse => {
                    let playlistID = jsonResonse.id;
                    // Set the URIs parameter to an array of track URIs passed into the method.
                    const addTracksEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
                    const addTracksOptions = { headers: {Authorization: `Bearer ${accessToken}`, "Content-Type": 'application/json'}, method: 'POST', body: JSON.stringify({ uris: trackURIs})};
                    fetch(addTracksEndpoint, addTracksOptions);
                });
            });
        } else {
            return;
        }
    }
};

export default Spotify;