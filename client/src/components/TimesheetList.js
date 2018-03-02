import React, { Component } from 'react';

//a "dumb" render component that simply takes input from props and renders it accordingly
class TimesheetList extends Component {
  render() {
    const sheets = this.props.timesheets;
    let timesheets = sheets.map(sheet => {
      return (
        <li key={sheet.id}>
          hours: {sheet.hours} on date: {sheet.day}
        </li>
      );
    });

    return (
      <div>
        <ul>{timesheets}</ul>
      </div>
    );
  }
}

export default TimesheetList;
