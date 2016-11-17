import React, {Component, PropTypes} from 'react';
import BuildConfigItem from './build_config_item';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {withRouter} from 'react-router';
import {getAllBuildConfigs, getIsFetchingBuildConfigs} from '../reducers/build_config';

const mapStateToProps = (state) => {
	const filter = 'all';
	return {
		isFetching: getIsFetchingBuildConfigs(state, filter),
		buildConfigs: getAllBuildConfigs(state, filter),
		filter,
	};
};

class BuildConfigContainer extends Component {

	componentDidMount() {
		console.log('list of Builds Did Mount');
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
		console.log('list of Builds Did update');
		console.log('')
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}

	render() {
		const {isFetching, buildConfigs} = this.props;

		if (isFetching && !buildConfigs.length) {
			return <div><div className="page-header">
				<h1>Build Config List</h1>
			</div>
			<div className="btn-group" role="group">
				<Link to='/buildconfigs/add' className='btn btn-primary' role='button'>Add Build Config</Link>
			</div>
			</div>
		}

		return (<div>
				<div className="page-header">
					<h1>Build Config List</h1>
				</div>
				<div className="btn-group" role="group">
					<Link to='/buildconfigs/add' className='btn btn-primary' role='button'>Add Build Config</Link>
				</div>
				<div id="buildConfigContainer" className="container-fluid">
					<div className="row">
						<div className="bd-example">
							{buildConfigs.map((buildConfig, i) => {
								return <BuildConfigItem key={i} {...buildConfig}/>;
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}

	fetchData = () => {
		const {filter, fetchBuildConfigsAction} = this.props;
		fetchBuildConfigsAction(filter);
	}
}

BuildConfigContainer.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	buildConfigs: PropTypes.array.isRequired,
	filter: PropTypes.oneOf(['all']).isRequired
};


BuildConfigContainer = withRouter(connect(mapStateToProps, actions)(BuildConfigContainer));

export default BuildConfigContainer;
