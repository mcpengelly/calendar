import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import moment from 'moment'

// a "smart" component that has state
//  state: {
//      timesheets: a list of timesheets returned from the backend which is passed down to the "dumb" render component TimesheetList
//      hours: a stirng representing the amount of hours worked
//      day: a string representing the date of the timesheet entered to be sent to backend
//  }
class TimesheetForm extends Component {
  constructor (props) {
    super(props)

    this.idCounter = 1
    this.state = {
      day: null,
      hours: ''
    }

    this.onHoursChange = this.onHoursChange.bind(this)
    this.onDayChange = this.onDayChange.bind(this)
    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  render () {
    return (
      <div
        style={{
          width: '50%',
          margin: 'auto',
          border: '1px solid blue'
        }}
      >
        <TextField
          id='hourInput'
          value={this.state.hours}
          label='hours'
          onChange={this.onHoursChange}
        />
        <DatePicker
          id='dayInput'
          hintText='day'
          onChange={this.onDayChange}
          container='inline'
        />
        <RaisedButton label='submit' onClick={this.onSubmitClick} />
      </div>
    )
  }

  // change handlers
  onHoursChange (e) {
    this.setState({ hours: e.currentTarget.value })
  }

  onDayChange (e, date) {
    this.setState({ day: date })
  }

  onSubmitClick (e) {
    if (!this.state.day || !this.state.hours) {
      console.log('missing input fields')
      return
    }
    // todo: access state for day and hours and send POST request to '/timesheets'
    const sheet = {
      id: this.idCounter++,
      hours: parseFloat(this.state.hours),
      formatted_day: moment(this.state.day).format('YYYY/MM/DD'),
      day: this.state.day
    }

    // lift state up
    this.props.createTimesheet(sheet)
    this.resetInputs()
  }
  resetInputs () {
    this.setState({
      hours: ''
    })
  }
}

export default TimesheetForm
