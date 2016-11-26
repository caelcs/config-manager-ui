import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as actions from '../actions'
import {connect} from 'react-redux';
import BuildConfigShow from './build_config_show';

class BuildConfigItem extends React.Component {

	deleteBuildConfig = () => {
		const {environment, deleteBuildConfigAction, fetchBuildConfigsAction} = this.props;
		deleteBuildConfigAction(environment, fetchBuildConfigsAction);
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
						<BuildConfigShow username={attributes.username} password={attributes.password} token={attributes.token} />
					</div>

					<div className="card-footer text-muted">
						<Link className="btn btn-primary" to={{pathname: '/buildconfigs/clone', query: {environment: environment}}}>
							Clone
						</Link>
						<Link className="btn btn-primary" to={{pathname: '/buildconfigs/edit', query: {environment: environment}}}>
							Edit
						</Link>
						<button className="btn btn-danger" type="button" onClick={this.deleteBuildConfig}>
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
