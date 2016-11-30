import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router';
import BuildConfigList from './build_config_list';

class BuildConfigContainer extends React.Component {

	render() {
		return (
				<div>
					<div className="page-header">
						<h1>Build Config List</h1>
					</div>
					<div className="container-fluid">
						<nav className="navbar navbar-light bg-faded">
							<div className="nav navbar-nav">
								<Link to='/buildconfigs/add' className='nav-item btn btn-primary' role='button'>Add Build Config</Link>
							</div>
						</nav>
					</div>
					<div id="buildConfigContainer" className="container-fluid  separate-top">
						<BuildConfigList />
					</div>
				</div>
		)
	}
}

BuildConfigContainer = withRouter(BuildConfigContainer);

export default BuildConfigContainer;
