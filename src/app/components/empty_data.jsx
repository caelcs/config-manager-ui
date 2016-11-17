import React from 'react';

class EmptyData extends React.Component {
    render() {
        return (<div className="row">
					<div className="bd-example">
						<div className="alert alert-warning" role="alert">No data available</div>
					</div>
				</div>);
    }
}

export default EmptyData;
