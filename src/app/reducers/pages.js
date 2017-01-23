import { combineReducers } from 'redux';

const currentPage = () => {
	const title = (state = {}, action) => {
		switch (action.type) {
			case 'SET_CURRENT_PAGE_TITLE':
				return {title: action.title};
			default:
				return state;
		}
	};

	return combineReducers({
		title
	});
};

const pages = combineReducers({
	currentPage: currentPage()
});

export default pages;

export const currentPageTitle = (state) => {
	return state.pages.currentPage.title.title;
};
