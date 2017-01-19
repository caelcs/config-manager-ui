import { combineReducers } from 'redux';

const errorList = () => {

	const childErrorMessages = (state = [], action) => {
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

	const generalErrorMessages = (state = [], action) => {
		switch (action.type) {
			case 'GENERAL_ERROR_MESSAGE':
				return Object.assign([], state,
					[action.errorMessage]
				);
			case 'EMPTY_GENERAL_ERROR_MESSAGES':
				return [];
			default:
				return state;
		}
	};

	const apiErrorMessages = (state = [], action) => {
		if (action.type.search("_RESPONSE") !== -1 ) {
			return [];
		}

		if (action.type.search("_FAILURE") !== -1 ) {
			return Object.assign([], state,
				[action.error]
			);
		}

		switch (action.type) {
			case 'EMPTY_API_ERRORS':
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
};

export const getChildErrorMsg = (state) => {
	return childErrorMsg(state.errors);
};

const generalErrorMsg = (state) => {
	return state.generalErrorMessages;
};

export const getGeneralErrorMsg = (state) => {
	return generalErrorMsg(state.errors);
};

const apiErrorMsg = (state) => {
	return state.apiErrorMessages;
};

export const getApiErrorMsg = (state) => {
	return apiErrorMsg(state.errors);
};
