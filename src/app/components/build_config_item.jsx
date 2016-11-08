import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as actions from '../actions'
import {connect} from 'react-redux';

class BuildConfigItem extends React.Component {

	deleteBuildConfig = () => {
		const {environment, deleteBuildConfigAction} = this.props;
		deleteBuildConfigAction(environment);
	};

	render() {
		const {environment, attributes} = this.props;
		return (
			<div className="col-lg-6">
				<div className="card">
					<div className="card-header">
						<div className="col-md-4">
							<img className="card-img"
									 src="https://c2.sfdcstatic.com/content/dam/web/en_is/www/images/logo/logo-company.png" alt="lolo"/>
						</div>
						<div className="col-md-6">
							<h4 className="card-title">{environment}</h4>
						</div>
					</div>
					<div className="container">
						<form>
							<div className="form-group">
								<legend className="col-sm-10">Username</legend>
								<input type="text" className="form-control" defaultValue={attributes.username}/>
							</div>
							<div className="form-group">
								<legend className="col-sm-10">Password</legend>
								<input type="text" className="form-control" defaultValue={attributes.password}/>
							</div>
							<div className="form-group">
								<legend className="col-sm-10">Token</legend>
								<input type="text" className="form-control" defaultValue={attributes.token}/>
							</div>
						</form>
					</div>

					<div className="card-footer text-muted">
						<Link className="btn btn-primary" to={{pathname: '/buildconfigs/clone', query: {environment: environment}}}>
							Clone
						</Link>
						<button className="btn btn-primary" onClick={this.deleteBuildConfig}>
							Delete
						</button>
					</div>

				</div>
			</div>
		);
	}
}

BuildConfigItem.propTypes = {
	environment: PropTypes.string.isRequired,
	attributes: PropTypes.object.isRequired
}

export default connect(null, actions)(BuildConfigItem);
