
export const LiveChatFacade = (() => {

	const test = () => {
		console.log('----------------------------------------');
		console.log('----------------------------------------');
		console.log('TEST');
		console.log('TEST');
		console.log('TEST');
		console.log('----------------------------------------');
		console.log('----------------------------------------');
	}

	const initSFLiveagent = () => {

		liveagent.init("https://d.la1-c1cs-par.salesforceliveagent.com/chat", "572G00000004EEz", "00D9E000000Cw94");

	};

	const showLiveChatBtnWhenOnline = () => {
		liveagent.showWhenOnline("573G00000004ERh", document.getElementById("livechat-button-online"));
	};

	const startChat = () => {
		liveagent.startChat("573G00000004ERh");
	};

	return {
		test: test,
		initSFLiveagent: initSFLiveagent,
		showLiveChatBtnWhenOnline: showLiveChatBtnWhenOnline,
		startChat: startChat
	}
})();

