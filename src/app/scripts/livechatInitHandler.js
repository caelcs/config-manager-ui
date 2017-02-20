import {liveChatConfig} from './livechatConfig';
import jQuery from 'jquery';

export const livechatInitHandler = (() => {

  const defaultButtonId = 'livechat-master-btn';

  var browserWindow = {};
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
		browserWindow.liveagent.showWhenOnline(liveChatConfig.chatButtonId, document.getElementById(defaultButtonId));
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

	const _initChatMain = (addLivechatButtonHandlerCallback) => {

		console.log('_initChatMain');

		_clearLiveAgent();

		_loadScript(liveChatConfig.deplymentJsSrcLink, () => {

			if (browserWindow.liveAgentDeployment) {
				_initChat();
			} else {
				_initChatAsync();
			}

			addLivechatButtonHandlerCallback();

		});

	};

	const _addDependecies = (browserWindowParam) => {
		browserWindow = browserWindowParam;
	};

	const initSalesforceLiveagent = (browserWindowParam, addLivechatButtonHandlerCallback) => {
    _addDependecies(browserWindowParam);
		_initChatMain(addLivechatButtonHandlerCallback);

	};

	const withLogging = () => {
		enableLiveChatLogging = true;
	};

  return {
		withLogging: withLogging,
		initSalesforceLiveagent: initSalesforceLiveagent
	}
})();
