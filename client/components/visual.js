import firebase from '../firebase'
import React from 'react'

import BudgetChart from './budgetChart'
import LocationList from './locationList'
import DateList from './datesList'
import '../style/visual.css'

class Visual extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrayPrefs: [],
      locationPrefs: {}
    }
  }
  async getData() {
    const data = []
    const firebaseDB = await firebase.firestore()
    await firebaseDB
      .collection('preferences')
      .where('tripId', '==', this.props.trip)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc.data())
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })

    const doc = await firebaseDB
      .collection('locationPrefs')
      .doc(this.props.trip)
      .get()

    let locationPrefs = doc.data()

    await this.setState({
      locationPrefs: locationPrefs,
      arrayPrefs: [...data]
    })
  }

  componentDidMount() {
    this.getData()
  }
  render() {
    const tripId = this.props.trip

    if (this.state.arrayPrefs.length < 1) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="visualBody">
          <h1>Trip Preferences:</h1>
          <h2>Options for Destinations:</h2>
          <LocationList
            arrayPrefs={this.state.arrayPrefs}
            locationPrefs={this.state.locationPrefs}
            tripId={tripId}
          />
          <h2>Options for Dates:</h2>
          <DateList arrayPrefs={this.state.arrayPrefs} />
          <h2>Group Budget Preference Breakdown:</h2>
          <BudgetChart arrayPrefs={this.state.arrayPrefs} />
          <p>
            Once your group has made a decision as to where to go and for which
            dates:
          </p>
          <button
            type="button"
            onClick={() => this.props.history.push(`/finalizeTrip/${tripId}`)}
          >
            Finalize Trip Destination and Dates
          </button>
        </div>
      )
    }
  }
}

export default Visual
