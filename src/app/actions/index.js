import { getIsFetchingBuildConfigs } from '../reducers/build_config';
import axios from 'axios';

const requestBuildConfigs = (filter) => ({
	type: 'ALL_BUILD_CONFIG_REQUEST',
	filter,
});

const receiveBuildConfigs = (filter, response) => ({
	type: 'ALL_BUILD_CONFIG_RESPONSE',
	filter,
	response,
});

const apiFail = (error) => {
	let errorDescription = 'Network Connection Failure.';
	if (error.response) {
		errorDescription = error.response.status;
	}
	return ({
		type: 'API_ERROR',
		error: errorDescription
	})
};

export const fetchBuildConfigsAction = (filter) => (dispatch, getState) => {
	if (getIsFetchingBuildConfigs(getState(), filter)) {
		return Promise.resolve();
	}

	dispatch(requestBuildConfigs(filter));
	return axios.get(getState().apiConfig.apiUrl + '/buildconfigs').then(response => {
		dispatch(receiveBuildConfigs(filter, response.data));
	}).catch(error => {
		dispatch(apiFail(error));
	});
};

export const saveBuildConfigAction = (buildConfig, redirectTo) => (dispatch, getState) => {
	return axios.post(getState().apiConfig.apiUrl + '/buildconfigs', buildConfig)
		.then(() => {
			redirectTo();
		}).catch(error => {
			dispatch(apiFail(error));
		});
};

const getBuildConfigRequest = (env) => ({
	type: 'ONE_BUILD_CONFIG_REQUEST',
	env
});

const getBuildConfigResponse = (env, response) => ({
	type: 'ONE_BUILD_CONFIG_RESPONSE',
	env,
	response,
});

export const getBuildConfigAction = (env) => (dispatch, getState) => {
	dispatch(getBuildConfigRequest(env));

	return axios.get(getState().apiConfig.apiUrl + '/buildconfigs/' + env).then(response => {
		dispatch(getBuildConfigResponse(env, response.data));
	}).catch(error => {
		dispatch(apiFail(error));
	});
};

const deleteBuildConfigResponse = (status) => ({
	type: 'DELETE_BUILD_CONFIG_RESPONSE',
	status
});

export const deleteBuildConfigAction = (env) => (dispatch, getState) => {
	return axios.delete(getState().apiConfig.apiUrl + '/buildconfigs/' + env).then(response => {
		dispatch(deleteBuildConfigResponse);
		fetchBuildConfigsAction(env);
	}).catch(error => {
		dispatch(apiFail(error));
	});
};

const attributeAdded = (result) => ({
	type: 'NEW_BUILD_CONFIG_RESPONSE',
	attributes: result
});

export const addAttributeAction = (name, value) => (dispatch) => {
	dispatch(attributeAdded({[name]:value}))
};

const attributeEmpty = () => ({
	type: 'EMPTY_BUILD_CONFIG'
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
};


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
};

export const emptyApiErrors = () => ({
	type: 'EMPTY_API_ERRORS'
});

export const emptyApiErrorsAction = () => (dispatch) => {
	dispatch(emptyApiErrors())
};
