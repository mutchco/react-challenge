import React, { Component } from 'react';

//Svg logo from assets
import logo from '../../assets/logo.svg';

//Import sass styles
import './style.css';

class Header extends Component {

	//Render method, returns html for the app header
	render() {
		return (
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">React Tech Challenge</h1>
			</header>
		);
	}
}

export default Header;