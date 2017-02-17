import {liveChatConfig} from './livechatConfig';

export const LiveChatFacade = (() => {

	var browserWindow = {};

	const _addDeploymentJSToComponent = (doc) => {
		const deploymentJsScript = doc.createElement("script");
		deploymentJsScript.src = liveChatConfig.deplymentJsSrcLink;
		doc.body.appendChild(deploymentJsScript);
	};

	const initModule = (browserWindowParam, domDocument) => {
		browserWindow = browserWindowParam;
		_addDeploymentJSToComponent(domDocument);
	};

	const initSFLiveagent = () => {
		if (!browserWindow.liveAgentDeployment) {
			return;
		}
		console.log('liveAgentDeployment is true');
		if(browserWindow.liveagent.getSid()){
			browserWindow.liveagent.disconnect();
		}
		browserWindow.liveagent.init(liveChatConfig.livechatEndpoint, liveChatConfig.deploymentId, liveChatConfig.orgId);
	};

	const showLiveChatBtnWhenOnline = (livechatButtonID) => {
		if (!browserWindow.liveAgentDeployment) {
			return;
		}
		browserWindow.liveagent.showWhenOnline(liveChatConfig.chatButtonId, document.getElementById(livechatButtonID));

	};

	const startChat = () => {
		if (!browserWindow.liveAgentDeployment) {
			return;
		}
		browserWindow.liveagent.startChat(liveChatConfig.chatButtonId);
	};

	return {
		initModule: initModule,
		initSFLiveagent: initSFLiveagent,
		showLiveChatBtnWhenOnline: showLiveChatBtnWhenOnline,
		startChat: startChat
	}
})();

