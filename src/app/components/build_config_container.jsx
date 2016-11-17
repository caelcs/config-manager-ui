import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router';
import BuildConfigList from './build_config_list';

class BuildConfigContainer extends React.Component {

	render() {
		return (<div>
				<div className="page-header">
					<h1>Build Config List</h1>
				</div>
				<div className="btn-group" role="group">
					<Link to='/buildconfigs/add' className='btn btn-primary' role='button'>Add Build Config</Link>
				</div>
				<div id="buildConfigContainer" className="container-fluid">
					<BuildConfigList />
				</div>
			</div>
		)
	}
}

BuildConfigContainer = withRouter(BuildConfigContainer);

export default BuildConfigContainer;
