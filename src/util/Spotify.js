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
    }
};

export default Spotify;