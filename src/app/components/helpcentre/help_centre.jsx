import React from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Button from '@nowtv/nowtv-web-toolkit/src/react/components/Button/Button.react';

class HelpCentre extends React.Component {
	componentDidMount() {
		const {setCurrentPageTitle} = this.props;
		setCurrentPageTitle('Help Centre');
	}

	render() {
		return (
			<div>
				<div className="n-container">
					<div className="n-container__item">
						<h3 className="n-bold n-primary-title">Homepage</h3>
					</div>
					<div className="n-container__item">
						<div className="n-body-text n-light">

						</div>
					</div>
				</div>
			</div>
		)
	}
}

HelpCentre = withRouter(connect(null, actions)(HelpCentre));

export default HelpCentre;
