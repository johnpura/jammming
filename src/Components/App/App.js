import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {searchResults: [], playlistName: '', playlistTracks: []};
        this.state = {
            searchResults: [
                {
                    name: 'Nice For What',
                    artist: 'Drake',
                    album: 'Scorpion',
                    id: 1001
                },
                {
                    name: 'Dura',
                    artist: 'Daddy Yankee',
                    album: 'Latin Fever Mixtape',
                    id: 1002
                },
                {
                    name: 'I like It',
                    artist: 'Cardi B',
                    album: 'Invasion of Privacy',
                    id: 1003
                }
            ],
            playlistName: 'Codeacademy Playlist',
            playlistTracks: [
                {
                    name: 'Dura',
                    artist: 'Daddy Yankee',
                    album: 'Latin Fever Mixtape',
                    id: 1002
                },
                {
                    name: 'I like It',
                    artist: 'Cardi B',
                    album: 'Invasion of Privacy',
                    id: 1003
                }
            ]
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack =this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        } 
        const newPlaylist = this.state.playlistTracks;
        newPlaylist.push(track);
        this.setState({ playlistTracks: newPlaylist });  
    }

    removeTrack(track) {
        const newPlaylist = this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id);
        this.setState({ playlistTracks: newPlaylist });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        let trackURIs = [];
        this.state.playlistTracks.forEach(track => {
            trackURIs.push(track.uri);
        });

        this.setState({  });
    }

    search(searchTerm) {
        Spotify.search(searchTerm).then(results => {
            this.setState({ searchResults: results});
        });
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div class="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                    <Playlist 
                        playlistName={this.state.playlistName} 
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}
                    />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;