import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {getAllBuildConfigs} from '../../reducers/build_config';
import BuildConfigItemSelectable from './build_config_item_selectable';

const mapStateToProps = (state) => {
		return ({
			buildConfigs: getAllBuildConfigs(state, 'all')
		});
};

class BuildConfigListSelect extends React.Component {
		componentDidMount() {
			this.fetchBuildConfigs();
		}

		fetchBuildConfigs = () => {
			const {fetchBuildConfigsAction} = this.props;
			fetchBuildConfigsAction('all');
		};

    render() {
    		const {buildConfigs} = this.props;
        return (
					<div className="row" id="build-config-items-selectable">
						{buildConfigs.map((buildConfig, i) => {
							return <BuildConfigItemSelectable key={i} environment={buildConfig.environment}/>;
						})}
					</div>
        );
    }
}

export default connect(mapStateToProps, actions)(BuildConfigListSelect);
