import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state.searchResults = [
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
                artist: 'cardi B',
                album: 'Invasion of Privacy',
                id: 1003
            }
        ];

        this.state.playlistName = { name: 'Codeacademy Playlist'};

        this.state.playlistTracks = [
            {
                name: 'Dura',
                artist: 'Daddy Yankee',
                album: 'Latin Fever Mixtape',
                id: 1002
            },
            {
                name: 'I like It',
                artist: 'cardi B',
                album: 'Invasion of Privacy',
                id: 1003
            }
        ];
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div class="App">
                    <SearchBar />
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults}/>
                    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
                    </div>
                </div>
            </div>
        )
    }
}