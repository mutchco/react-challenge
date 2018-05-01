import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { expect } from 'chai';

import Header from './index';

configure({ adapter: new Adapter() });

test('Should render a Header', () => {
	const header = shallow(<Header />);
	expect(header).to.not.be.null;
	expect(header.find('img').length).to.equal(1);
	expect(header.find('h1').length).to.equal(1);
});