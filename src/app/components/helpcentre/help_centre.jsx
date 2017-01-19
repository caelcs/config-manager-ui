import React from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getOneArticle} from '../../reducers/articles';

const mapStateToProps = (state) => {
	return {
		oneArticle: getOneArticle(state)
	};
};

class HelpCentre extends React.Component {

	componentDidMount() {
		const {setCurrentPageTitle,  fetchArticlesAction} = this.props;
		setCurrentPageTitle('Help Centre');
		fetchArticlesAction();
	}

	render() {
		const {oneArticle} = this.props;
		return (
			<div>
				<div>{oneArticle.title}</div>
				<div>{oneArticle.content}</div>
			</div>
		)
	}
}

HelpCentre = withRouter(connect(mapStateToProps, actions)(HelpCentre));

export default HelpCentre;
