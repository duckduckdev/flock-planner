// this one selects the range

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
    this.state = this.getInitialState()

    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    }
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)

    // console.log(range)
    this.props.getDates(range)
  }

  handleResetClick() {
    this.setState(this.getInitialState())
  }
  
  render() {
    const { from, to } = this.state
    // console.log('from is', from)
    // console.log('to is', to)
    const modifiers = { start: from, end: to }

    return (
      <div className="RangeExample">
        {/* <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
            to && (
              <button type="button" className="link" onClick={this.handleResetClick}>
                Reset
              </button>
            )}
        </p> */}
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <button type="button" className="link" onClick={this.handleResetClick}>
                Reset
              </button>
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