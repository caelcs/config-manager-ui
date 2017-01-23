import React from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getOneArticle} from '../../reducers/articles';
import Button from '@nowtv/nowtv-web-toolkit/src/react/components/Button/Button.react';
import {prepareArticleHtmlContentForReactComponent} from '../../utils';

const mapStateToProps = (state) => {
	return {
		oneArticle: getOneArticle(state)
	};
};

class HelpCentreArticles extends React.Component {

	componentDidMount() {
		const {setCurrentPageTitle,  fetchArticlesAction} = this.props;

		const articleKey = this.props.params.articleKey;

		setCurrentPageTitle('Help Centre');

		fetchArticlesAction(articleKey);
	}

	render() {
		const {oneArticle} = this.props;
		const htmlContent = prepareArticleHtmlContentForReactComponent(oneArticle.content);
		return (
			<div>
				<div className="n-container container-fluid">
						<div className="n-container__item">
							<h3 className="n-bold n-primary-title">{oneArticle.title}</h3>
						</div>
							<div className="n-container__item">
								<div className="n-body-text n-light" dangerouslySetInnerHTML={{__html: htmlContent}} />
							</div>
					<div>
						<div className="n-container__item">
							<p className="n-bold">Did you find this helpful?</p>
							<Button colour="blue" href="#" disabled={false}>
								Yes
							</Button>
							<Button colour="blue" href="#" disabled={false}>
								No
							</Button>
						</div>
						<div className="n-container__item">
							<p className="n-bold">For more help on this topic
								Contact Us</p>
							<Button href="#/helpcentre" disabled={false}>
								Contact Us
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

HelpCentreArticles = withRouter(connect(mapStateToProps, actions)(HelpCentreArticles));

export default HelpCentreArticles;
