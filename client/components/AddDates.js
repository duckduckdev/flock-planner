import React from 'react'
import firebase from '../firebase'
import Calendar from './Calendar'

class AddDates extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        dateRange1: {},
        dateRange2: {},
        dateRange3: {}
      }
      // this.updateInput = this.updateInput.bind(this)
      this.addDates = this.addDates.bind(this)
    } 
  
    // updateInput = event => {
    //   this.setState({[event.target.name]: event.target.value})
    // }
  
    addDates = async event => {
      event.preventDefault()
  
      console.log('date range on state', this.state.dateRange1)
  
      const firebaseDB = await firebase.firestore()
  
    //   const tripRef = await firebaseDB.collection('trips').add({
    //     tripName: this.state.tripName,
    //     finalDestination: this.state.finalDestination,
    //     finalDates: this.state.finalDates
    //   })
  
      this.props.history.push(`/addTravelers/${this.props.match.params.tripId}`)
    }
  
    // this is a function to send to calendar 1 to get the dates from it
    // and then set those dates on the state of this component so we can add them to the database
    getDates1 = dates => {
      console.log(dates)
      this.setState({dateRange1: dates})
    }
  
    getDates2 (dates) {
      console.log(dates)
    }
  
    getDates3 (dates) {
      console.log(dates)
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.addDates}>
            <Calendar getDates={this.getDates1}/>
            <Calendar getDates={this.getDates2}/>
            <Calendar getDates={this.getDates3}/>
            <div>
              <button type="submit">Add Dates</button>
            </div>
          </form>
        </div>
      )
    }
  }
  export default AddDates