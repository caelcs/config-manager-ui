import { combineReducers } from 'redux';

const errorList = () => {

	const childErrorMessages = (state = [], action) => {
		switch (action.type) {
			case 'NEW_VALIDATION_ERROR_RESPONSE':
				return Object.assign([], state,
					[action.errorMessage]
				);
			case 'EMPTY_ERROR_MESSAGES_RESPONSE':
				return [];
			default:
				return state;
		}
	};

	const generalErrorMessages = (state = [], action) => {
		switch (action.type) {
			case 'GENERAL_ERROR_MESSAGE_RESPONSE':
				return Object.assign([], state,
					[action.errorMessage]
				);
			case 'EMPTY_GENERAL_ERROR_MESSAGES_RESPONSE':
				return [];
			default:
				return state;
		}
	};

	const apiErrorMessages = (state = [], action) => {
		switch (action.type) {
			case 'API_ERROR_RESPONSE':
				return Object.assign([], state,
					[action.error]
				);
			case 'EMPTY_API_ERRORS_RESPONSE':
				return [];
			default:
				return state;
		}
	};

	return combineReducers({
		childErrorMessages,
		generalErrorMessages,
		apiErrorMessages
	});
};

const errors = errorList();

export default errors;

const childErrorMsg = (state) => {
	return state.childErrorMessages;
}

export const getChildErrorMsg = (state) => {
	return childErrorMsg(state.errors);
};

const generalErrorMsg = (state) => {
	return state.generalErrorMessages;
}

export const getGeneralErrorMsg = (state) => {
	return generalErrorMsg(state.errors);
};

const apiErrorMsg = (state) => {
	return state.apiErrorMessages;
}

export const getApiErrorMsg = (state) => {
	return apiErrorMsg(state.errors);
};
