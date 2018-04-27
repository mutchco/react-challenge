import React, { Component } from 'react';

import './style.css';

/** Class representing a touch-feedback ripple */
class Ripple extends Component {

	/**
    * Handles parent click event, positions ripple and adds open css class
  */ 
	clickHandler = (event) => {
		this.ripple.classList.remove('rch-ripple-open');
		this.ripple.style.left = (event.offsetX - (this.ripple.clientWidth / 2)) + 'px';
		this.ripple.style.top = (event.offsetY - (this.ripple.clientHeight / 2)) + 'px';
		this.ripple.classList.add('rch-ripple-open');
	};

	/**
    * CDM method, adds css parent, calculates diameter and adds click handler to parent
  */ 
	componentDidMount() {
		this.parent = this.ripple.parentNode;
		this.parent.style.position = 'relative';
		this.parent.style.overflow = 'hidden';

		const diameter = Math.max(this.parent.clientHeight, this.parent.clientWidth);
		this.ripple.style.width = diameter + 'px';
		this.ripple.style.height = diameter + 'px';

		// this.parent.addEventListener('click', this.clickHandler, false);
		this.parent.onclick = this.clickHandler;
	}

	/**
    * Render method, adds ripple ref to instance
  */ 
	render() {

		return (
			<div className='rch-ripple' ref={r => this.ripple = r}></div>
		);
	}
}

export default Ripple;