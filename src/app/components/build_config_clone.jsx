import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {getOneBuildConfig} from '../reducers/build_config';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import ReactDOM from 'react-dom';
import BuildConfigForm from './build_config_form';
import LoadingData from './loading_data';

const mapStateToProps = (state, params) => {
	const env = params.location.query.environment;
	return {
		currentBuildConfig: getOneBuildConfig(state, env),
		env,
	};
};

class CloneBuildConfig extends React.Component {

	componentDidMount() {
		this.fetchBuildConfig();
	}

	fetchBuildConfig = () => {
		const {env, getBuildConfigAction} = this.props;
		getBuildConfigAction(env);
	};

	submit = () => {
		const {saveBuildConfigAction} = this.props;
		const body = this.buildRequestBody();
		saveBuildConfigAction(body, this.redirectToHome);
	};

	redirectToHome = () => {
		const {router} = this.props;
		router.push('/buildconfigs/home');
	};

	buildRequestBody = () => {
		const {currentBuildConfig} = this.props;
		let attributes = new Object();
		for(let key of Object.keys(currentBuildConfig.attributes)) {
			attributes[key] = ReactDOM.findDOMNode(this.refs.buildConfigCloneForm.refs.inputFields.refs[key]).value;
		}
		return {
			environment: ReactDOM.findDOMNode(this.refs.buildConfigCloneForm.refs.build_config_name).value,
			attributes: attributes
		}
	};

	render(){
		const {env, currentBuildConfig} = this.props;
		if (currentBuildConfig.attributes === undefined) {
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
								<BuildConfigForm ref="buildConfigCloneForm" attributes={currentBuildConfig.attributes} />
								<button className="btn btn-primary" type="button" onClick={this.submit}>Save</button>
								<Link to='/buildconfigs/home' className='btn btn-primary' role='button'>Back</Link>
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
	currentBuildConfig: PropTypes.object.isRequired,
	env: PropTypes.string.isRequired,
	router: PropTypes.object.isRequired,
};

export default CloneBuildConfig = withRouter(connect(mapStateToProps, actions)(CloneBuildConfig));
