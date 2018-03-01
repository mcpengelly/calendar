import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class FbLoginButton extends Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<div>
				<RaisedButton label="User" onClick={this.onUserClick.bind(this)} />
				<a href="http://localhost:5000/login/facebook">login with facebook</a>
				<a href="/login/facebook">login</a>
			</div>
		);
	}

	onUserClick() {
		fetch('/user');
	}
}

export default FbLoginButton;
