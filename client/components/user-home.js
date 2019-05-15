import React from 'react'
<<<<<<< HEAD
import NewTripForm from './newTripForm'
import firebase, { firebaseApp } from '../firebase'
import MapVisualTabs from './mapVisualTabs'
import '../style/user-home.css'
=======
import firebase, {firebaseApp} from '../firebase'
>>>>>>> master

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
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc.data())
        })
      })
      .catch(function (error) {
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
<<<<<<< HEAD
        <div className="homeBody">
          <h3 className="welcomeHeader">Welcome!</h3>
          <h4 className="yourTrips">These your trips:</h4>
          <ul className="tripList">
            {this.state.trips.length ? (
              this.state.trips.map(tripObj => (
                <li key={tripObj.trip.tripName}>
                  <a href={`/trip/${tripObj.tripId}`}>{tripObj.trip.tripName}</a>
                </li>
              ))
            ) : (
                <p>
                  You are not curently part of any trips. Why not create a new one?
=======
      <div>
        <h3>Welcome</h3>
        <ul>
          {this.state.trips.length ? (
            this.state.trips.map(tripObj => (
              <li key={tripObj.tripId}>
                <a href={`/trip/${tripObj.tripId}`}>{tripObj.trip.tripName}</a>
              </li>
            ))
          ) : (
            <p>
              You are not curently part of any trips. Why not create a new one?
>>>>>>> master
            </p>
              )}
          </ul>

          <button
            type="button"
            className="newTripButton"
            onClick={() => this.props.history.push('/createTrip')}
          >
            Create New Trip
        </button>
        </div>
      )
  }
}

export default UserHome
