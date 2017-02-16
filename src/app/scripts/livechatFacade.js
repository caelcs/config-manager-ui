
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
		liveagent.init('https://d.la1-c2-par.salesforceliveagent.com/chat', '5720Y0000008PYE', '00D0Y000000ZMxP');
	};

	const showLiveChatBtnWhenOnline = () => {
		liveagent.showWhenOnline("5730Y0000008Ph4", document.getElementById("livechat-button-online"));
	};

	const startChat = () => {
		liveagent.startChat("5730Y0000008Ph4");
	};

	return {
		test: test,
		initSFLiveagent: initSFLiveagent,
		showLiveChatBtnWhenOnline: showLiveChatBtnWhenOnline,
		startChat: startChat
	}
})();

