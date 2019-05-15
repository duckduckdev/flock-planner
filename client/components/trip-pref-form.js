import React, { Component } from 'react'
// import Calendar from './CalendarTest'
import DisplayCalendar from './DisplayCalendar'
import firebase, { firebaseApp } from '../firebase'
import '../style/tripPref.css'

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
      tripName: '',
      datePrefs: {}
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addPreferences = this.addPreferences.bind(this)
  }

  componentDidMount() {
    // when component mounts, I need to get the date prefs from firestore to populate the calendars
    // set them on state
    // the state is crowded

    const tripId = this.props.match.params.tripId

    const firebaseDB = firebase.firestore()

    firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .get()
      .then(doc => {
        this.setState({ datePrefs: doc.data() })
        console.log('state is now', this.state)
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleOptionChange(event) {
    this.setState({ budget: event.target.value })
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
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })

    const user = firebaseApp.auth().currentUser

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

    this.props.history.push(`/trip/${this.props.match.params.tripId}`)
  }

  render() {
    // if the data is still loading
    // or if for some reason some nut has managed to get to this component without adding date preferences
    // show loading
    if (!this.state.datePrefs.ranges) {
      return (
        <div>Loading...</div>
      )
    }

    else {
      const dateRanges = this.state.datePrefs.ranges
      console.log('date ranges', dateRanges)

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
            <h2>Select Dates:</h2>
            {Object.keys(dateRanges).map(range => {
              return (<div key={range}>
                <DisplayCalendar range={dateRanges[range]} />
                <button type="button">I'm Available</button>
                {/* what does the I'm available button do?
            it pushes your information into the voted array for that date range
            I guess it should be a radio button */}
              </div>
              )
            })}

            {/* <div className="answer">
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
          </div> */}
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
                  value="$500-$1000"
                  checked={this.state.budget === '$500-$1000'}
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
}

export default TripPrefForm
