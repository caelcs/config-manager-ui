import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
import expect from 'expect';
import HelpCentreTitle from './help_centre_title';

expect.extend(expectJSX);

describe('Help Centre', () => {
	it('should Render Help Centre Title', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<HelpCentreTitle />);
		const actual = renderer.getRenderOutput();

		expect(actual).toIncludeJSX(<h3 className="n-bold n-primary-title">Help Centre | React Demo</h3>);
	});
});
