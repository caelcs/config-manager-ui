import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import DefaultFieldsErrors from './default_fields_errors';
import CustomFieldsErrors from './custom_fields_errors';
import * as actions from '../actions/index';
import {getBuildConfigNew} from '../reducers/build_config';
import {validateNotEmptyOrUndefined} from '../utils/index';

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

	removeAttribute = (key, e) => {
		e.preventDefault();
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

						<div className="form-group">
							<label htmlFor='environment'>Environment</label>
							<input disabled={!isEnvironmentFieldEditable} type="text" id="environment" className="form-control" value={buildConfigNew.environment} onChange={this.updateDefaultAttribute} />
						</div>
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
									<div className="form-group no-inline" key={key}>
										<label htmlFor={key}>{key}</label>
										<div className="input-group">
											<input type="text" id={key} ref={key} className="form-control" defaultValue={value} onChange={this.updateAttribute}/>
											<span className="input-group-btn">
        								<button className="btn btn-default" type="button" onClick={() => this.removeAttribute(key)}>Remove</button>
      								</span>
										</div>
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

								<CustomFieldsErrors />

								<button className="btn btn-secondary" type="button" onClick={this.update}>Add</button>
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
