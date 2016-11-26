import React, {PropTypes} from 'react';

class CustomAttributeInput extends React.Component {
    render() {
				const {name, value, updateAttribute, removeAttribute} = this.props;
        return (
					<div className="form-group no-inline" key={name}>
						<label htmlFor={name}>{name}</label>
						<div className="input-group">
							<input type="text" id={name} ref={name} className="form-control" defaultValue={value} onChange={updateAttribute}/>
							<span className="input-group-btn">
        				<button className="btn btn-default" type="button" onClick={removeAttribute(name)}>Remove</button>
							</span>
						</div>
					</div>
				);
    }
}

CustomAttributeInput.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	updateAttribute: PropTypes.func.isRequired,
	removeAttribute: PropTypes.func.isRequired
};

export default CustomAttributeInput;
