import React from 'react';
import HomeBody from './home_body';

class CustomSettingsHome extends React.Component {
    render() {
        return (
            <div data-spy="scroll" data-target="#build-config-items-selectable">
							<div className="page-header">
								<h1>Custom Settings</h1>
							</div>
							<div id="buildConfigContainer" className="container-fluid  separate-top">
								<HomeBody/>
							</div>
            </div>
        );
    }
}

export default CustomSettingsHome;
