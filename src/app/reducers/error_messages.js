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

	const parentErrorMessages = (state = [], action) => {
		switch (action.type) {
			case 'PARENT_ERROR_MESSAGE':
				return Object.assign([], state,
					[action.errorMessage]
				);
			case 'EMPTY_PARENT_ERROR_MESSAGES':
				return [];
			default:
				return state;
		}
	};

	return combineReducers({
		childErrorMessages,
		parentErrorMessages
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

const parentErrorMsg = (state) => {
	return state.parentErrorMessages;
}

export const getParentErrorMsg = (state) => {
	return parentErrorMsg(state.errors);
};

