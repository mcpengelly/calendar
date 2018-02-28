import React, { Component } from 'react';
import FbLoginButton from './FbLoginButton';

class LoginForm extends Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<div>
				<FbLoginButton />
			</div>
		);
	}
}

export default LoginForm;
