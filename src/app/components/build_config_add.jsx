import React, {PropTypes} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getBuildConfigNew} from '../reducers/build_config';
import {validateNotEmptyOrUndefined} from '../utils/index';
import BuildConfigForm from './build_config_form';

const mapStateToProps = (state) => {
	return {
		buildConfigNew: getBuildConfigNew(state)
	};
};

class BuildConfigAdd extends React.Component {

	componentDidMount() {
		this.reset();
	}

	reset = () => {
		const {emptyGeneralErrorMessagesAction, emptyErrorMessagesAction, clearBuildConfigNewAction} = this.props;
		emptyGeneralErrorMessagesAction();
		emptyErrorMessagesAction();
		clearBuildConfigNewAction();
	};

	back = () => {
		const {fetchBuildConfigsAction, router} = this.props;
		this.reset();
		fetchBuildConfigsAction('all');
		router.push('/buildconfigs/home');
	};

	save = () => {
		const {setGeneralErrorMessageAction, buildConfigNew, saveBuildConfigAction} = this.props;

		validateNotEmptyOrUndefined(buildConfigNew.environment, 'Environment', setGeneralErrorMessageAction);

		validateNotEmptyOrUndefined(buildConfigNew.username, 'Username', setGeneralErrorMessageAction);

		validateNotEmptyOrUndefined(buildConfigNew.token, 'Token', setGeneralErrorMessageAction);

		validateNotEmptyOrUndefined(buildConfigNew.password, 'Password', setGeneralErrorMessageAction);

		const buildConfig = ({
			environment: buildConfigNew.environment,
			attributes: Object.assign({}, buildConfigNew.attributes, {username: buildConfigNew.username, password: buildConfigNew.password, token: buildConfigNew.token})
		});

		saveBuildConfigAction(buildConfig, this.back);
	};

	render() {
		return (
			<div>
				<div className="page-header"><h1>Adding new build config</h1></div>
				<div id="addBuildConfigContainer" className="container-fluid">
					<div className="row">
						<div className="bd-example">
							<div id="addBuildConfigform">
								<BuildConfigForm />
								<div>
									<button className="btn btn-primary" type="button" onClick={this.save}>Save</button>
									<button className="btn btn-primary" type="button" onClick={this.back}>Back</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>);
	}

}

BuildConfigAdd = withRouter(connect(mapStateToProps, actions)(BuildConfigAdd));

export default BuildConfigAdd;
