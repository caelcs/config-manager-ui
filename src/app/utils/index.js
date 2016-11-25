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
	return ({
		environment: buildConfigNew.environment,
		attributes: Object.assign({}, buildConfigNew.attributes, {username: buildConfigNew.username, password: buildConfigNew.password, token: buildConfigNew.token})
	});
};
