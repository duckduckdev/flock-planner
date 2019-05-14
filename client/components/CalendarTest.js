// this one selects multiple days

import React, {Component} from 'react'
import DayPicker, {DateUtils} from 'react-day-picker'
import 'react-day-picker/lib/style.css'


export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDays: []
        }

        this.handleDayClick = this.handleDayClick.bind(this);
        
    }

    handleDayClick(day, { selected }) {
        const selectedDays = this.state.selectedDays

        // this is the day that's being selected
        console.log('day is', day)
        // this property tells you whether the day is already selected or not 
        console.log('selected is', selected)

        // if the day is already selected then clicking it again 
        // will toggle the selected day on state to undefined
        if (selected) {
            // if selected, remove that day from the array on state
            const selectedIndex = selectedDays.findIndex(selectedDay =>
              DateUtils.isSameDay(selectedDay, day)
            )
            selectedDays.splice(selectedIndex, 1);

            // else add the day to the state
        } else {
            selectedDays.push(day);
        }

        this.setState({ 
            selectedDays: selectedDays
        })

        console.log('selected days', this.state.selectedDays)

        // the days have now been set on state and we can do something with them
    }

    render() {
        return (
          <div>
            <DayPicker
              selectedDays={this.state.selectedDays}
              onDayClick={this.handleDayClick}
            />
          </div>
        );
    }
}