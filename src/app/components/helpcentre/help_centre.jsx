import React from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {getAllArticles} from '../../reducers/articles';
import ArticlesTable from './help_center_articles_table';

const mapStateToProps = (state) => {
	return {
		articles: getAllArticles(state)
	};
};

class HelpCentre extends React.Component {
	componentDidMount() {
		const {setCurrentPageTitle,  fetchAllArticlesAction} = this.props;
		setCurrentPageTitle('Help Centre');
		fetchAllArticlesAction();
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
							<ArticlesTable  />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

HelpCentre = withRouter(connect(mapStateToProps, actions)(HelpCentre));

export default HelpCentre;
