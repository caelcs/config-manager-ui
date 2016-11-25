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
			case 'ADD_DEFAULT_ATTRIBUTE_RESPONSE':
				return Object.assign({}, state, action.attributes);
			case 'ADD_CUSTOM_ATTRIBUTE_RESPONSE':
				let attributesResult = {attributes : Object.assign({}, state.attributes, action.attributes.attributes)};
				return Object.assign({}, state, attributesResult);
			case 'LOAD_BUILD_CONFIG_FOR_CLONE_RESPONSE':
				let loadBuildConfigForCloneResult = ({environment: '', username: action.response.attributes.username, password: action.response.attributes.password, token: action.response.attributes.token, attributes: action.response.attributes});
				delete loadBuildConfigForCloneResult.attributes.username;
				delete loadBuildConfigForCloneResult.attributes.password;
				delete loadBuildConfigForCloneResult.attributes.token;
				return loadBuildConfigForCloneResult;
			case 'LOAD_BUILD_CONFIG_FOR_EDIT_RESPONSE':
				let loadBuildConfigEditResult = ({environment: action.response.environment, username: action.response.attributes.username, password: action.response.attributes.password, token: action.response.attributes.token, attributes: action.response.attributes});
				delete loadBuildConfigEditResult.attributes.username;
				delete loadBuildConfigEditResult.attributes.password;
				delete loadBuildConfigEditResult.attributes.token;
				return loadBuildConfigEditResult;
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
