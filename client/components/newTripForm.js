import React from 'react'
import firebase from '../firebase'
/**
 * COMPONENT
 */
class NewTripForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // tripAddedFlag: false,
      tripName: '',
      finalDestination: '',
      finalDates: ''
    }
    this.updateInput = this.updateInput.bind(this)
    this.addTrip = this.addTrip.bind(this)

    // this.updateTravelerInput = this.updateTravelerInput.bind(this)
    // this.switchFlag = this.switchFlag.bind(this)
    // this.handleAddTraveler = this.handleAddTraveler.bind(this)
  }

  updateInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  // updateTravelerInput = event => {
  //   this.setState({
  //     fellowTravelers: [...this.state.fellowTravelers, event.target.value]
  //   })
  // }

  // switchFlag = event => {
  //   event.preventDefault()
  //   this.setState({tripAddedFlag: true})
  // }

  addTrip = async event => {
    event.preventDefault()

    const firebaseDB = await firebase.firestore()

    const tripRef = await firebaseDB.collection('trips').add({
      tripName: this.state.tripName,
      finalDestination: this.state.finalDestination,
      finalDates: this.state.finalDates
    })

    //this reference will have an id that will uniquely identify the trip.
    //but how can we know what the id is later?
    console.log(tripRef.id)

    //then I want to add preferences to this later?
    //this is getting a bit messy

    //resets the form after adding the data
    this.setState({
      tripName: '',
      finalDestination: '',
      finalDates: ''
    })

    this.props.props.history.push(`./addTravelers/${tripRef.id}`)
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
            <button type="submit">Add Trip</button>
          </div>
        </form>
      </div>
    )
  }
}
export default NewTripForm
