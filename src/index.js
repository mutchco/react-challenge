import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';

const doYouReallyWantToTargetIE = false;

if (doYouReallyWantToTargetIE) {
	require('es6-promise').polyfill();
}

ReactDOM.render(<App />, document.getElementById('root'));
