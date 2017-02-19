import React, {Component} from 'react';
import {LiveChatFacade} from '../../scripts/livechatFacade';
import {liveChatConfig} from '../../scripts/livechatConfig';

class LivechatDemo extends Component {

	componentWillMount() {
		LiveChatFacade.initModule(window, document, "livechat-button-online")
		LiveChatFacade.withLogging();
	}

	componentDidMount() {
		LiveChatFacade.initSalesforceLiveagent();
	}

	render() {
		return (
			<div>
				<div className="n-container">
					<div className="n-container__item">
						<h1>livechat demo</h1>
						<div>

							<div id="live-agent-card" className="sidebar-card sidebar-card-blue">
								<div className="n-container__item">
									<i className="ntvicon ntvicon-live-chat-01 ntvicon-blue"></i>
									Live Chat
								</div>

								<div className="n-container__item">
									<p className="liveagent-online-description" style={{display: 'none'}}>
										liveAgent Available Description
									</p>
									<p className="liveagent-offline-description" style={{display: 'none'}}>
										liveAgent Unavailable Description
									</p>
								</div>

								<div className="n-container__item">
									<button onClick={() => LiveChatFacade.startChat() } id="livechat-button-online"
													className="n-button n-button--blue" style={{display: 'none'}}>
										Chat online
									</button>
								</div>
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
