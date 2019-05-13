import React, {Component} from 'react'
import firebase, {firebaseApp} from '../firebase'
import Calendar from 'rc-calendar'
import {TripsLayer} from 'deck.gl'

class TripPrefForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLocation: '',
      secondLocation: '',
      thirdLocation: '',
      firstDates: '',
      secondDates: '',
      thirdDates: '',
      budget: '',
      tripName: ''
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addPreferences = this.addPreferences.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleOptionChange(event) {
    this.setState({budget: event.target.value})
  }

  async addPreferences(event) {
    event.preventDefault()
    const firebaseDB = firebase.firestore()
    let tripId = this.props.match.params.tripId

    const tripRef = await firebaseDB.collection('trips')
    let trip = {}
    await tripRef
      .doc(tripId)
      .get()
      .then(doc => (trip = doc.data()))
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })

    console.log('tripppp', trip)

    const user = firebaseApp.auth().currentUser
    // we will replace with an actual user Id once we figure out how to do this

    let userId = user.email

    const preferencesRef = firebaseDB.collection('preferences').add({
      firstLocation: this.state.firstLocation,
      secondLocation: this.state.secondLocation,
      thirdLocation: this.state.thirdLocation,
      firstDates: this.state.firstDates,
      secondDates: this.state.secondDates,
      thirdDates: this.state.thirdDates,
      budget: this.state.budget,
      trip: trip,
      tripId: tripId,
      user: userId
    })

    //initialize values for locationPrefs and voted
    let locationPrefs = {}
    let voted = []

    // if this data already exists in firestore (meaning the trip already has preferences from other users)
    // then replace the newly initialized prefs and voted with data from the firstore
    let doc = await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .get()

    if (doc.exists) {
      locationPrefs = doc.data().prefs
      voted = doc.data().voted
    }

    // now add the new location data to the location prefs object
    let locationArray = [
      this.state.firstLocation,
      this.state.secondLocation,
      this.state.thirdLocation
    ]

    locationArray.forEach(location => {
      if (locationPrefs.hasOwnProperty(location)) {
        locationPrefs[location]++
      } else {
        locationPrefs[location] = 1
      }
    })

    // and record that the person with this user Id has already voted
    voted.push(userId)

    // and overwrite the data on the firestore
    await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .set({
        prefs: locationPrefs,
        voted: voted
      })

    this.setState({
      firstLocation: '',
      secondLocation: '',
      thirdLocation: '',
      firstDates: '',
      secondDates: '',
      thirdDates: '',
      budget: ''
    })

    this.props.history.push(`/visual/${this.props.match.params.tripId}`)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.addPreferences}>
          <h2>Where do you want to go?</h2>
          <div className="answer">
            <label>
              First Choice:
              <input
                type="text"
                name="firstLocation"
                value={this.state.firstLocation}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Second Choice:
              <input
                type="text"
                name="secondLocation"
                value={this.state.secondLocation}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Third Choice:
              <input
                type="text"
                name="thirdLocation"
                value={this.state.thirdLocation}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <h2>Which dates do you prefer?</h2>
          <div className="answer">
            <label>
              First Choice:
              <input
                type="text"
                name="firstDates"
                value={this.state.firstDates}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Second Choice:
              <input
                type="text"
                name="secondDates"
                value={this.state.secondDates}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Third Choice:
              <input
                type="text"
                name="thirdDates"
                value={this.state.thirdDates}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <Calendar />
          <h2>How much do you want to spend overall on the trip?</h2>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="< $150"
                checked={this.state.budget === '< $150'}
                onChange={this.handleOptionChange}
              />
              Less Than $150
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$150-$500"
                checked={this.state.budget === '$150-$500'}
                onChange={this.handleOptionChange}
              />
              $150 - $500
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$500 - $1000"
                checked={this.state.budget === '$500 - $1000'}
                onChange={this.handleOptionChange}
              />
              $500 - $1000
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$1000-$1500"
                checked={this.state.budget === '$1000-$1500'}
                onChange={this.handleOptionChange}
              />
              $1000-$1500
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$1500+"
                checked={this.state.budget === '$1500+'}
                onChange={this.handleOptionChange}
              />
              $1500+
            </label>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default TripPrefForm
