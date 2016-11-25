import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {getBuildConfigNew} from '../reducers/build_config';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import BuildConfigForm from './build_config_form';
import LoadingData from './loading_data';
import {validateMandatoryFields, buildConfigRequestBody} from '../utils/index';

const mapStateToProps = (state, params) => {
	const env = params.location.query.environment;
	return {
		buildConfigNew: getBuildConfigNew(state),
		env,
	};
};

class BuildConfigEdit extends React.Component {

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
		const {env, updateBuildConfigAction, buildConfigNew, setGeneralErrorMessageAction} = this.props;
		validateMandatoryFields(buildConfigNew, setGeneralErrorMessageAction);

		const body = buildConfigRequestBody(buildConfigNew);

		updateBuildConfigAction(env, body, this.back);
	};

	back = () => {
		this.reset();
		const {router} = this.props;
		router.push('/buildconfigs/home');
	};

	render(){
		const {env, buildConfigNew} = this.props;
		if (buildConfigNew.attributes === undefined) {
			return (<div id="editBuildConfigContainer" className="container-fluid">
				<LoadingData />
			</div>);
		}
		return (
			<div>
				<div className="page-header">
					<h1>Editing environment: {env}</h1>
				</div>
				<div id="editBuildConfigContainer" className="container-fluid">
					<div className="row">
						<div className="bd-example">
							<div id="editBuildConfigform">
								<BuildConfigForm isEnvironmentFieldEditable="false" />
								<button className="btn btn-primary" type="button" onClick={this.submit}>Save</button>
								<button className="btn btn-primary" type="button" onClick={this.back}>Back</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

BuildConfigEdit.propTypes = {
	params: PropTypes.object.isRequired,
	buildConfigNew: PropTypes.object.isRequired,
	env: PropTypes.string.isRequired,
	router: PropTypes.object.isRequired,
};

export default BuildConfigEdit = withRouter(connect(mapStateToProps, actions)(BuildConfigEdit));
