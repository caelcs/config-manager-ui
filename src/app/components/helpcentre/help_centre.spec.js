import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import HelpCentre from './help_centre';


describe('Help Centre', () => {
	let wrapper;

	beforeEach(() => {

		wrapper = shallow(
			<Provider store={}>
				<HelpCentre />
			</Provider>
		)

	});

	it('should contains Help Centre Title', () => {
		const Component = wrapper.find('HelpCentreTitle');
		console.log(wrapper.debug());
		expect(Component.length).to.equal(1);
	});
});
