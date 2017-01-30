import React from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import ArticlesTable from './help_center_articles_table';
import HelpCentreTitle from './help_centre_title';

class HelpCentre extends React.Component {
	componentDidMount() {
		const {setCurrentPageTitle} = this.props;
		setCurrentPageTitle('Help Centre');
	}

	render() {

		return (
			<div>
				<div className="n-container">
					<HelpCentreTitle />
					<div className="n-container__item">
						<div className="n-body-text n-light">
							<ArticlesTable  />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(null, actions)(HelpCentre);

