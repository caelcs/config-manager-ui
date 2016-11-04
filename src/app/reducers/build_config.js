import { combineReducers } from 'redux';
import createBuildConfigList, * as fromList from './create_build_config_List';
import oneBuildConfig, * as buildConfigFinder from './get_one_build_config';

const listByFilter = combineReducers({
	all: createBuildConfigList('all')
});

const buildConfigByEnv = combineReducers({
	oneBuildConfig: oneBuildConfig()
});

const buildConfigs = combineReducers({
	listByFilter,
	buildConfigByEnv
});

export default buildConfigs;

export const getAllBuildConfigs = (state, filter) => {
	return fromList.getList(state.buildConfigs.listByFilter[filter]);
};

export const getIsFetchingBuildConfigs = (state, filter) => {
	return fromList.getIsFetching(state.buildConfigs.listByFilter[filter]);
}

export const getOneBuildConfig = (state) => {
	return buildConfigFinder.getOne(state.buildConfigs.buildConfigByEnv.oneBuildConfig);
}

export const isBuildConfigSaved = (state) => {
	return buildConfigFinder.isBuildConfigSaved(state);
}

export const getBuildConfigNew = (state) => {
	return buildConfigFinder.getBuildConfigNew(state.buildConfigs.buildConfigByEnv.oneBuildConfig);
}

