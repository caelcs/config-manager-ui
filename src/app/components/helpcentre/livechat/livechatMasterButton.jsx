import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import {liveChatConfig} from '../../../scripts/livechatConfig';
import {LiveChatFacade} from '../../../scripts/LiveChatFacade';
import {liveagentComponentsStyleAttribute} from '../../../reducers/livechat';


class LivechatMasterButton extends React.Component {

	componentWillMount() {
  		LiveChatFacade.initModule(window, document, "livechat-master-btn");
  		LiveChatFacade.withLogging();
  	}

  	componentDidMount() {

  		const {liveChatButtonAvialable, liveChatButtonUnavialable} = this.props;

  		const handleLivechatButtonState = (livechatDOMButtonIDOnline) => {
			let liveagentInstance = window.liveagent;

			liveagentInstance.addButtonEventHandler(liveChatConfig.chatButtonId, (e) => {
				if(e === liveagentInstance.BUTTON_EVENT.BUTTON_AVAILABLE){
					liveChatButtonAvialable(livechatDOMButtonIDOnline);
				}
				if(e === liveagentInstance.BUTTON_EVENT.BUTTON_UNAVAILABLE){
					liveChatButtonUnavialable(livechatDOMButtonIDOnline);
				}
			});

		};

  		LiveChatFacade.initSalesforceLiveagent(() => handleLivechatButtonState('livechat-master-btn'));

  	}

	render() {
		return (
			<div style={{ display: 'none' }} >
				<div>
					<button id="livechat-master-btn">Chat online</button>
				</div>
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		livagentStyleAttr: liveagentComponentsStyleAttribute
	}
};

export default connect(mapStateToProps, actions)(LivechatMasterButton);
