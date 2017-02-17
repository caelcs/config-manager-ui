import {liveChatConfig} from './livechatConfig';

export const LiveChatFacade = (() => {

	const initSFLiveagent = () => {
		if (liveagent === undefined) {
			return;
		}
		try {
			liveagent.init(liveChatConfig.livechatEndpoint, liveChatConfig.deploymentId, liveChatConfig.orgId);
		} catch (e) {
			console.log('liveagent may not be defined');
		}
	};

	const showLiveChatBtnWhenOnline = (livechatButtonID) => {
		if (liveagent === undefined) {
			return;
		}
		try {
			liveagent.showWhenOnline(liveChatConfig.chatButtonId, document.getElementById(livechatButtonID));
		} catch (e) {
			console.log('liveagent may not be defined');
		}
	};

	const startChat = () => {
		if (liveagent === undefined) {
			return;
		}
		liveagent.startChat(liveChatConfig.chatButtonId);
	};

	return {
		initSFLiveagent: initSFLiveagent,
		showLiveChatBtnWhenOnline: showLiveChatBtnWhenOnline,
		startChat: startChat
	}
})();

