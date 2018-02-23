import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import leftPad from 'left-pad';

import TimesheetList from './TimesheetList';

// a "smart" component that has state
//  state: {
//      timesheets: a list of timesheets returned from the backend which is passed down to the "dumb" render component TimesheetList
//      hours: a stirng representing the amount of hours worked
//      day: a string representing the date of the timesheet entered to be sent to backend
//  }
class TimesheetForm extends Component {
  constructor() {
    super();

    this.idCounter = 1;
    this.state = {
      timesheets: [],
      day: '',
      hours: ''
    };
  }

  render() {
    return (
      <div>
        <TextField
          id="hourInput"
          label="hours"
          onChange={this.onHoursChange.bind(this)}
        />
        <DatePicker
          id="dayInput"
          hintText="day"
          onChange={this.onDayChange.bind(this)}
        />
        <RaisedButton label="submit" onClick={this.onSubmitClick.bind(this)} />
        <TimesheetList timesheets={this.state.timesheets} />
      </div>
    );
  }

  onSubmitClick(e) {
    //todo: access state for day and hours and send POST request to '/timesheets'
    const timesheet = {
      id: this.idCounter++,
      hours: this.state.hours,
      day: this.state.day
    };
    this.setState({
      timesheets: this.state.timesheets.concat(timesheet)
    });
  }

  // change handlers
  onHoursChange(e) {
    console.log('hours value:', e.currentTarget.value);
    this.setState({ hours: e.currentTarget.value });
  }

  onDayChange(e, date) {
    const input = this._formatDate(date);
    this.setState({ day: input });
  }

  /**
   * _formatDate takes a date and formats it according to format: yyyy-mm-dd
   * returns a formatted date string
   */
  _formatDate(date) {
    const y = date.getFullYear();
    const m = leftPad(date.getMonth() + 1, 2, '0'); // zero indexed month number
    const d = leftPad(date.getDate(), 2, '0');
    return `${y}-${m}-${d}`;
  }
}

export default TimesheetForm;
