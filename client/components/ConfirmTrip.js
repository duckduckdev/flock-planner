import React from 'react'
import firebase from '../firebase'
/**
 * COMPONENT
 */

//I think we're imagining 
//that this is the form that will be filled out once all the data (dates, location)
//for the trip has been confirmed. saving this for later!!

class NewTripForm extends React.Component {
  constructor() {
    super()
    this.state = {
      tripName: '',
      destination: '',
      dates: ''
    }
    this.updateInput = this.updateInput.bind(this)
    this.addTrip = this.addTrip.bind(this)
  }

  updateInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  addTrip = async event => {
    event.preventDefault()

    // adding data to databse

    const firebaseDB = await firebase.firestore()

    const tripRef = await firebaseDB.collection('trips').add({
      tripName: this.state.tripName,
      destination: this.state.destination,
      dates: this.state.dates
    })

    //resets the form after adding the data
    this.setState = {
      tripName: '',
      destination: '',
      dates: ''
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTrip}>
          <div>
            <label htmlFor="tripName">
              <small>Name Your Trip</small>
            </label>
            <input
              name="tripName"
              type="text"
              onChange={this.updateInput}
              value={this.state.tripName}
            />
          </div>
          <div>
            <label htmlFor="destination">
              <small>Destination</small>
            </label>
            <input
              name="destination"
              type="text"
              onChange={this.updateInput}
              value={this.state.destination}
            />
          </div>
          <div>
            <label htmlFor="dates">
              <small>Dates</small>
            </label>
            <input
              name="dates"
              type="text"
              onChange={this.updateInput}
              value={this.state.dates}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewTripForm