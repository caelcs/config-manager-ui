import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import MainLayout from './components/main_layout';
import BuildConfigContainer from './components/build_config_container';
import CloneBuildConfig from './components/build_config_clone';
import BuildConfigAdd from './components/build_config_add';


const Home = () => <div><h1>Welcome to Config Manager UI</h1></div>;
const CustomSettings = () => <div>CustomSettings</div>;

class App extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path='/' component={MainLayout}>
					<IndexRoute component={Home}/>
					<Route path='/buildconfigs/home' component={BuildConfigContainer} />
					<Route path='/buildconfigs/clone' component={CloneBuildConfig} />
					<Route path='/buildconfigs/add' component={BuildConfigAdd} />
					<Route path='/customsettings' component={CustomSettings}/>
				</Route>
			</Router>
		);
	}
}

export default App;
