import React, {PropTypes} from 'react';
import {mapObject} from '../utils';

class DynamicInputFields extends React.Component {
    render() {
				const {fields} = this.props;
        return (
        	<div>
					{
						mapObject(fields, (key, value) => {
							return <div className="form-group" key={key}>
								<label htmlFor={key}>{key}</label>
								<input type="text" ref={key} className="form-control" defaultValue={value}/>
							</div>
						})
					}
					</div>
				);
    }
}

DynamicInputFields.propTypes = {
	fields: PropTypes.object.isRequired
};

export default DynamicInputFields;
