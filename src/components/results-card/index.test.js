import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { expect } from 'chai';

import ResultsCard from './index';

configure({ adapter: new Adapter() });

const props = {
	mp: {
		photo_url: 'photo_url',
		name: 'name',
		party_name: 'party_name',
		email: 'email'
	}
};

let shallowResultCard;

const card = () => {

	if (!shallowResultCard) {
		shallowResultCard = shallow(<ResultsCard {...props} />);
	}

	return shallowResultCard;
};



test('Should render a ResultsCard with an mp', () => {
	const wrapper = card();
	expect(wrapper).to.not.be.null;
});

test('Should render one img with photo_url', () => {
	const wrapper = card();
	expect(wrapper.find('img').length).to.equal(1);
	expect(wrapper.find('img').first().props().src).to.equal(props.mp.photo_url);
});

test('Should render one h3 with name', () => {
	const wrapper = card();
	expect(wrapper.find('h3').length).to.equal(1);
	expect(wrapper.find('h3').text()).to.contain(props.mp.name);
});

test('Should render two divs one with a <b> and on with an <a> containing party and email respectively', () => {
	const wrapper = card();
	const divs = wrapper.find('div').first().find('div');
	expect(divs.length).to.be.at.least(2);

	expect(divs.first().find('b').length).to.equal(1);
	expect(divs.first().find('b').text()).to.equal(props.mp.party_name);

	expect(divs.last().find('a').length).to.equal(1);
	expect(divs.last().find('a').props().href).to.equal(`mailto:${props.mp.email}`);
	expect(divs.last().find('a').text()).to.equal(props.mp.email);
});