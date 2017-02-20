import { combineReducers } from 'redux';

const defaultState = {
				online: {
					display: 'none'
				},
				offline: {
					display: 'block'
				}
			};

const liveagentComponentsStyleAttribute = (state = defaultState, action) => {

	console.log('liveagentComponentsStyleAttribute()');

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

