import React from 'react';

class ContentContainer extends React.Component {
	render() {
		return (
				<div id="page-content-wrapper">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12">
								{this.props.children}
							</div>
						</div>
					</div>
				</div>
		);
	}
}

export default ContentContainer;
