import React, {Component} from 'react';
import {LiveChatFacade} from '../../scripts/livechatFacade';

class LivechatDemo extends Component {

	componentWillMount() {
		const deploymentJsScript = document.createElement("script");

		deploymentJsScript.src = "https://d.la1-c1cs-par.salesforceliveagent.com/content/g/js/38.0/deployment.js";
		deploymentJsScript.async = true;

		document.body.appendChild(deploymentJsScript);
	}

	componentDidMount() {
		LiveChatFacade.test();
		LiveChatFacade.initSFLiveagent();
		LiveChatFacade.showLiveChatBtnWhenOnline();
	}

	render() {
		return (
			<div>
				<div className="n-container">
					<h1>livechat demo</h1>
					<div>

						<div id="live-agent-card" className="sidebar-card sidebar-card-blue">
							<div className="sidebar-card-header">
								<i className="ntvicon ntvicon-live-chat-01 ntvicon-blue"></i>
								Help_LiveAgentComponent_Title
							</div>

							<div className="sidebar-card-content" id="lifeAgentSideCardOnline" style={{display: 'none'}} >
								<p id="liveagent-description">
									liveAgentAvailableDescription
								</p>
							</div>
							<div className="sidebar-card-content" id="lifeAgentSideCardOffline" style={{display: 'none'}}>
								<p id="liveagent-description">
									!liveAgentUnavailableDescription
								</p>
							</div>

							<div className="sidebar-card-footer">
								<button onClick={() =>  LiveChatFacade.startChat() } id="livechat-button-online" className="btn btn-block btn-blue" >
									Help_LiveAgentComponent_ChatButtomLabel
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}

}

export default LivechatDemo;
