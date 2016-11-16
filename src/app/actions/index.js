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

const apiFail = (type, error) => {
	let errorDescription = 'Network Connection Failure.';
	if (error.response) {
		errorDescription = error.response.status;
	}
	console.log('API ERROR OCCURS: ' + type);
	console.log(errorDescription);
	return ({
		type: type,
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
		dispatch(apiFail('ALL_BUILD_CONFIG_FAILURE', error));
	});
};

export const saveBuildConfigAction = (buildConfig, redirectTo) => (dispatch, getState) => {
	console.log('executing save action');
	return axios.post(getState().apiConfig.apiUrl + '/buildconfigs', buildConfig)
		.then(() => {
			console.log('redirecting back');
			redirectTo();
		}).catch((error) => {
			console.log('error');
			dispatch(apiFail('NEW_BUILD_CONFIG_FAILURE', error));
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
		dispatch(apiFail('ONE_BUILD_CONFIG_FAILURE', error));
	});
};

const deleteBuildConfigResponse = (env) => ({
	type: 'DELETE_BUILD_CONFIG_RESPONSE',
	env
});

export const deleteBuildConfigAction = (env, postAction) => (dispatch, getState) => {
	return axios.delete(getState().apiConfig.apiUrl + '/buildconfigs/' + env).then(response => {
		dispatch(deleteBuildConfigResponse(env));
		postAction('all');
	}).catch(error => {
		dispatch(apiFail('DELETE_BUILD_CONFIG_FAILURE', error));
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
