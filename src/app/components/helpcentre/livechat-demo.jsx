import React, {Component} from 'react';
import {LiveChatFacade} from '../../scripts/livechatFacade';
import {liveChatConfig} from '../../scripts/livechatConfig';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class LivechatDemo extends Component {

	componentWillMount() {
		LiveChatFacade.initModule(window, document, "livechat-button-online-5730Y0000008Ph4")
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
									<a href="javascript://Chat" onClick={() => LiveChatFacade.startChat() }
										 id="livechat-button-online-5730Y0000008Ph4"
										 className="n-button n-button--blue" style={{display: 'none'}}>
										Chat online
									</a>
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
