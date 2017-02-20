import {liveChatConfig} from './livechatConfig';
import {livechatInitHandler} from './livechatInitHandler';

export const liveChatFacade = (() => {

	const defaultButtonId = () => {
		return 'livechat-master-btn';
	 }

	const startChat = (windowObj) => {
		if (!windowObj.liveAgentDeployment) {
			return;
		}
		windowObj.liveagent.startChat(liveChatConfig.chatButtonId);
	};

	const withLogging = () => {
		livechatInitHandler.withLogging();
	};

	const livechatButtonHandler = (browserWindow, chatBtnActions) => {

		let liveagentInstance = browserWindow.liveagent;

		liveagentInstance.addButtonEventHandler(liveChatConfig.chatButtonId, (e) => {
			if(e === liveagentInstance.BUTTON_EVENT.BUTTON_AVAILABLE){
				chatBtnActions['online'](liveChatFacade.defaultButtonId());
			}
			if(e === liveagentInstance.BUTTON_EVENT.BUTTON_UNAVAILABLE){
				chatBtnActions['offline'](liveChatFacade.defaultButtonId());
			}
		});
	};

	const init = (windowObj, chatBtnActions) => {
		livechatInitHandler.initSalesforceLiveagent(windowObj, () => livechatButtonHandler(windowObj, chatBtnActions));
	};

	return {
		init: init,
		withLogging: withLogging,
		defaultButtonId: defaultButtonId,
		startChat: startChat
	}
})();
