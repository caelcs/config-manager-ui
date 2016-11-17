import React, {PropTypes} from 'react';
import DynamicInputFields from './dynamic_input_fields';

class BuildConfigForm extends React.Component {
    render() {
				const {attributes, name = ''} = this.props;
        return (<form className="form">
					<div className="card">
						<div className="card-block">
							<DynamicInputFields fields={attributes} />
							<div className="form-group">
								<label htmlFor='build_config_name'>Name</label>
								<input type="text" ref="build_config_name" className="form-control" defaultValue={name}/>
							</div>
						</div>
					</div>
				</form>);
    }
}

BuildConfigForm.propTypes = {
	attributes: PropTypes.object.isRequired,
	name: PropTypes.string
};

export default BuildConfigForm;
