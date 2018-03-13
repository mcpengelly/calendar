import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'

export default class TimesheetContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditable: false,
      day: this.props.day,
      hours: this.props.hours,
      formatted_day: moment(this.props.day).format('YYYY/MM/DD')
    }

    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onUpdateClick = this.onUpdateClick.bind(this)
    this.onHoursChange = this.onHoursChange.bind(this)
    this.onDayChange = this.onDayChange.bind(this)
  }

  render () {
    const hoursAndDates = isEditable => {
      if (isEditable) {
        return (
          <div>
            Hours worked:
            <TextField
              id='hourInput'
              onChange={this.onHoursChange}
              value={this.state.hours}
            />, on:
            <DatePicker
              id='dayInput'
              onChange={this.onDayChange}
              value={this.state.day}
            />
            <RaisedButton
              style={{ margin: '5px' }}
              label='delete'
              onClick={this.onDeleteClick}
            />
            <RaisedButton
              style={{ margin: '5px' }}
              label='update'
              onClick={this.onUpdateClick}
            />
          </div>
        )
      } else {
        return (
          <div>
            Hours worked: {this.props.hours}, on: {this.props.formatted_day}
            <RaisedButton
              style={{ margin: '5px' }}
              label='delete'
              onClick={this.onDeleteClick}
            />
            <RaisedButton
              style={{ margin: '5px' }}
              label='edit'
              onClick={this.onEditClick}
            />
          </div>
        )
      }
    }
    return hoursAndDates(this.state.isEditable)
  }

  onHoursChange (e) {
    this.setState({ hours: e.currentTarget.value })
  }

  onDayChange (e, date) {
    this.setState({ day: date })
  }

  onDeleteClick (e) {
    this.props.deleteTimesheet(this.props.id)
  }

  onEditClick (e) {
    this.setState({
      isEditable: true
    })
  }

  onUpdateClick (e) {
    this.setState({
      isEditable: false
    })
    // pass in new values
    this.props.updateTimesheet(
      this.props.id,
      parseFloat(this.state.hours),
      this.state.day
    )
  }
}
