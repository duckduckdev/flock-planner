import React from 'react'
import firebase, {firebaseApp} from '../firebase'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import FloatingActionButtons from '../styling/addButton'

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
    return (
      <div className="layoutContainer">
        <img src="https://images.unsplash.com/photo-1501721857084-6b993d35774a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />

        {this.state.loading ? (
          'this is still loading'
        ) : (
          <div className="trips">
            <h3>Welcome</h3>
            <ButtonToolbar>
              <ul>
                {this.state.trips.length ? (
                  <div>
                    <h1>Your Trips</h1>
                    <br />
                    {this.state.trips.map(tripObj => (
                      <li key={tripObj.tripId}>
                        <Button
                          variant="outline-dark"
                          size="lg"
                          block
                          onClick={() =>
                            this.props.history.push(`/trip/${tripObj.tripId}`)
                          }
                        >
                          {tripObj.trip.tripName}
                        </Button>
                        <br />
                      </li>
                    ))}
                  </div>
                ) : (
                  <p>
                    You are not curently part of any trips. Why not create a new
                    one?
                  </p>
                )}

                <FloatingActionButtons
                  onClick={() => this.props.history.push('/createTrip')}
                />
              </ul>
            </ButtonToolbar>
          </div>
        )}
      </div>
    )
  }
}

export default UserHome
