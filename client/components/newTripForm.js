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

  addTrip = async event => {
    event.preventDefault()

    // adding data to databse

    //how can we know who the user is?
    // we're adding a dummy user id right now - eventually this will come from state (or something)
    const userId = 14

    const firebaseDB = await firebase.firestore()

    const tripRef = await firebaseDB.collection('trips').add({
      tripName: this.state.tripName,
      ownerId: userId,
      destination: this.state.destination,
      dates: this.state.dates
    })

    //this reference will have an id that will uniquely identify the trip. 
    //but how can we know what the id is later?
    console.log(tripRef.id)

    let tripId = tripRef.id

    //do we also want to add the trip to the owner's data object?
    //or maybe
    const tripTravelers = await firebaseDB.collection('tripTravelers').add({
      [tripId]: [userId]
    })

    console.log(tripTravelers)

    //then I want to add preferences to this later?
    //this is getting a bit messy    

    //resets the form after adding the data
    this.setState({
      tripName: '',
      destination: '',
      dates: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Name Your Trip</h3>
        <form onSubmit={this.addTrip}>
          <div>
            <input
              name="tripName"
              type="text"
              onChange={this.updateInput}
              value={this.state.tripName}
            />
          </div>
          <div>
            <button type="submit">NEXT</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewTripForm
