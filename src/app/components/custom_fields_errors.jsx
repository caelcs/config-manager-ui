import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getChildErrorMsg} from '../reducers/error_messages';

const mapStateToProps = (state) => {
	return {
		errors: getChildErrorMsg(state)
	}
};

class CustomFieldsErrors extends React.Component {
    render() {
				const {errors} = this.props;
        return (
        	<div>
						{
							errors.map((value, i) => {
								return (
									<div className="alert alert-danger" role="alert" key={i}>
										<strong>Error: </strong>{value}
									</div>);
							})
						}
					</div>
				)
    }
}

export default connect(mapStateToProps, null)(CustomFieldsErrors);
