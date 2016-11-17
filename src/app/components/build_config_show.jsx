import React, {PropTypes} from 'react';

class BuildConfigShow extends React.Component {
    render() {
				const {username, password, token, disabled = true} = this.props;
        return (<form disabled={disabled}>
					<div className="form-group">
						<legend className="col-sm-10">Username</legend>
						<input type="text" className="form-control" defaultValue={username}/>
					</div>
					<div className="form-group">
						<legend className="col-sm-10">Password</legend>
						<input type="text" className="form-control" defaultValue={password}/>
					</div>
					<div className="form-group">
						<legend className="col-sm-10">Token</legend>
						<input type="text" className="form-control" defaultValue={token}/>
					</div>
				</form>);
    }
}

BuildConfigShow.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	disabled: PropTypes.bool
};


export default BuildConfigShow;
