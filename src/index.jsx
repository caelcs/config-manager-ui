import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-flex.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/global.css';
import '@nowtv/nowtv-web-navigation/dist/fonts.css';
import '@nowtv/nowtv-web-navigation/dist/global-navigation.css';
import '@nowtv/nowtv-web-toolkit/dist/fonts.css';
import '@nowtv/nowtv-web-toolkit/dist/styleguide.css';

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
	document.getElementById('contentBody')
);

