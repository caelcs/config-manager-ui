import {liveChatConfig} from './livechatConfig';
import * as actions from '../actions/index';

export const handleLivechatButtonState = (liveagentInstance, livechatDOMButtonIDOnline) => {

	liveagentInstance.showWhenOnline(liveChatConfig.chatButtonId, document.getElementById(livechatDOMButtonIDOnline));

	liveagentInstance.addButtonEventHandler(liveChatConfig.chatButtonId, (e) => {
		if(e === liveagentInstance.BUTTON_EVENT.BUTTON_AVAILABLE){
			actions.liveChatButtonAvialable(livechatDOMButtonIDOnline);
		}
		if(e === liveagentInstance.BUTTON_EVENT.BUTTON_UNAVAILABLE){
			actions.liveChatButtonUnavialable(livechatDOMButtonIDOnline);
		}
	});

};
