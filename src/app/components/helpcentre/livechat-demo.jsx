import React, {Component} from 'react';
import {LiveChatFacade} from '../../scripts/livechatFacade';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import LivechatMasterButton from './livechat/livechatMasterButton.jsx';
import {liveagentComponentsStyleAttribute} from '../../reducers/livechat';

class LivechatDemo extends Component {


	componentDidMount() {
		const {setCurrentPageTitle} = this.props;
		setCurrentPageTitle('Live Chat Demo');
	}

	render() {
		return (
			<div>
				<div className="n-container">
					<div className="n-container__item">

					<LivechatMasterButton />

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
										You can chat with an advisor every day 8am–midnight for TV issues, and 8am–11pm for broadband or
										calls issues.
									</p>
								</div>

								<div className="n-container__item" id="livechat-button-online-5730Y0000008Ph4"
										 style={{display: 'none'}}>
									<a href="javascript://Chat" onClick={() => LiveChatFacade.startChat() }
										 className="n-button n-button--blue">
										Chat online
									</a>
								</div>
								<div className="n-container__item" id="livechat-button-offline-5730Y0000008Ph4"
										 style={{display: 'none'}}>
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

const mapStateToProps = (state) => {
	return {
		livagentStyleAttr: liveagentComponentsStyleAttribute
	}
};

export default connect(mapStateToProps, actions)(LivechatDemo);
