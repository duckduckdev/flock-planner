import React from 'react'
import NewTripForm from './newTripForm'
import firebase, {firebaseApp} from '../firebase'

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
          data.push(doc.data())
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
    console.log('this.state.trips', this.state.trips)
    return this.state.loading ? (
      'this is still loading'
    ) : (
      <div>
        <h3>Welcome</h3>
        <ul>
          {this.state.trips.map(tripObj => (
            <li key={tripObj.trip.tripName}>
              <a href={`/visual/:${tripObj.tripId}`}>{tripObj.trip.tripName}</a>
            </li>
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
