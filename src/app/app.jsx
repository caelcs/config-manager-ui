import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import MainLayout from './components/main_layout';
import HelpCentreArticles from './components/helpcentre/help_centre_article';
import HelpCentre from './components/helpcentre/help_centre';
import LivechatDemo from './components/helpcentre/livechat-demo';

class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={MainLayout}>
					<IndexRoute component={HelpCentre}/>
					<Route path='/helpcentre' component={HelpCentre} />
					<Route path='/helpcentre/:articleKey' component={HelpCentreArticles} />
					<Route path='/livechat-demo' component={LivechatDemo} />
				</Route>
			</Router>
		);
	}
}

export default App;
