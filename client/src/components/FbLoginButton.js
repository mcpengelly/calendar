import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class FbLoginButton extends Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<div>
				<RaisedButton
					label="Login with Facebook"
					onClick={this.onFbLoginButtonClick.bind(this)}
				/>
				<RaisedButton
					label="Profile"
					onClick={this.onProfileClick.bind(this)}
				/>
				<RaisedButton
					label="User"
					onClick={this.onUserClick.bind(this)}
				/>
				<a href="http://localhost:3000/login/facebook">login with facebook</a>
				<a href="http://localhost:3000/login">login</a>
			</div>
		);
	}
	onFbLoginButtonClick() {
		fetch('/login/facebook', { mode: 'no-cors' });
	}
	onProfileClick() {
		// window.location.href = '/login/facebook'
		// fetch('http://localhost:5000/login/facebook');
	}
	onUserClick() {
		fetch('/user')
	}
}

export default FbLoginButton;
