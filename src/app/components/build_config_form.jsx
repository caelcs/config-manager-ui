import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import DefaultFieldsErrors from './default_fields_errors';
import CustomFieldsErrors from './custom_fields_errors';
import * as actions from '../actions/index';
import {getBuildConfigNew} from '../reducers/build_config';
import {validateNotEmptyOrUndefined} from '../utils/index';
import CustomAttributeInput from './build_config_custom_attribute_input';

const mapStateToProps = (state) => {
	return {
		buildConfigNew: getBuildConfigNew(state)
	};
};

class BuildConfigForm extends React.Component {

	attrName;
	attrValue;

	constructor(props) {
		super(props);
		this.updateDefaultAttribute = this.updateDefaultAttribute.bind(this);
		this.updateAttribute = this.updateAttribute.bind(this);
		this.removeAttribute = this.removeAttribute.bind(this);
	}

	update = () => {
		const {addAttributeAction, setErrorMessageAction, emptyErrorMessagesAction} = this.props;
		validateNotEmptyOrUndefined(this.attrName.value, 'Name', setErrorMessageAction);

		const defaultAttrNames = ['username', 'password', 'token', 'environment'];
		if (defaultAttrNames.indexOf(this.attrName.value.toLowerCase()) > -1) {
			this.attrName.value = '';
			setErrorMessageAction(this.attrName.value + ' attribute is invalid');
			throw new Error(this.attrName.value + ' attribute is invalid');
		}

		validateNotEmptyOrUndefined(this.attrValue.value, 'Value', setErrorMessageAction);

		addAttributeAction(this.attrName.value, this.attrValue.value);
		emptyErrorMessagesAction();
		this.attrValue.value = '';
		this.attrName.value = '';
	};

	updateDefaultAttribute = (event) => {
		const {addDefaultAttributeAction} = this.props;
		addDefaultAttributeAction(event.target.id, event.target.value);
	};

	updateAttribute = (event) => {
		const {addAttributeAction} = this.props;
		addAttributeAction(event.target.id, event.target.value);
	};

	removeAttribute = (key) => (event) => {
		const {removeAttributeAction} = this.props;
		removeAttributeAction(key);
	};

	render() {
		const {buildConfigNew, isEnvironmentFieldEditable = true} = this.props;
		return (
			<form className="form-inline">
				<div className="card">
					<div className="card-block">

						<DefaultFieldsErrors />

						{isEnvironmentFieldEditable &&
							<div className="form-group">
								<label className="col-form-label" htmlFor='environment'>Environment</label>
								<input type="text" id="environment" className="form-control" value={buildConfigNew.environment} onChange={this.updateDefaultAttribute} />
							</div>
						}
						<div className="form-group">
							<label htmlFor='username'>Username</label>
							<input type="text" id="username" className="form-control" value={buildConfigNew.username} onChange={this.updateDefaultAttribute}/>
						</div>
						<div className="form-group">
							<label htmlFor='password'>Password</label>
							<input type="text" id="password" className="form-control" value={buildConfigNew.password} onChange={this.updateDefaultAttribute}/>
						</div>
						<div className="form-group">
							<label htmlFor='token'>Token</label>
							<input type="text" id="token" className="form-control" value={buildConfigNew.token} onChange={this.updateDefaultAttribute}/>
						</div>
						{
							Object.entries(buildConfigNew.attributes).map(([key, value]) => {
								return (
									<CustomAttributeInput key={key} name={key} value={value} removeAttribute={this.removeAttribute} updateAttribute={this.updateAttribute} />
								);
							})
						}
					</div>
				</div>
				<div className="input-group">
					<div className="card">
						<div className="card-header">
							<legend>Please add properties to your build config</legend>
						</div>
						<div className="card-block">
							<div className="form-group">
								<CustomFieldsErrors />

								<button className="btn btn-primary" type="button" onClick={this.update}>
									<span className="fa fa-plus" aria-hidden="true"></span>
								</button>
								<input type="text" className="form-control" ref={node => { this.attrName = node; }} placeholder="name"/>
								<input type="text" className="form-control" ref={node => { this.attrValue = node; }} placeholder="value"/>
							</div>
						</div>
					</div>
				</div>
			</form>
		)
	}
}

export default connect(mapStateToProps, actions)(BuildConfigForm);
