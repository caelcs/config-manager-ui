import { combineReducers } from 'redux';

const articles = () => {
	const one = (state = {}, action) => {
		switch (action.type) {
			case 'ONE_ARTICLE':
			return {title: action.title, content: action.content};
			default:
				return state;
		}
	};

	const all = (state = {}, action) => {
		switch (action.type) {
			case 'ALL_ARTICLES':
			return {articles: action};
			default:
				return state;
		}
	};

	const isFetchingArticles = (state = {status: false}, action) => {
		switch (action.type) {
			case 'IS_FETCHING_ARTICLE':
				return {status: action.status};
			case 'IS_FETCHING_ALL_ARTICLES':
				return {status: action.status};
			default:
				return state;
		}
	};

	return combineReducers({
		one,
		all,
		isFetchingArticles
	});
};

export default articles();


export const isFetchingArticles = (state) => {
	return state.articles.isFetchingArticles.isFetchingArticle;
};

export const getOneArticle = (state) => {
	return state.articles.one;
};

export const getAllArticles = (state) => {
	return state.articles.all;
};
