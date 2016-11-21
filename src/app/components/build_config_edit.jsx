import React, {PropTypes} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getBuildConfigNew} from '../reducers/build_config';
import {validateNotEmptyOrUndefined} from '../utils/index';
import BuildConfigAddForm from './build_config_add_form';

const mapStateToProps = (state, params) => {
	const env = params.location.query.environment;
	return {
		currentBuildConfig: getOneBuildConfig(state, env),
		env
	};
};

class BuildConfigEdit extends React.Component {

	back = () => {
		const {emptyGeneralErrorMessagesAction, emptyErrorMessagesAction, clearBuildConfigNewAction, fetchBuildConfigsAction, router} = this.props;
		emptyGeneralErrorMessagesAction();
		emptyErrorMessagesAction();
		clearBuildConfigNewAction();
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
				<div className="page-header"><h1>Editing build config</h1></div>
				<div id="addBuildConfigContainer" className="container-fluid">
					<div className="row">
						<div className="bd-example">
							<div id="addBuildConfigform">
								<BuildConfigAddForm />
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

BuildConfigEdit = withRouter(connect(mapStateToProps, actions)(BuildConfigEdit));

export default BuildConfigEdit;
