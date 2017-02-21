import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import {liveChatConfig} from '../../../scripts/livechatConfig';
import {liveChatFacade} from '../../../scripts/livechatFacade';
import {livechatInitHandler} from '../../../scripts/livechatInitHandler';
import {liveagentComponentsStyleAttribute} from '../../../reducers/livechat';


class LivechatMasterButton extends React.Component {

	livachatBtnId = liveChatFacade.defaultButtonId();

  	componentDidMount() {

  		const {liveChatButtonAvialable, liveChatButtonUnavialable} = this.props;

			const chatBtnActions = {
				online: liveChatButtonAvialable,
				offline: liveChatButtonUnavialable
			}

			liveChatFacade.withLogging();
  		liveChatFacade.init(window, chatBtnActions);

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
