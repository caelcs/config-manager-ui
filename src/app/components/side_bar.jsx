import React from 'react';
import {Link} from 'react-router';

class SideBar extends React.Component {
	render() {
		return (
			<div id="sidebar-wrapper">
				<ul className="sidebar-nav">
					<li className="sidebar-brand">
						<a href="#">
							NOWTV CRM
						</a>
					</li>
					<li>
						<Link activeClassName='linkActive' to='/'>Home</Link>
					</li>
					<li>
						<Link activeClassName='linkActive' to='/buildconfigs/home'>Build Configs</Link>
					</li>
					<li>
						<Link activeClassName='linkActive' to='/customsettings'>Custom Settings</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default SideBar;
