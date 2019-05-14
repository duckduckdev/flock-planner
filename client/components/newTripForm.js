import React from 'react'
import firebase from '../firebase'
import Calendar from './Calendar'

class NewTripForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tripName: '',
      finalDestination: '',
      finalDates: ''
    }
    this.updateInput = this.updateInput.bind(this)
    this.addTrip = this.addTrip.bind(this)
  } 

  updateInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  addTrip = async event => {
    event.preventDefault()

    const firebaseDB = await firebase.firestore()

    const tripRef = await firebaseDB.collection('trips').add({
      tripName: this.state.tripName,
      finalDestination: this.state.finalDestination,
      finalDates: this.state.finalDates
    })

    this.setState({
      tripName: '',
      finalDestination: '',
      finalDates: ''
    })

    this.props.history.push(`/addDates/${tripRef.id}`)
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
            <button type="submit">Add Trip</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewTripForm
