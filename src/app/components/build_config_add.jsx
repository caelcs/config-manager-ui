import React, {PropTypes} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getBuildConfigNew} from '../reducers/build_config';
import {getErrorMessages} from '../reducers/error_messages';

const mapStateToProps = (state) => {
	console.log(state);
	return {
		buildConfigNew: getBuildConfigNew(state),
		errors: getErrorMessages(state),
	};
};

class BuildConfigAdd extends React.Component {

	name;
	attrName;
	attrValue;

	update = () => {
		const {addAttributeAction, setErrorMessageAction, emptyErrorMessagesAction} = this.props;
		console.log(this.attrName.value);
		console.log(this.attrValue.value);
		if (this.attrName.value === undefined || this.attrName.value === '') {
			this.attrName.value = '';
			setErrorMessageAction('Name can not be null or empty.');
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
		const {router, clearBuildConfigNewAction} = this.props;
		clearBuildConfigNewAction();
		router.push('/buildconfigs/home');
	}

	save = () => {
		const {setErrorMessageAction, buildConfigNew, saveBuildConfigAction} = this.props;
		if (this.name === undefined || this.name === '') {
			setErrorMessageAction('Name can not be null or empty.');
			return;
		}

		const buildconfig = ({
			environment: this.name.value,
			attributes: buildConfigNew
		})

		console.log(buildconfig)

		saveBuildConfigAction(buildconfig, this.back);
	}

	render() {
		const {buildConfigNew} = this.props;
		const {errors} = this.props;
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
											<div className="form-group">
												<label htmlFor='build_config_name'>Name</label>
												<input type="text" ref={node => { this.name = node; }} className="form-control"/>
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
										<button className="btn btn-primary" onClick={this.save}> Save</button>
										<button className="btn btn-primary" onClick={this.back}> Back</button>
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
	errors: PropTypes.array.isRequired
};

BuildConfigAdd = withRouter(connect(mapStateToProps, actions)(BuildConfigAdd));

export default BuildConfigAdd;
