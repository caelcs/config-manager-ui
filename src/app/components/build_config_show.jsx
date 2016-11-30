import React, {PropTypes} from 'react';

class BuildConfigShow extends React.Component {
    render() {
				const {username, password, token} = this.props;
        return (<form disabled>
					<div className="form-group">
						<label htmlFor="show_username_input">Username</label>
						<input id="show_username_input" type="text" className="form-control" defaultValue={username}/>
					</div>
					<div className="form-group">
						<label htmlFor="show_password_input">Password</label>
						<input id="show_password_input" type="text" className="form-control" defaultValue={password}/>
					</div>
					<div className="form-group">
						<label htmlFor="show_token_input">Token</label>
						<input id="show_token_input" type="text" className="form-control" defaultValue={token}/>
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
