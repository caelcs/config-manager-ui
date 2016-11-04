import { combineReducers } from 'redux';

const errorList = () => {

	const errorMessages = (state = [], action) => {
		switch (action.type) {
			case 'NEW_VALIDATION_ERROR':
				return Object.assign([], state,
					[action.errorMessage]
				);
			case 'EMPTY_ERROR_MESSAGES':
				return [];
			default:
				return state;
		}
	};

	return combineReducers({
		errorMessages
	});
};

const errors = errorList();

export default errors;

const getErrorMsg = (state) => {
	return state.errorMessages;
}

export const getErrorMessages = (state) => {
	return getErrorMsg(state.errors);
};

