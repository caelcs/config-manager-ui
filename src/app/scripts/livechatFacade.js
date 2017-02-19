import {liveChatConfig} from './livechatConfig';
import jQuery from 'jquery';

export const LiveChatFacade = (() => {

	var browserWindow = {};
	var livechatDOMButtonID = '';
	var enableLiveChatLogging = false;

	const _loadScript = (url, callback) => {
		jQuery.ajax({
			url: url,
			dataType: 'script',
			success: callback,
			async: true
		});
	};


	const _clearLiveAgent = () => {
		if (browserWindow.liveagent || browserWindow.liveAgentDeployment) {
			delete browserWindow.liveagent;
			delete browserWindow.liveAgentDeployment;
		}
	};

	const _initChat = () => {

		browserWindow.liveagent.init(liveChatConfig.livechatEndpoint, liveChatConfig.deploymentId, liveChatConfig.orgId);
		if(enableLiveChatLogging) {
			browserWindow.liveagent.enableLogging();
		}
		browserWindow.liveagent.showWhenOnline(liveChatConfig.chatButtonId, document.getElementById(livechatDOMButtonID));

		browserWindow.liveagent.addButtonEventHandler(liveChatConfig.chatButtonId, (e) => {
			if(e === browserWindow.liveagent.BUTTON_EVENT.BUTTON_AVAILABLE){
				jQuery('.liveagent-online-description').attr('style', 'display: block');
				jQuery('.liveagent-offline-description').attr('style', 'display: none');
			}
			if(e === browserWindow.liveagent.BUTTON_EVENT.BUTTON_UNAVAILABLE){
				jQuery('.liveagent-online-description').attr('style', 'display: none');
				jQuery('.liveagent-offline-description').attr('style', 'display: block');
			}
		});

	};

	const _initChatAsync = () => {

		let callCounter = 0;
		const maxCallCount = 10;
		const callFrequencyInMillis = 1000;

		var checkLiveAgentTimer = setInterval(() => {

			callCounter++;
			if (callCounter > maxCallCount) {
				clearInterval(checkLiveAgentTimer);
				return;
			}
			if (!browserWindow.liveAgentDeployment) {
				return;
			}
			if (browserWindow.liveAgentDeployment) {
				_initChat();
				clearInterval(checkLiveAgentTimer);
			}

		}, callFrequencyInMillis);

	};

	const _initChatMain = () => {

		_clearLiveAgent();

		_loadScript(liveChatConfig.deplymentJsSrcLink, () => {

			if (browserWindow.liveAgentDeployment) {
				_initChat();
			} else {
				_initChatAsync();
			}

		});

	};

	const initModule = (browserWindowParam, domDocument, btnDomID) => {
		browserWindow = browserWindowParam;
		livechatDOMButtonID = btnDomID;
	};

	const initSalesforceLiveagent = () => {

		_initChatMain();

	};

	const startChat = () => {
		if (!browserWindow.liveAgentDeployment) {
			return;
		}
		browserWindow.liveagent.startChat(liveChatConfig.chatButtonId);
	};

	const withLogging = () => {
		enableLiveChatLogging = true;
	};

	return {
		initModule: initModule,
		withLogging: withLogging,
		initSalesforceLiveagent: initSalesforceLiveagent,
		startChat: startChat
	}
})();

