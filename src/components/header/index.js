import React, { Component } from 'react';

//Svg logo from assets
import logo from '../../assets/logo.svg';

//Import sass styles
import './style.css';

class Header extends Component {

	//Render method, returns html for the app header
	render() {
		return (
			<header className="rch-header">
				<img src={logo} className="rch-logo" alt="logo" />
				<h1 className="rch-title">React Tech Challenge</h1>
			</header>
		);
	}
}

export default Header;