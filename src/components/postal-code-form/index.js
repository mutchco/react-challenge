import React, { Component } from 'react';

//Import fetch library
import fetchJsonp from 'fetch-jsonp';

//Import sass styles
import './style.css';

class PostalCodeForm extends Component {

	onFormSubmit() {
		fetchJsonp(https://represent.opennorth.ca/postcodes/T2Z4M8/?format=apibrowser)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	}

	//Render method, returns html for post code form component
	render() {
		return (
			<form className="rch-form">
				<h2>
					Enter your postal code to find your MP!
				</h2>
				<input type='text' name='postcode' />
				<button type='submit'>Go</button>
			</form>
		);
	}
}

export default PostalCodeForm;