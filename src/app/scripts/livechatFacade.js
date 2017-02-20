import {liveChatConfig} from './livechatConfig';
import jQuery from 'jquery';

export const LiveChatFacade = (() => {

	const defaultButtonId = 'livechat-master-btn';

	var browserWindow = {};
	var livechatDOMBtnId = '';
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
		browserWindow.liveagent.showWhenOnline(liveChatConfig.chatButtonId, document.getElementById(livechatDOMBtnId));
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

	const _initChatMain = (handleLivechatButtonCallback) => {

		console.log('_initChatMain');

		_clearLiveAgent();

		_loadScript(liveChatConfig.deplymentJsSrcLink, () => {

			if (browserWindow.liveAgentDeployment) {
				_initChat();
			} else {
				_initChatAsync();
			}

			handleLivechatButtonCallback();

		});

	};

	const initModule = (browserWindowParam, domDocument, btnOnline) => {
		browserWindow = browserWindowParam;
		livechatDOMBtnId = btnOnline || defaultButtonId;
	};

	const initSalesforceLiveagent = (handleLivechatButtonCallback) => {

		_initChatMain(handleLivechatButtonCallback);

	};

	const startChat = (windowObj) => {
		if (!windowObj.liveAgentDeployment) {
			return;
		}
		windowObj.liveagent.startChat(liveChatConfig.chatButtonId);
	};

	const withLogging = () => {
		enableLiveChatLogging = true;
	};

	return {
		initModule: initModule,
		withLogging: withLogging,
		initSalesforceLiveagent: initSalesforceLiveagent,
		defaultButtonId: () => {
			return defaultButtonId;
		},
		startChat: startChat
	}
})();
