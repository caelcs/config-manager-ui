import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {getOneBuildConfig} from '../reducers/build_config';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import ReactDOM from 'react-dom';
import {mapObject} from '../utils'

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
	}

	submit = () => {
		const {saveBuildConfigAction} = this.props;
		const body = this.buildRequestBody();
		saveBuildConfigAction(body, this.redirectToHome);
	}

	redirectToHome = () => {
		const {router} = this.props;
		router.push('/buildconfigs/home');
	}

	buildRequestBody = () => {
		const {currentBuildConfig} = this.props;
		let attributes = new Object();
		for(let key of Object.keys(currentBuildConfig.attributes)) {
			attributes[key] = ReactDOM.findDOMNode(this.refs[key]).value;
		}
		return {
			environment: ReactDOM.findDOMNode(this.refs.build_config_name).value,
			attributes: attributes
		}
	}

	render(){
		const {env, currentBuildConfig} = this.props;
		return (
			<div>
				<div className="page-header">
					<h1>Clone {env}</h1>
				</div>
				<div id="cloneBuildConfigContainer" className="container-fluid">
					<div className="row">
						<div className="bd-example">
							<div id="cloneBuildConfigform">
								<form className="form" onSubmit={this.submit}>
									<div className="card">
										<div className="card-block">
										{
											mapObject(currentBuildConfig.attributes, (key, value) => {
												return <div className="form-group" key={key}>
													<label htmlFor={key}>{key}</label>
													<input type="text" ref={key} className="form-control" defaultValue={value}/>
												</div>
											})
										}
										<div className="form-group">
											<label htmlFor='build_config_name'>Name</label>
											<input type="text" ref="build_config_name" className="form-control"/>
										</div>
									</div>
									</div>
									<button className="btn btn-primary" type="submit">
										Save
									</button>
									<Link to='/buildconfigs/home' className='btn btn-primary' role='button'>Back</Link>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

CloneBuildConfig.propTypes = {
	params: PropTypes.object.isRequired,
	currentBuildConfig: PropTypes.object.isRequired,
	env: PropTypes.string.isRequired,
	router: PropTypes.object.isRequired,
};

export default CloneBuildConfig = withRouter(connect(mapStateToProps, actions)(CloneBuildConfig));
