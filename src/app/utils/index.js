import {emptyApiErrors} from '../actions';
export const mapObject = (object, callback) => {
	return Object.keys(object).map(function (key) {
		return callback(key, object[key]);
	})
};

export const redirector = (state, dispatch) => {
	const {apiErrorMessages} = state.errors.apiErrorMessages || {}

	if (apiErrorMessages.length() == 0) {
		dispatch(emptyApiErrors);
	}
};


export const validateNotEmptyOrUndefined = (value, fieldName, errorAction) => {
	if (value === undefined || value === '') {
		value = '';
		errorAction(fieldName + ' can not be null or empty.');
		throw new Error(fieldName + ' can not be null or empty.');
	}
};

export const buildConfigRequestBody = (buildConfigNew) => {
	console.log(buildConfigNew);
	const attributes = Object.assign({}, buildConfigNew.attributes, {username: buildConfigNew.username, password: buildConfigNew.password, token: buildConfigNew.token});
	console.log('attributes');
	console.log(attributes);
	return ({
		environment: buildConfigNew.environment,
		attributes: attributes
	});
};

export const validateMandatoryFields = (buildConfigNew, setGeneralErrorMessageAction) => {
	validateNotEmptyOrUndefined(buildConfigNew.environment, 'Environment', setGeneralErrorMessageAction);

	validateNotEmptyOrUndefined(buildConfigNew.username, 'Username', setGeneralErrorMessageAction);

	validateNotEmptyOrUndefined(buildConfigNew.token, 'Token', setGeneralErrorMessageAction);

	validateNotEmptyOrUndefined(buildConfigNew.password, 'Password', setGeneralErrorMessageAction);
};
