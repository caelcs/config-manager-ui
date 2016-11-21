import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getGeneralErrorMsg} from '../reducers/error_messages';

const mapStateToProps = (state) => {
	return {
		generalErrors: getGeneralErrorMsg(state)
	}
};

class DefaultFieldsErrors extends React.Component {
    render() {
				const {generalErrors} = this.props;
        return (
        	<div>
						{
							generalErrors.map((value, i) => {
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

DefaultFieldsErrors.propTypes = {
	generalErrors: PropTypes.array.isRequired
};

export default connect(mapStateToProps, null)(DefaultFieldsErrors);
