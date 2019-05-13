import React from 'react'
import NewTripForm from './newTripForm'
import firebase, {firebaseApp} from '../firebase'
import {Renderbuffer} from '@luma.gl/core'

export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: [],
      loading: true
    }
  }

  async componentDidMount() {
    const user = await firebaseApp.auth().currentUser
    const firebaseDB = await firebase.firestore()

    const tripPref = await firebaseDB.collection('preferences')
    const data = []

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

    await this.setState({
      trips: data,
      loading: false
    })
  }

  render() {
    return this.state.loading ? (
      'this is still loading'
    ) : (
      <div>
        <h3>Welcome</h3>
        <ul>
          {this.state.trips.map(tripObj => (
            <li key={tripObj.tripName}>{tripObj.tripName}</li>
          ))}
        </ul>

        <h1>Create a new trip:</h1>
        <NewTripForm props={this.props} />
        <a href="/map/:tripId">Take me to map</a>
      </div>
    )
  }
}

export default UserHome
