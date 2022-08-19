import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
	render() {
		return (
			<div className='SearchResults'>
				<h2>Spotify Search Results</h2>
				<TrackList
					tracks={this.props.searchResults}
					isRemoval={false}
					onAdd={this.props.onAdd}
					onPlay={this.props.onPlay}
					onPause={this.props.onPause}
				/>
			</div>
		);
	}
}

export default SearchResults;
