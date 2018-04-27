import React, { Component } from 'react';

//Import ripple component
import Ripple from '../ripple';

//Import results card
import ResultsCard from '../results-card';

//Import fetch library
import fetchJsonp from 'fetch-jsonp';

//Import sass styles
import './style.css';

class PostalCodeForm extends Component {

	constructor() {
		super();

		this.state = {
			postcode: '',
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

		this.setState({ errors: {}, mp: null, loading: true });

		const postcode = this.state.postcode;

		if (!postcode) {
			return this.setState({ errors: { postcode: 'Postcode required' }});
		}

		//Test for postal code validity
		if (/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postcode) === false) {
			return this.setState({ errors: { postcode: 'Did you make a mistake entering your postal code?' }});
		}

		fetchJsonp(`https://represent.opennorth.ca/postcodes/${postcode.toUpperCase().replace(' ', '')}`)
			.then(res => res.json())
			.then(data => {
				//Yeah I learned something today!
				const [ mp ] = data.representatives_centroid.filter(rep => rep.elected_office === 'MP');
				this.setState({ loading: false, postcode: '', mp });
			})
			.catch(err => {
				this.setState({ errors: { api: err.message }, loading: false });
			});
	};

	//Render method, returns html for post code form component
	render() {

		let resultCard = null;
		let button = (<button type='submit'>
										<Ripple />
										Go
									</button>);

		if (this.state.loading === true) {
			//By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
			button = (<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#10ac84">
								    <g fill="none" fillRule="evenodd">
								        <g transform="translate(1 1)" strokeWidth="2">
								            <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
								            <path d="M36 18c0-9.94-8.06-18-18-18">
								                <animateTransform
								                    attributeName="transform"
								                    type="rotate"
								                    from="0 18 18"
								                    to="360 18 18"
								                    dur="1s"
								                    repeatCount="indefinite"/>
								            </path>
								        </g>
								    </g>
								</svg>);
		}

		if (this.state.mp !== undefined && this.state.mp !== null) {
			resultCard = (<ResultsCard mp={this.state.mp} />);
		}

		return (
			<form className="rch-form" onSubmit={this.onFormSubmit}>
				<h2>
					Enter your postal code to find your MP!
				</h2>
				<input type='text' name='postcode' placeholder='Postal Code' value={this.state.postcode} onChange={this.onInput} />
				<p className='rch-form-error'>{this.state.errors.postcode}</p>
				{button}
				<p className='rch-form-error'>{this.state.errors.api}</p>
				{resultCard}
			</form>
		);
	}
}

export default PostalCodeForm;