import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // wraps the app component for access to material-ui components
import './App.css';

import TimesheetForm from './components/TimesheetForm';
import LoginForm from './components/LoginForm';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<p className="App-intro" />

					<LoginForm />
					<TimesheetForm />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
