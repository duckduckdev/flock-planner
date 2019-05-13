import React from 'react'
import NewTripForm from './newTripForm'
import firebase, {firebaseApp} from '../firebase'
import {Renderbuffer} from '@luma.gl/core'

export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: [],
      loading: false
    }
  }

  async componentDidMount() {
    const user = await firebaseApp.auth().currentUser
    const firebaseDB = await firebase.firestore()

    const tripPref = await firebaseDB.collection('preferences')
    const trips = await firebaseDB.collection('trips')
    const data = []
    const tripData = []

    await tripPref
      .where('user', '==', user.email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          data.push(doc.data().trip)
        })
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })

    console.log('alltripPrefs', data)

    await data.map(tripId => {
      trips
        .doc(tripId)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            tripData.push(doc.data().tripName)
            console.log('Document data:', doc.data())
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    })
    console.log('tripdata', tripData)
    // return tripData
    this.setState({
      trips: tripData,
      loading: true
    })
  }

  render() {
    // const allTripNames = this.getAllTrips()
    console.log('ALLTRIPANMES', this.state.trips)

    return this.loading ? (
      'this is still loading'
    ) : (
      <div>
        <h3>Welcome</h3>
        <h6> {this.state.trips[0]}</h6>

        <h1>Create a new trip:</h1>
        <NewTripForm props={this.props} />
        <a href="/map/:tripId">Take me to map</a>
      </div>
    )
  }
}

export default UserHome
