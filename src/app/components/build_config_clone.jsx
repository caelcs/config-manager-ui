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

class BuildConfigClone extends React.Component {

	componentDidMount() {
		this.reset();
		this.fetchBuildConfig();
		const {setCurrentPageTitle} = this.props;
		setCurrentPageTitle('Clone ' + this.props.env);
	}

	reset = () => {
		const {emptyGeneralErrorMessagesAction, emptyErrorMessagesAction} = this.props;
		emptyGeneralErrorMessagesAction();
		emptyErrorMessagesAction();
	};

	fetchBuildConfig = () => {
		const {env, loadBuildConfigForCloneAction} = this.props;
		loadBuildConfigForCloneAction(env);
	};

	submit = () => {
		const {saveBuildConfigAction, buildConfigNew, setGeneralErrorMessageAction} = this.props;

		validateMandatoryFields(buildConfigNew, setGeneralErrorMessageAction);

		const body = buildConfigRequestBody(buildConfigNew);

		saveBuildConfigAction(body, this.back);
	};

	back = () => {
		this.reset();
		const {router} = this.props;
		router.push('/buildconfigs/home');
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
				<div id="cloneBuildConfigContainer" className="container-fluid">
					<div className="row">
							<div id="cloneBuildConfigform">
								<BuildConfigForm />
								<button className="btn btn-primary" type="button" onClick={this.submit}>Save</button>
								<button className="btn btn-primary" type="button" onClick={this.back}>Back</button>
							</div>
					</div>
				</div>
			</div>
		);
	}
}

BuildConfigClone.propTypes = {
	params: PropTypes.object.isRequired,
	buildConfigNew: PropTypes.object.isRequired,
	env: PropTypes.string.isRequired,
	router: PropTypes.object.isRequired,
};

export default BuildConfigClone = withRouter(connect(mapStateToProps, actions)(BuildConfigClone));
