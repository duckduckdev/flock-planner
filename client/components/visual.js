//TODO:render out three lists of preferences

import firebase from '../firebase'
import React from 'react'

import BudgetChart from './budgetChart'
import LocationList from './locationList'
import DateList from './datesList'

class Visual extends React.Component {
  constructor() {
    super()
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
      .where('tripId', '==', this.props.match.params.tripId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          data.push(doc.data())
        })
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })

    console.log('data', data)
    // await this.setState({
    //     arrayPrefs: [...data]
    // })

    const doc = await firebaseDB
      .collection('locationPrefs')
      .doc(this.props.match.params.tripId)
      .get()

    let locationPrefs = doc.data()
    console.log('location prefs from visual', locationPrefs)

    await this.setState({
      locationPrefs: locationPrefs,
      arrayPrefs: [...data]
    })
  }

  componentDidMount() {
    this.getData()
  }
  render() {
    if (this.state.arrayPrefs.length < 1) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h1>Trip Preferences:</h1>
          <h2>Options for Destinations:</h2>
          <LocationList
            arrayPrefs={this.state.arrayPrefs}
            locationPrefs={this.state.locationPrefs}
            tripId={this.props.match.params.tripId}
          />
          <h2>Options for Dates:</h2>
          <DateList arrayPrefs={this.state.arrayPrefs} />
          <h2>Group Budget Preference Breakdown:</h2>
          <BudgetChart arrayPrefs={this.state.arrayPrefs} />
        </div>
      )
    }
  }
}

export default Visual
