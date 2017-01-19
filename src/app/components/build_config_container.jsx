import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import BuildConfigList from './build_config_list';
import * as actions from '../actions';

class BuildConfigContainer extends React.Component {

	componentDidMount() {
		const {setCurrentPageTitle} = this.props;
		setCurrentPageTitle('Build Config List');
	}

	render() {
		return (
				<div>
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

export default BuildConfigContainer = withRouter(connect(null, actions)(BuildConfigContainer));
