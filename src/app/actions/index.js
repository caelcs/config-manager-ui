import { getIsFetchingBuildConfigs } from '../reducers/build_config';
import { isFetchingArticles } from '../reducers/articles';
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
	return axios.post(getState().apiConfig.apiUrl + '/buildconfigs', buildConfig)
		.then(() => {
			redirectTo();
		}).catch((error) => {
			dispatch(apiFail('SAVE_BUILD_CONFIG_FAILURE', error));
		});
};

export const updateBuildConfigAction = (env, buildConfig, redirectTo) => (dispatch, getState) => {
	return axios.post(getState().apiConfig.apiUrl + '/buildconfigs/' + env, buildConfig)
		.then(() => {
			redirectTo();
		}).catch((error) => {
			dispatch(apiFail('UPDATE_BUILD_CONFIG_FAILURE', error));
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

const loadBuildConfigForCloneResponse = (response) => ({
	type: 'LOAD_BUILD_CONFIG_FOR_CLONE_RESPONSE',
	response
});

export const loadBuildConfigForCloneAction = (env) => (dispatch, getState) => {
	dispatch(getBuildConfigRequest(env));

	return axios.get(getState().apiConfig.apiUrl + '/buildconfigs/' + env).then(response => {
		dispatch(loadBuildConfigForCloneResponse(response.data));
	}).catch(error => {
		dispatch(apiFail('LOAD_BUILD_CONFIG_FOR_CLONE_FAILURE', error));
	});
};

const loadBuildConfigForEditResponse = (response) => ({
	type: 'LOAD_BUILD_CONFIG_FOR_EDIT_RESPONSE',
	response
});

export const loadBuildConfigForEditAction = (env) => (dispatch, getState) => {
	dispatch(getBuildConfigRequest(env));

	return axios.get(getState().apiConfig.apiUrl + '/buildconfigs/' + env).then(response => {
		dispatch(loadBuildConfigForEditResponse(response.data));
	}).catch(error => {
		dispatch(apiFail('LOAD_BUILD_CONFIG_FOR_EDIT_FAILURE', error));
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

const attributeAdded = (result, type) => ({
	type,
	attributes: result
});

export const addAttributeAction = (name, value) => (dispatch) => {
	dispatch(attributeAdded({attributes: {[name]: value}}, 'ADD_CUSTOM_ATTRIBUTE_RESPONSE'))
};

export const addDefaultAttributeAction = (name, value) => (dispatch) => {
	dispatch(attributeAdded({[name]: value}, 'ADD_DEFAULT_ATTRIBUTE_RESPONSE'))
};

const attributeRemoved = (name) => ({
	type: 'REMOVE_ATTRIBUTE_RESPONSE',
	name
});

export const removeAttributeAction = (name) => (dispatch) => {
	dispatch(attributeRemoved(name));
};


const attributeEmpty = () => ({
	type: 'EMPTY_BUILD_CONFIG'
});

export const clearBuildConfigNewAction = () => (dispatch) => {
	dispatch(attributeEmpty());
};

const setErrorMessage = (errorMessage) => ({
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


const setGeneralErrorMessage = (errorMessage) => ({
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

const pageTitle = (title) => ({
	type: 'SET_CURRENT_PAGE_TITLE',
	title
});

export const setCurrentPageTitle = (title) => (dispatch) => {
	dispatch(pageTitle(title))
};

const requestOneArticle = () => ({
	type: 'IS_FETCHING_ARTICLE',
	status: true
});

const receiveOneArticle = (oneArticle) => ({
	type: 'ONE_ARTICLE',
	title: oneArticle.title,
	content: oneArticle.content
});

export const fetchArticlesAction = (filter) => (dispatch, getState) => {

	const articleKey = filter;

	if (isFetchingArticles(getState(), filter)) {
		return Promise.resolve();
	}

	dispatch(requestOneArticle());
	return axios.get(`https://martinhelp-developer-edition.eu11.force.com/services/apexrest/api/article/one/${articleKey}`).then(response => {
		dispatch(receiveOneArticle(response.data));
	}).catch(error => {
		dispatch(apiFail('ONE_ARTICLE_FAILURE', error));
	});
};

const requestAllArticlesKeyesAndTitles = () => ({
	type: 'IS_FETCHING_ALL_ARTICLES_KEYES_AND_TITLES',
	status: true
});

const receiveAllArticlesKeyesAndTitles = (articles) => ({
	type: 'ALL_ARTICLES_KEYES_AND_TITLES',
	articles: articles
});

export const fetchAllArticlesKeyesAndTitlesAction = (filter) => (dispatch, getState) => {
	if (isFetchingArticles(getState(), filter)) {
		return Promise.resolve();
	}

	dispatch(requestAllArticlesKeyesAndTitles());
	return axios.get(`https://martinhelp-developer-edition.eu11.force.com/services/apexrest/api/articles/all/keyes-and-titles`)
		.then(response => {
		dispatch(receiveAllArticlesKeyesAndTitles(response.data));
	}).catch(error => {
		dispatch(apiFail('ALL_ARTICLE_FAILURE', error));
	});
};


