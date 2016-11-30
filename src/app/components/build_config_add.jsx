import React, {PropTypes} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getBuildConfigNew} from '../reducers/build_config';
import {validateMandatoryFields, buildConfigRequestBody} from '../utils/index';
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

		validateMandatoryFields(buildConfigNew, setGeneralErrorMessageAction);

		const buildConfig = buildConfigRequestBody(buildConfigNew);

		saveBuildConfigAction(buildConfig, this.back);
	};

	render() {
		return (
			<div>
				<div className="page-header"><h1>Adding new build config</h1></div>
				<div id="addBuildConfigContainer" className="container-fluid">
					<div className="row">
							<div id="addBuildConfigform">
								<BuildConfigForm />
								<div>
									<button className="btn btn-primary" type="button" onClick={this.save}>Save</button>
									<button className="btn btn-primary" type="button" onClick={this.back}>Back</button>
								</div>
							</div>
					</div>
				</div>
			</div>);
	}

}

BuildConfigAdd = withRouter(connect(mapStateToProps, actions)(BuildConfigAdd));

export default BuildConfigAdd;
