import React from 'react';
import ContentContainer from './content_container';
import SideBar from './side_bar';

class MainLayout extends React.Component {
	render() {
		return (
			<div>
				<SideBar />
				<ContentContainer children={this.props.children}/>
			</div>
		);
	}
}

export default MainLayout;

