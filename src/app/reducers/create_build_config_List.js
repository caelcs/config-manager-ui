import { combineReducers } from 'redux';

const createBuildConfigList = (filter) => {

	const isFetching = (state = false, action) => {
		if (filter !== action.filter) {
			return state;
		}

		switch (action.type) {
			case 'ALL_BUILD_CONFIG_REQUEST':
				return true;
			case 'ALL_BUILD_CONFIG_RESPONSE':
				return false;
			case 'ALL_BUILD_CONFIG_FAILURE':
				return false;
			default:
				return state;
		}
	};

	const list = (state = [], action) => {
		if (filter !== action.filter) {
			return state;
		}

		switch (action.type) {
			case 'ALL_BUILD_CONFIG_RESPONSE':
				return action.response;
			case 'ALL_BUILD_CONFIG_FAILURE':
				return [];
			case 'DELETE_BUILD_CONFIG_FAILURE':
				return [];
			case 'NEW_BUILD_CONFIG_FAILURE':
				return [];
			case 'ONE_BUILD_CONFIG_FAILURE':
				return [];
			default:
				return state;
		}
	};

	return combineReducers({
		isFetching,
		list
	});
};

export default createBuildConfigList;

export const getIsFetching = (state) => {
	return state.isFetching;
};

export const getList = (state) => {
	return state.list;
};
