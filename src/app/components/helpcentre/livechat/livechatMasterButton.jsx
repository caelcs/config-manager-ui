import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import {liveChatConfig} from '../../../scripts/livechatConfig';
import {LiveChatFacade} from '../../../scripts/liveChatFacade';
import {liveagentComponentsStyleAttribute} from '../../../reducers/livechat';


class LivechatMasterButton extends React.Component {

	livachatBtnId = LiveChatFacade.defaultButtonId();

	componentWillMount() {
  		LiveChatFacade.initModule(window, document);
  		LiveChatFacade.withLogging();
  	}

  	componentDidMount() {

  		const {liveChatButtonAvialable, liveChatButtonUnavialable} = this.props;

  		const handleLivechatButtonState = (browserWindow) => {

			let liveagentInstance = browserWindow.liveagent;

			liveagentInstance.addButtonEventHandler(liveChatConfig.chatButtonId, (e) => {
				if(e === liveagentInstance.BUTTON_EVENT.BUTTON_AVAILABLE){
					liveChatButtonAvialable(LiveChatFacade.defaultButtonId());
				}
				if(e === liveagentInstance.BUTTON_EVENT.BUTTON_UNAVAILABLE){
					liveChatButtonUnavialable(LiveChatFacade.defaultButtonId());
				}
			});

		};

  		LiveChatFacade.initSalesforceLiveagent(() => handleLivechatButtonState(window));

  	}

	render() {
		return (
			<div style={{ display: 'none' }} >
				<div>
					<button id={this.livachatBtnId} >Chat online</button>
				</div>
			</div>
		);
	}

}

export default connect(null, actions)(LivechatMasterButton);
