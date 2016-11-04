import { createStore, applyMiddleware, combineReducers } from 'redux';
import buildConfigs from './build_config';
import errors from './error_messages';
import apiConfig from './api_config';
import thunk from 'redux-thunk';

const configStoreData = combineReducers({
	buildConfigs,
	apiConfig,
	errors
});

const configureStore = () => {
	const middlewares = [thunk];
	return createStore(
		configStoreData,
		applyMiddleware(...middlewares)
	);
};

export default configureStore;
