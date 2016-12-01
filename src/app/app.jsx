import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import MainLayout from './components/main_layout';
import BuildConfigContainer from './components/build_config_container';
import BuildConfigClone from './components/build_config_clone';
import BuildConfigAdd from './components/build_config_add';
import BuildConfigEdit from './components/build_config_edit';


const Home = () => <div><h1>Welcome to Config Manager UI</h1></div>;
const CustomSettings = () => <div>Under Construction</div>;

class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={MainLayout}>
					<IndexRoute component={Home}/>
					<Route path='/buildconfigs/home' component={BuildConfigContainer} />
					<Route path='/buildconfigs/clone' component={BuildConfigClone} />
					<Route path='/buildconfigs/add' component={BuildConfigAdd} />
					<Route path='/buildconfigs/edit' component={BuildConfigEdit} />

					<Route path='/customsettings' component={CustomSettings}/>
				</Route>
			</Router>
		);
	}
}

export default App;
