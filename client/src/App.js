import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider' // wraps the app component for access to material-ui components
import './App.css'

import TimesheetContainer from './components/TimesheetContainer'

class App extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <MuiThemeProvider>
        <div className='App'>
          <TimesheetContainer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
