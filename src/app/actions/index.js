import { getIsFetchingBuildConfigs } from '../reducers/build_config';
import axios from 'axios';

const requestBuildConfigs = (filter) => ({
	type: 'REQUEST_BUILD_CONFIGS',
	filter,
});

const receiveBuildConfigs = (filter, response) => ({
	type: 'RECEIVE_BUILD_CONFIGS',
	filter,
	response,
});

export const fetchBuildConfigsAction = (filter) => (dispatch, getState) => {
	if (getIsFetchingBuildConfigs(getState(), filter)) {
		return Promise.resolve();
	}

	dispatch(requestBuildConfigs(filter));
	return axios.get(getState().apiConfig.apiUrl + '/buildconfigs').then(response => {
		dispatch(receiveBuildConfigs(filter, response.data));
	}).catch(error => {
		dispatch(receiveBuildConfigs(filter, []));
	});
};

const buildConfigSaveFail = (error) => ({
	type: 'BUILD_CONFIG_SAVE_FAIL',
	error,
});

export const saveBuildConfigAction = (buildConfig, redirectTo) => (dispatch, getState) => {
	return axios.post(getState().apiConfig.apiUrl + '/buildconfigs', buildConfig)
		.then(() => {
			redirectTo();
		}).catch(error => {
			dispatch(buildConfigSaveFail(error));
		});
};

const getBuildConfigRequest = (env) => ({
	type: 'GET_BUILD_CONFIG_REQUEST',
	env
});

const getBuildConfigResponse = (env, response) => ({
	type: 'GET_BUILD_CONFIG_RESPONSE',
	env,
	response,
});

export const getBuildConfigAction = (env) => (dispatch, getState) => {
	dispatch(getBuildConfigRequest(env));

	return axios.get(getState().apiConfig.apiUrl + '/buildconfigs/' + env).then(response => {
		dispatch(getBuildConfigResponse(env, response.data));
	}).catch(error => {
		dispatch(getBuildConfigResponse(env, response.status));
	});
};

const deleteBuildConfigResponse = (status) => ({
	type: 'DELETE_BUILD_CONFIG',
	status
});

export const deleteBuildConfigAction = (env) => (dispatch, getState) => {
	return axios.delete(getState().apiConfig.apiUrl + '/buildconfigs/' + env).then(response => {
		fetchBuildConfigsAction(env);
	}).catch(error => {
		dispatch(deleteBuildConfigResponse(env, response.status));
	});
};

const attributeAdded = (result) => ({
	type: 'BUILD_CONFIG_NEW',
	attributes: result
});

export const addAttributeAction = (name, value) => (dispatch) => {
	dispatch(attributeAdded({[name]:value}))
};

const attributeEmpty = () => ({
	type: 'BUILD_CONFIG_EMPTY'
});

export const clearBuildConfigNewAction = () => (dispatch) => {
	dispatch(attributeEmpty());
};

const setErrorMessage= (errorMessage) => ({
	type: 'NEW_VALIDATION_ERROR',
	errorMessage
});

export const setErrorMessageAction = (errorMessage) => (dispatch) => {
	dispatch(setErrorMessage(errorMessage));
};

const emptyErrorMessage = () => ({
	type: 'EMPTY_ERROR_MESSAGES'
});

export const emptyErrorMessagesAction = () => (dispatch) => {
	dispatch(emptyErrorMessage())
}


const setGeneralErrorMessage= (errorMessage) => ({
	type: 'GENERAL_ERROR_MESSAGE',
	errorMessage
});

export const setGeneralErrorMessageAction = (errorMessage) => (dispatch) => {
	dispatch(setGeneralErrorMessage(errorMessage));
};

const emptyGeneralErrorMessage = () => ({
	type: 'EMPTY_GENERAL_ERROR_MESSAGES'
});

export const emptyGeneralErrorMessagesAction = () => (dispatch) => {
	dispatch(emptyGeneralErrorMessage())
}
