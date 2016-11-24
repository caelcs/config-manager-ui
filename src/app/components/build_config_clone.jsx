import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {getBuildConfigNew} from '../reducers/build_config';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import BuildConfigForm from './build_config_form';
import LoadingData from './loading_data';
import {validateNotEmptyOrUndefined} from '../utils/index';

const mapStateToProps = (state, params) => {
	const env = params.location.query.environment;
	return {
		buildConfigNew: getBuildConfigNew(state, env),
		env,
	};
};

class CloneBuildConfig extends React.Component {

	componentDidMount() {
		this.reset();
		this.fetchBuildConfig();
	}

	reset = () => {
		const {emptyGeneralErrorMessagesAction, emptyErrorMessagesAction} = this.props;
		emptyGeneralErrorMessagesAction();
		emptyErrorMessagesAction();
	};

	fetchBuildConfig = () => {
		const {env, loadBuildConfigForEditAction} = this.props;
		loadBuildConfigForEditAction(env);
	};

	submit = () => {
		const {saveBuildConfigAction, buildConfigNew, setGeneralErrorMessageAction} = this.props;

		validateNotEmptyOrUndefined(buildConfigNew.environment, 'Environment', setGeneralErrorMessageAction);
		const body = this.buildRequestBody(buildConfigNew);
		saveBuildConfigAction(body, this.redirectToHome);
	};

	redirectToHome = () => {
		this.reset();
		const {router} = this.props;
		router.push('/buildconfigs/home');
	};

	buildRequestBody = (buildConfigNew) => {
		return ({
			environment: buildConfigNew.environment,
			attributes: Object.assign({}, buildConfigNew.attributes, {username: buildConfigNew.username, password: buildConfigNew.password, token: buildConfigNew.token})
		});
	};

	render(){
		const {env, buildConfigNew} = this.props;
		if (buildConfigNew.attributes === undefined) {
			return (<div id="cloneBuildConfigContainer" className="container-fluid">
				<LoadingData />
			</div>);
		}
		return (
			<div>
				<div className="page-header">
					<h1>Clone {env}</h1>
				</div>
				<div id="cloneBuildConfigContainer" className="container-fluid">
					<div className="row">
						<div className="bd-example">
							<div id="cloneBuildConfigform">
								<BuildConfigForm />
								<button className="btn btn-primary" type="button" onClick={this.submit}>Save</button>
								<button className="btn btn-primary" type="button" onClick={this.redirectToHome}>Back</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CloneBuildConfig.propTypes = {
	params: PropTypes.object.isRequired,
	buildConfigNew: PropTypes.object.isRequired,
	env: PropTypes.string.isRequired,
	router: PropTypes.object.isRequired,
};

export default CloneBuildConfig = withRouter(connect(mapStateToProps, actions)(CloneBuildConfig));
