import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import BuildConfigItem from './build_config_item';
import * as actions from '../actions';
import {getAllBuildConfigs, getIsFetchingBuildConfigs} from '../reducers/build_config';
import EmptyData from './empty_data';
import LoadingData from './loading_data';

const mapStateToProps = (state) => {
	const filter = 'all';
	return {
		isFetching: getIsFetchingBuildConfigs(state, filter),
		buildConfigs: getAllBuildConfigs(state, filter),
		filter,
	};
};

class BuildConfigList extends React.Component {

		componentDidMount() {
			this.fetchData();
		}

		componentDidUpdate(prevProps) {
			if (this.props.filter !== prevProps.filter) {
				this.fetchData();
			}
		}

		fetchData = () => {
			const {filter, fetchBuildConfigsAction} = this.props;
			fetchBuildConfigsAction(filter);
		};

    render() {
				const {isFetching, buildConfigs} = this.props;
				if (isFetching) {
					return (<LoadingData/>)
				}

				if (!isFetching && buildConfigs.length == 0 ) {
					return (<EmptyData/>)
				}

        return (
					<div className="row">
						<div className="bd-example">
							{buildConfigs.map((buildConfig, i) => {
								return <BuildConfigItem key={i} {...buildConfig}/>;
							})}
						</div>
				</div>);
    }
}

BuildConfigList.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	buildConfigs: PropTypes.array.isRequired,
	filter: PropTypes.oneOf(['all']).isRequired
};

export default connect(mapStateToProps, actions)(BuildConfigList);
