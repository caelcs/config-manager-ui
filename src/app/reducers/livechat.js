import { combineReducers } from 'redux';

// TO refactoring, return status not full style attribute

const defaultState = {
				online: {
					display: 'none'
				},
				offline: {
					display: 'block'
				}
			};

const liveagentComponentsStyleAttribute = (state = defaultState, action) => {

	switch(action.type) {
		case 'BUTTON_AVAILABLE':
			return {
				online: {
					display: 'block'
				},
				offline: {
					display: 'none'
				}
			};
		case 'BUTTON_UNAVAILABLE':
			return {
				online: {
					display: 'none'
				},
				offline: {
					display: 'block'
				}
			};
		default:
			return state;
	}

};

const livechat = () => {
	return combineReducers({
		liveagentComponentsStyleAttribute
	});
}

export default livechat();
