import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { expect } from 'chai';

import App from './App';
import Header from './header';
import PostalCodeForm from './postal-code-form';

configure({ adapter: new Adapter() });

test('Should render an App', () => {
	const wrapper = shallow(<App />);
	const div = wrapper.find('div');
	expect(div).to.have.length(1);
	expect(div.first().props().id).to.equal('app');
});

test('App should render a header', () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find(Header)).to.have.length(1);
});

test('App should render PostalCodeForm', () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find(PostalCodeForm)).to.have.length(1);
})