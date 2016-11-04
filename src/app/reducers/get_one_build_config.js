import { combineReducers } from 'redux';

const oneBuildConfig = () => {

	const one = (state = {}, action) => {
		switch (action.type) {
			case 'GET_BUILD_CONFIG_RESPONSE':
				return action.response;
			default:
				return state;
		}
	};

	const isSaved = (state = {}, action) => {
		switch (action.type) {
			case 'BUILD_CONFIG_SAVED':
				return true;
			default:
				return false;
		}
	};

	const buildConfigNew = (state = {}, action) => {
		switch (action.type) {
			case 'BUILD_CONFIG_NEW':
				return Object.assign({}, state,
					action.attributes
				);
			case 'BUILD_CONFIG_EMPTY':
				return {};
			default:
				return state;
		}
	};

	return combineReducers({
		one,
		isSaved,
		buildConfigNew
	});
};

export default oneBuildConfig;

export const getOne = (state) => {
	return state.one;
};

export const isBuildConfigSaved = (state) => {
	return state.isSaved;
};

export const getBuildConfigNew = (state) => {
	return state.buildConfigNew;
};
