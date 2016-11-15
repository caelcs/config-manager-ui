import React, {PropTypes} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getBuildConfigNew} from '../reducers/build_config';
import {getChildErrorMsg, getGeneralErrorMsg} from '../reducers/error_messages';

const mapStateToProps = (state) => {
	console.log(state);
	return {
		buildConfigNew: getBuildConfigNew(state),
		errors: getChildErrorMsg(state),
		generalErrors: getGeneralErrorMsg(state)
	};
};

class BuildConfigAdd extends React.Component {

	name;
	username;
	password;
	token;
	attrName;
	attrValue;

	componentDidMount() {
		const {emptyGeneralErrorMessagesAction, emptyErrorMessagesAction, clearBuildConfigNewAction} = this.props;
		emptyGeneralErrorMessagesAction();
		emptyErrorMessagesAction();
		clearBuildConfigNewAction();
	}

	update = () => {
		const {addAttributeAction, setErrorMessageAction, emptyErrorMessagesAction} = this.props;
		console.log(this.attrName.value);
		console.log(this.attrValue.value);
		if (this.attrName.value === undefined || this.attrName.value === '') {
			this.attrName.value = '';
			setErrorMessageAction('Name can not be null or empty.');
			return;
		}

		const defaultAttrNames = ['username', 'password', 'token', 'name'];
		if (defaultAttrNames.indexOf(this.attrName.value.toLowerCase()) > -1) {
			this.attrName.value = '';
			setErrorMessageAction(this.attrName.value + ' attribute is invalid');
			return;
		}

		if (this.attrValue.value === undefined || this.attrValue.value === '') {
			this.attrValue.value = '';
			setErrorMessageAction('Value can not be null or empty.');
			return;
		}

		addAttributeAction(this.attrName.value, this.attrValue.value);
		emptyErrorMessagesAction();
		this.attrValue.value = '';
		this.attrName.value = '';
	}

	back = () => {
		console.log('back function');
		const {router} = this.props;
		console.log(router);
		router.push('/buildconfigs/home');
	}

	save = () => {
		console.log('starting validation');
		const {setGeneralErrorMessageAction, buildConfigNew, saveBuildConfigAction} = this.props;
		if (this.name.value === undefined || this.name.value === '') {
			setGeneralErrorMessageAction('Name can not be null or empty.');
			return;
		}

		if (this.username.value === undefined || this.username.value === '') {
			setGeneralErrorMessageAction('Username can not be null or empty.');
			return;
		}

		if (this.token.value === undefined || this.token.value === '') {
			setGeneralErrorMessageAction('Token can not be null or empty.');
			return;
		}

		if (this.password.value === undefined || this.password.value === '') {
			setGeneralErrorMessageAction('Password can not be null or empty.');
			return;
		}
		console.log('building new object');
		const buildconfig = ({
			environment: this.name.value,
			attributes: Object.assign({}, buildConfigNew, {username: this.username.value, password: this.password.value, token:this.token.value})
		})

		console.log(buildconfig);

		saveBuildConfigAction(buildconfig, this.back);
	}

	render() {
		const {buildConfigNew, errors, generalErrors} = this.props;
		return (
			<div>
				<div className="page-header"><h1>Adding new build config</h1></div>
				<div id="addBuildConfigContainer" className="container-fluid">
					<div className="row">
						<div className="bd-example">
							<div id="addBuildConfigform">
								<form className="form-inline">
									<div className="card">
										<div className="card-block">
											{
												generalErrors.map((value, i) => {
													return (
														<div className="alert alert-danger" role="alert" key={i}>
															<strong>Error: </strong>{value}
														</div>);
												})
											}
											<div className="form-group">
												<label htmlFor='build_config_name'>Name</label>
												<input type="text" ref={node => { this.name = node; }} className="form-control"/>
											</div>
											<div className="form-group">
												<label htmlFor='build_config_username'>Username</label>
												<input type="text" ref={node => { this.username = node; }} className="form-control"/>
											</div>
											<div className="form-group">
												<label htmlFor='build_config_password'>Password</label>
												<input type="text" ref={node => { this.password = node; }} className="form-control"/>
											</div>
											<div className="form-group">
												<label htmlFor='build_config_token'>Token</label>
												<input type="text" ref={node => { this.token = node; }} className="form-control"/>
											</div>
											{
												Object.entries(buildConfigNew).map(([key, value]) => {
													return (
														<div className="form-group no-inline" key={key}>
															<label htmlFor={key}>{key}</label>
															<input type="text" ref={key} className="form-control" defaultValue={value}/>
														</div>);
												})
											}
										</div>
									</div>
									<div className="input-group">
										<div className="card">
											<div className="card-block">
												<div className="form-group">
													<legend>Please add properties to your build config</legend>
													{
														errors.map((value, i) => {
															return (
																<div className="alert alert-danger" role="alert" key={i}>
																<strong>Error: </strong>{value}
															</div>);
														})
													}

													<button className="btn btn-secondary" type="button" onClick={this.update}>Add</button>
													<input type="text" className="form-control" ref={node => { this.attrName = node; }} placeholder="name"/>
													<input type="text" className="form-control" ref={node => { this.attrValue = node; }} placeholder="value"/>
												</div>
											</div>
										</div>
									</div>
									<div>
										<button className="btn btn-primary" onClick={this.save}>Save</button>
										<button className="btn btn-primary" onClick={this.back}>Back</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>);
	}

}

BuildConfigAdd.propTypes = {
	buildConfigNew: PropTypes.object.isRequired,
	errors: PropTypes.array.isRequired,
	generalErrors: PropTypes.array.isRequired
};

BuildConfigAdd = withRouter(connect(mapStateToProps, actions)(BuildConfigAdd));

export default BuildConfigAdd;
