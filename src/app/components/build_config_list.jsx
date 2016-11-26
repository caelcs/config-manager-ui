import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import BuildConfigItem from './build_config_item';
import * as actions from '../actions';
import {getAllBuildConfigs, getIsFetchingBuildConfigs} from '../reducers/build_config';
import {getApiErrorMsg} from '../reducers/error_messages';
import EmptyData from './empty_data';
import LoadingData from './loading_data';

const mapStateToProps = (state) => {
	const filter = 'all';
	return {
		isFetching: getIsFetchingBuildConfigs(state, filter),
		buildConfigs: getAllBuildConfigs(state, filter),
		apiErrors: getApiErrorMsg(state),
		filter
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
				const {isFetching, buildConfigs, apiErrors} = this.props;
				if (isFetching && !apiErrors.length) {
					return (<LoadingData/>)
				}

				if (!isFetching && !buildConfigs.length ) {
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
	filter: PropTypes.oneOf(['all']).isRequired,
	apiErrors: PropTypes.array.isRequired
};

export default connect(mapStateToProps, actions)(BuildConfigList);
