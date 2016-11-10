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
