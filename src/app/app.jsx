import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import MainLayout from './components/main_layout';
import BuildConfigContainer from './components/build_config_container';
import BuildConfigClone from './components/build_config_clone';
import BuildConfigAdd from './components/build_config_add';
import BuildConfigEdit from './components/build_config_edit';
import HelpCentre from './components/helpcentre/help_centre';

const Home = () => <div><h1>Welcome to Config Manager UI</h1></div>;

class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={MainLayout}>
					<IndexRoute component={BuildConfigContainer}/>
					<Route path='/buildconfigs/home' component={BuildConfigContainer} />
					<Route path='/buildconfigs/clone' component={BuildConfigClone} />
					<Route path='/buildconfigs/add' component={BuildConfigAdd} />
					<Route path='/buildconfigs/edit' component={BuildConfigEdit} />
					<Route path='/helpcentre' component={HelpCentre} />
				</Route>
			</Router>
		);
	}
}

export default App;
