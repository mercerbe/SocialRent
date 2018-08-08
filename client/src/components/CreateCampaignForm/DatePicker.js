import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

//datepicker docs for state: https://github.com/Hacker0x01/react-datepicker

class DateSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (<DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
    />)
  }
}

export default DateSelect
