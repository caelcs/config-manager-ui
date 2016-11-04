import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/global.css';

import React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import { Provider } from 'react-redux';
import configureStore from './app/reducers/index';

let configManagerStore = configureStore();

console.log(configManagerStore.getState());
render(
	<Provider store={configManagerStore}>
		<App />
	</Provider>,
	document.getElementById('wrapper')
);

