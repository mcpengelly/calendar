import React, { Component } from 'react'
import Timesheet from './Timesheet'

// a "dumb" render component that simply takes input from props and renders it accordingly
class TimesheetList extends Component {
  render () {
    let timesheets = this.props.timesheets.map(sheet => {
      return (
        <Timesheet
          key={sheet.id}
          id={sheet.id}
          hours={sheet.hours}
          day={sheet.day}
          formatted_day={sheet.formatted_day}
          deleteTimesheet={this.props.deleteTimesheet.bind(this)}
          updateTimesheet={this.props.updateTimesheet.bind(this)}
        />
      )
    })

    return <div>{timesheets}</div>
  }
}

export default TimesheetList
