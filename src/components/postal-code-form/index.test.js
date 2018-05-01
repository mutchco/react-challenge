import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { expect } from 'chai';

import PostalCodeForm from './index';
import ResultsCard from '../results-card';

configure({ adapter: new Adapter() });

let shallowPostalCodeForm;

const form = () => {
	if (!shallowPostalCodeForm) {
		shallowPostalCodeForm = shallow(<PostalCodeForm />);
	}
	return shallowPostalCodeForm;
};

beforeEach(() => {
	if (shallowPostalCodeForm) {
		shallowPostalCodeForm.setState({ errors: {}, postcode: '' });
	}
})

test('Should render a PostalCodeForm with no ResultsCard', () => {
	expect(form()).to.not.be.null;
	expect(form().find(ResultsCard).length).to.equal(0);
});

test('Should render a loading svg', () => {
	const wrapper = form();
	wrapper.setState({ loading: true });
	expect(wrapper.find('svg').length).to.equal(1);
});

test('Should render a ResultsCard', () => {
	const wrapper = form();
	wrapper.setState({ mp: { }});
	expect(wrapper.find(ResultsCard).length).to.equal(1);
});

test('Should render an api error', () => {
	const wrapper = form();
	const api = 'This is a test error';
	wrapper.setState({ errors: { api }});
	expect(wrapper.find('p').last().text()).to.equal(api);
});

test('Should render a post code error', () => {
	const wrapper = form();
	const postcode = 'Postcode error';
	wrapper.setState({ errors: { postcode }});
	expect(wrapper.find('p').first().text()).to.equal(postcode);
});

test('It should set a required error for postcode on state errors', () => {
	const wrapper = form();
	wrapper.setState({ postcode: '' });
	wrapper.find('form').simulate('submit', {});
	expect(wrapper.state('errors').postcode.length).to.be.above(1);
});

test('It should set a invalid error for postcode on state errors', () => {
	const wrapper = form();
	wrapper.setState({ postcode: 'not a real postcode' });
	wrapper.find('form').simulate('submit', {});
	expect(wrapper.state('errors').postcode.length).to.be.above(1);
});