import React, { Component } from 'react'
import TimesheetForm from './TimesheetForm'
import TimesheetList from './TimesheetList'
import ZoomableBarChart from './ZoomableBarChart'
import _ from 'lodash'
import moment from 'moment'

let ts = [
  {
    id: 4,
    formatted_day: moment(new Date(2019, 1, 1)).format('YYYY/MM/DD'),
    day: new Date(2019, 1, 1),
    hours: 5
  },
  {
    id: 1,
    formatted_day: moment(new Date(2015, 4, 3)).format('YYYY/MM/DD'),
    day: new Date(2015, 4, 3),
    hours: 5
  },
  {
    id: 2,
    formatted_day: moment(new Date(2017, 1, 1)).format('YYYY/MM/DD'),
    day: new Date(2017, 1, 1),
    hours: 7
  },
  {
    id: 3,
    formatted_day: moment(new Date(2018, 5, 7)).format('YYYY/MM/DD'),
    day: new Date(2018, 5, 7),
    hours: 5
  }
]

export default class TimesheetContainer extends Component {
  constructor () {
    super()
    this.state = {
      timesheets: []
    }
  }

  componentDidMount () {
    this.setState({
      timesheets: ts
    })
  }

  createTimesheet (timesheet) {
    this.setState({
      timesheets: _.sortBy(this.state.timesheets.concat(timesheet), ['day'])
    })
  }

  deleteTimesheet (id) {
    this.setState({
      timesheets: _.sortBy(this.state.timesheets.filter(ts => id !== ts.id), [
        'day'
      ])
    })
  }

  updateTimesheet (id, hours, day) {
    const timesheets = this.state.timesheets.map(elem => {
      if (elem.id === id) {
        elem.hours = hours || this.state.hours
        elem.day = day || this.state.day
        elem.formatted_day =
          moment(day).format('YYYY/MM/DD') || this.state.formatted_day
      }
      return elem
    })

    this.setState({
      timesheets: _.sortBy(timesheets, ['day'])
    })
  }

  render () {
    return (
      <div>
        <TimesheetForm createTimesheet={this.createTimesheet.bind(this)} />
        <TimesheetList
          timesheets={this.state.timesheets}
          deleteTimesheet={this.deleteTimesheet.bind(this)}
          updateTimesheet={this.updateTimesheet.bind(this)}
        />
        <ZoomableBarChart timesheets={this.state.timesheets} />
      </div>
    )
  }
}
