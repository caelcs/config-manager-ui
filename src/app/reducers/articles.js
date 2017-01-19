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

	const isFetchingOneArticle = (state = {status: false}, action) => {
		switch (action.type) {
			case 'IS_FETCHING_ARTICLE':
				return {status: action.status};
			default:
				return state;
		}
	};

	return combineReducers({
		one,
		isFetchingOneArticle
	});
};

export default articles();


export const isFetchingOneArticle = (state) => {
	return state.articles.isFetchingOneArticle.isFetchingArticle;
};

export const getOneArticle = (state) => {
	return state.articles.one;
};
