import React, {Component} from 'react';
import {LiveChatFacade} from '../../scripts/livechatFacade';
import {liveChatConfig} from '../../scripts/livechatConfig';

class LivechatDemo extends Component {

	componentWillMount() {
		LiveChatFacade.initModule(window, document);
	}

	componentDidMount() {
		LiveChatFacade.initSFLiveagent();
		LiveChatFacade.showLiveChatBtnWhenOnline("livechat-button-online");
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

							<div className="sidebar-card-content" id="lifeAgentSideCardOnline" style={{display: 'none'}}>
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
								<button onClick={() => LiveChatFacade.startChat() } id="livechat-button-online"
												className="btn btn-block btn-blue" style={{display: 'none'}}>
									Help_LiveAgentComponent_ChatButtomLabel
								</button>
							</div>
						</div>

					</div>
				</div>
				<hr />
			</div>
		);
	}

}

export default LivechatDemo;
