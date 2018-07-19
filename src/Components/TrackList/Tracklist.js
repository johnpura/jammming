import React from 'react';
import { Track } from '../Track/Track';
import './TrackList';

export class TrackList extends React.Component {
    render() {
        this.props.tracks.map(track => {
            return (
                <div className="TrackList">
                    <Track track={this.props.track.id}/>
                </div>
            )
        });
    }
}