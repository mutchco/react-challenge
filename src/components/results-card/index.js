import React, { Component } from 'react';

import './style.css';

class ResultsCard extends Component {

	//Render method, returns html for results card
	render() {
		return (
			<div className='rch-results-card'>
				<img src={this.props.mp.photo_url} height='200' alt='What your mp looks like' />
				<h3>Your MP is: {this.props.mp.name}</h3>
				<div className='result-data'>Their party is: <b>{this.props.mp.party_name}</b></div>
				<div className='result-data'>Their email is: <a href={'mailto:' + this.props.mp.email}>{this.props.mp.email}</a></div>
			</div>
		);
	}
}

export default ResultsCard;