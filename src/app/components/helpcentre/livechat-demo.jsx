import React, {Component} from 'react';
import {LiveChatFacade} from '../../scripts/livechatFacade';
import {liveChatConfig} from '../../scripts/livechatConfig';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class LivechatDemo extends Component {

	componentWillMount() {
		LiveChatFacade.initModule(window, document, "livechat-button-online-5730Y0000008Ph4", "livechat-button-offline-5730Y0000008Ph4")
		LiveChatFacade.withLogging();
	}

	componentDidMount() {
		const {setCurrentPageTitle} = this.props;
		setCurrentPageTitle('Live Chat Demo');
		LiveChatFacade.initSalesforceLiveagent();
	}

	render() {
		return (
			<div>
				<div className="n-container">
					<div className="n-container__item">
						<h1>Live Chat Demo</h1>
						<div>

							<div id="live-agent-card" className="sidebar-card sidebar-card-blue">
								<div className="n-container__item">
									<i className="ntvicon ntvicon-live-chat-01 ntvicon-blue"></i>
									Live Chat
								</div>

								<div className="n-container__item">
									<p className="liveagent-online-description" style={{display: 'none'}}>
										Available every day 8am–midnight for TV issues, and 8am–11pm for broadband or calls issues. 
									</p>
									<p className="liveagent-offline-description" style={{display: 'none'}}>
										<b>Live Chat is unavailable at the moment, or all our advisors are busy.</b>
										<br />
										You can chat with an advisor every day 8am–midnight for TV issues, and 8am–11pm for broadband or calls issues. 
									</p>
								</div>

								<div className="n-container__item" id="livechat-button-online-5730Y0000008Ph4" style={{display: 'none'}}>
									<a href="javascript://Chat" onClick={() => LiveChatFacade.startChat() }
										 className="n-button n-button--blue">
										Chat online
									</a>
								</div>
								<div className="n-container__item" id="livechat-button-offline-5730Y0000008Ph4" style={{display: 'none'}}>
									<span className="n-button n-button--blue" disabled>
										Chat offline
									</span>
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

export default connect(null, actions)(LivechatDemo);
