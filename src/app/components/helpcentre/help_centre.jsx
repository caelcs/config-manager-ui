import React from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {getAllArticles} from '../../reducers/articles';
import Button from '@nowtv/nowtv-web-toolkit/src/react/components/Button/Button.react';

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
		const {articles} = this.props;
		return (
			<div>
				<div className="n-container">
					<div className="n-container__item">
						<h3 className="n-bold n-primary-title">Homepage</h3>
					</div>
					<div className="n-container__item">
						<div className="n-body-text n-light">
							<table className="table table-collapse">
						      <thead>
							        <tr>
							        	<th>Article Name</th>
							        	<th>Article URL</th>
							        </tr>
						      </thead>
						      <tbody>
						      	<tr>
						      		<th>Test article</th>
						      		<th><Link activeClassName='linkActive' to='/helpcentre/test-art3'>test-art3</Link></th>
						      	</tr>
						      </tbody>
						    </table>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

HelpCentre = withRouter(connect(mapStateToProps, actions)(HelpCentre));

export default HelpCentre;
