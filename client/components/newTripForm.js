import React from 'react'
import firebase from '../firebase'
/**
 * COMPONENT
 */
class NewTripForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tripAddedFlag: false,
      tripName: '',
      finalDestination: '',
      finalDates: '',
      fellowTravelers: []
    }
    this.updateInput = this.updateInput.bind(this)
    // this.addTrip = this.addTrip.bind(this)

    this.updateTravelerInput = this.updateTravelerInput.bind(this)
    this.switchFlag = this.switchFlag.bind(this)
    this.handleAddTraveler = this.handleAddTraveler.bind(this)
  }

  updateInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  updateTravelerInput = event => {
    this.setState({
      fellowTravelers: [...this.state.fellowTravelers, event.target.value]
    })
  }

  switchFlag = event => {
    event.preventDefault()
    this.setState({tripAddedFlag: true})
  }

  handleAddTraveler = event => {
    event.preventDefault()

    const firebaseDB = firebase.firestore()

    const tripRef = firebaseDB.collection('trips').add({
      tripName: this.state.tripName,
      finalDestination: this.state.finalDestination,
      finalDates: this.state.finalDates,
      fellowTravelers: this.state.fellowTravelers
    })

    this.setState = {
      tripName: '',
      finalDestination: '',
      finalDates: '',
      fellowTravelers: [],
      tripAddedFlag: false
    }

    this.props.props.history.push('./preference')
    console.log('this is working', this.props)
  }

  render() {
    return (
      <div>
        {!this.state.tripAddedFlag && (
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
            {/* <div>
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
          </div> */}
            <div>
              <button type="submit" onClick={this.switchFlag}>
                Add Trip
              </button>
            </div>
          </form>
        )}
        {this.state.tripAddedFlag && (
          <form onSubmit={this.handleAddTraveler}>
            <div>
              <label htmlFor="fellowTravelers">
                <small>Add Emails</small>
              </label>
              <input
                name="fellowTravelers"
                type="email"
                onChange={this.updateTravelerInput}
                value={this.state.fellowTravelers}
              />
            </div>
            <div>
              <button type="submit">Add Traveler</button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default NewTripForm
