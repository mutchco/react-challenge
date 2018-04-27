import React, { Component } from 'react';

//Import fetch library
import fetchJsonp from 'fetch-jsonp';

//Import sass styles
import './style.css';

class PostalCodeForm extends Component {

	constructor() {
		super();

		this.state = {
			errors: {}
		};
	}

	//Functions as class property to avoid binding all the time

	//Handles input event for any text input
	onInput = (event) => {
		this.setState({[event.target.name]: event.target.value});
	};

	//Handles form submit, preforms string transformation, validation and calls the api
	onFormSubmit = (event) => {

		if (event.preventDefault) {
			event.preventDefault();
		}

		const postcode = this.state.postcode;

		if (!postcode) {
			return this.setState({ errors: { postcode: 'Postcode required' }});
		}

		//Test for postal code validity
		if (/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postcode) === false) {
			return this.setState({ errors: { postcode: 'Did you make a mistake entering your postal code?' }});
		}

		fetchJsonp(`https://represent.opennorth.ca/postcodes/${postcode.toUpperCase()}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	//Render method, returns html for post code form component
	render() {

		return (
			<form className="rch-form" onSubmit={this.onFormSubmit}>
				<h2>
					Enter your postal code to find your MP!
				</h2>
				<input type='text' name='postcode' onInput={this.onInput} />
				<p className='rch-form-error'>{this.state.errors.postcode}</p>
				<button type='submit'>Go</button>
				<p className='rch-form-error'>{this.state.errors.api}</p>
			</form>
		);
	}
}

export default PostalCodeForm;