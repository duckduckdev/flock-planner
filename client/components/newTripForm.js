import React from 'react'
import firebase from '../firebase'
/**
 * COMPONENT
 */
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

  addTrip = event => {
    event.preventDefault()

    // adding data to databse

    const firebaseDB = firebase.firestore()

    const tripRef = firebaseDB.collection('trips').add({
      tripName: this.state.tripName,
      destination: this.state.destination,
      dates: this.state.dates
    })

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
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewTripForm
