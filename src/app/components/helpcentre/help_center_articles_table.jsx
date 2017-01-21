import React from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {getAllArticles} from '../../reducers/articles';
import {withRouter, Link} from 'react-router';

const mapStateToProps = (state) => {
	return {
		articles: getAllArticles(state)
	};
};

class ArticlesTable extends React.Component {

	componentDidMount() {

		const {fetchAllArticlesAction} = this.props;
		fetchAllArticlesAction();

	}

	render() {

		const helpCentreBaseLink = '/helpcentre';

		const {articles} = this.props.articles;

		const articlesArr = articles ? articles.articles : [];

		const articlesTrElements = articlesArr.map((art, idx) => {
			const linkAttr = `${helpCentreBaseLink}/${art.id}`;
			const linkToDisplay = `${helpCentreBaseLink}/${art.title}`;
			return (
				<tr key={idx}>
					<th>{art.title}</th>
					<th><Link activeClassName='linkActive' to={linkAttr} >{linkToDisplay}</Link></th>
				</tr>
			)
		});

		return (
			<table className="table table-collapse">
				<thead className="thead-inverse">
				<tr>
					<th>Article Name</th>
					<th>Article URL</th>
				</tr>
				</thead>
				<tbody>
				{articlesTrElements}
				</tbody>
			</table>
		);
	};

}

ArticlesTable = withRouter(connect(mapStateToProps, actions)(ArticlesTable));

export default ArticlesTable;
