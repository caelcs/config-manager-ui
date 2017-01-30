import { isFetchingArticles } from '../reducers/articles';
import axios from 'axios';

const apiFail = (type, error) => {
	let errorDescription = 'Network Connection Failure.';
	if (error.response) {
		errorDescription = error.response.status;
	}
	return ({
		type: type,
		error: errorDescription
	})
};

const pageTitle = (title) => ({
	type: 'SET_CURRENT_PAGE_TITLE',
	title
});

export const setCurrentPageTitle = (title) => (dispatch) => {
	dispatch(pageTitle(title))
};

const requestOneArticle = () => ({
	type: 'IS_FETCHING_ARTICLE',
	status: true
});

const receiveOneArticle = (oneArticle) => ({
	type: 'ONE_ARTICLE',
	title: oneArticle.title,
	content: oneArticle.content
});

export const fetchArticlesAction = (filter) => (dispatch, getState) => {

	const articleKey = filter;

	if (isFetchingArticles(getState(), filter)) {
		return Promise.resolve();
	}

	dispatch(requestOneArticle());
	return axios.get(`https://martinhelp-developer-edition.eu11.force.com/services/apexrest/api/article/one/${articleKey}`).then(response => {
		dispatch(receiveOneArticle(response.data));
	}).catch(error => {
		dispatch(apiFail('ONE_ARTICLE_FAILURE', error));
	});
};

const requestAllArticlesKeyesAndTitles = () => ({
	type: 'IS_FETCHING_ALL_ARTICLES_KEYES_AND_TITLES',
	status: true
});

const receiveAllArticlesKeyesAndTitles = (articles) => ({
	type: 'ALL_ARTICLES_KEYES_AND_TITLES',
	articles: articles
});

export const fetchAllArticlesKeyesAndTitlesAction = (filter) => (dispatch, getState) => {
	if (isFetchingArticles(getState(), filter)) {
		return Promise.resolve();
	}

	dispatch(requestAllArticlesKeyesAndTitles());
	return axios.get(`https://martinhelp-developer-edition.eu11.force.com/services/apexrest/api/articles/all/keyes-and-titles`)
		.then(response => {
		dispatch(receiveAllArticlesKeyesAndTitles(response.data));
	}).catch(error => {
		dispatch(apiFail('ALL_ARTICLE_FAILURE', error));
	});
};


