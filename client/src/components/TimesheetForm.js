import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import moment from 'moment'

import TimesheetList from './TimesheetList'
import BarChart from './BarChart'

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
      timesheets: [],
      day: null,
      hours: ''
    }
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
          onChange={this.onHoursChange.bind(this)}
        />
        <DatePicker
          id='dayInput'
          hintText='day'
          onChange={this.onDayChange.bind(this)}
          container='inline'
        />
        <RaisedButton label='submit' onClick={this.onSubmitClick.bind(this)} />
        <BarChart timesheets={this.state.timesheets} />
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

  componentDidMount () {
    this.setState({
      timesheets: [
        { day: new Date(2015, 4, 3), hours: 5 },
        { day: new Date(2017, 1, 1), hours: 7 },
        { day: new Date(2018, 5, 7), hours: 5 },
        { day: new Date(2019, 1, 1), hours: 5 },
        { day: new Date(2018, 2, 6), hours: 2 },
        { day: new Date(2017, 4, 3), hours: 5 },
        { day: new Date(2019, 1, 1), hours: 10 },
        { day: new Date(2018, 5, 11), hours: 10 }
      ]
    })
  }


  onSubmitClick (e) {
    if (!this.state.day || !this.state.hours) {
      console.log('missing input fields')
      return
    }
    // todo: access state for day and hours and send POST request to '/timesheets'
    const timesheet = {
      id: this.idCounter++,
      hours: parseFloat(this.state.hours),
      formatted_day: moment(this.state.day).format('YYYY/MM/DD'),
      day: this.state.day
    }
    this.setState({
      timesheets: this.state.timesheets.concat(timesheet),
      day: null,
      hours: ''
    })
  }
}

export default TimesheetForm
