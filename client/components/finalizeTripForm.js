import React from 'react'
import firebase from '../firebase'

class FinalizeTripForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      finalDestination: '',
      finalDates: ''
    }
    this.updateInput = this.updateInput.bind(this)
    this.updateTrip = this.updateTrip.bind(this)
  }

  updateInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  updateTrip = async event => {
    try {
      event.preventDefault()

      const firebaseDB = firebase.firestore()
      let tripId = this.props.match.params.tripId

      await firebaseDB
        .collection('trips')
        .doc(tripId)
        .update({
          finalDestination: this.state.finalDestination,
          finalDates: this.state.finalDates
        })

      this.setState({
        finalDestination: '',
        finalDates: ''
      })

      this.props.history.push(`/map/${tripId}`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.updateTrip}>
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
            <button type="submit">Finalize Trip</button>
          </div>
        </form>
      </div>
    )
  }
}
export default FinalizeTripForm
