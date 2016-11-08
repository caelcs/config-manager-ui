import React from 'react';
import {getApiErrorMsg} from '../reducers/error_messages';
import * as actions from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return ({
		apiErrors: getApiErrorMsg(state)
	});
};

class ContentContainer extends React.Component {
	render() {
		const {apiErrors} = this.props;
		return (
				<div id="page-content-wrapper">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12">
								{
									apiErrors.map((value, i) => {
										return (
											<div className="alert alert-danger" role="alert" key={i}>
												<strong>Error: </strong>{value}
											</div>);
									})
								}
								{this.props.children}
							</div>
						</div>
					</div>
				</div>
		);
	}
}

export default connect(mapStateToProps, actions)(ContentContainer);
