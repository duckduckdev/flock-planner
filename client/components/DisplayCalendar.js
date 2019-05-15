// I want to set this up to just display the options for dates so I don't really care about the picker
// this will take in two dates (as strings)
// and an array of user Ids from people who have voted on the dates shown

/* eslint-disable complexity */
import React, {Component} from 'react'
import Helmet from 'react-helmet'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'


export default class Calendar extends Component {
//   static defaultProps = {
//     numberOfMonths: 2,
//   };

  constructor(props) {
    super(props)
    this.state = {}
    
  }
  
  render() {
    console.log('range', this.props.range)

    // we've got to add .toDate because firebase always turns date objects to timestamps, apparently
    const from = this.props.range.dates.from.toDate()
    const to = this.props.range.dates.to.toDate()
    console.log('from is', from)
    console.log('to is', to)
    const modifiers = { start: from, end: to }

    

    return (
      <div className="RangeExample">
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <Helmet>
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
        </Helmet>
      </div>
    )
  }
}