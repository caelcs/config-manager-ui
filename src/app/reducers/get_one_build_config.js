import { combineReducers } from 'redux';

const oneBuildConfig = () => {

	const one = (state = {}, action) => {
		switch (action.type) {
			case 'ONE_BUILD_CONFIG_RESPONSE':
				return action.response;
			case 'ONE_BUILD_CONFIG_FAILURE':
				return {};
			default:
				return state;
		}
	};

	const isSaved = (state = {}, action) => {
		switch (action.type) {
			case 'SAVE_BUILD_CONFIG_RESPONSE':
				return true;
			default:
				return false;
		}
	};

	const buildConfigNew = (state = {environment: '', username: '', password: '', token: '', attributes: {}}, action) => {
		switch (action.type) {
			case 'NEW_BUILD_CONFIG_RESPONSE':
				let attributes = Object.assign({}, state.attributes, action.attributes.attributes);
				return Object.assign({}, state, {attributes: attributes});
			case 'LOAD_BUILD_CONFIG_FOR_EDIT_RESPONSE':
				let tempResult = ({environment: '', username: action.response.attributes.username, password: action.response.attributes.password, token: action.response.attributes.token, attributes: action.response.attributes});
				delete tempResult.attributes.username;
				delete tempResult.attributes.password;
				delete tempResult.attributes.token;
				return tempResult;
			case 'NEW_BUILD_CONFIG_FAILURE':
				return {environment: '', username: '', password: '', token: '', attributes: {}};
			case 'EMPTY_BUILD_CONFIG':
				return {environment: '', username: '', password: '', token: '', attributes: {}};
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
