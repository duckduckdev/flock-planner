import React from 'react'
import firebase from '../firebase'
import DisplayCalendar from './DisplayCalendar'

class DateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstDates: '',
      secondDates: '',
      thirdDates: '',
      datePrefs: {}
    }
  }

  componentDidMount() {
    const tripId = this.props.tripId

    const firebaseDB = firebase.firestore()

    firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .get()
      .then(doc => {
        this.setState({datePrefs: doc.data()})
        console.log('state is now', this.state)
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
  }

  async addPreferences(event) {
    event.preventDefault()
    const firebaseDB = firebase.firestore()
    let tripId = this.props.tripId

    const tripRef = await firebaseDB.collection('trips')
    let trip = {}
    await tripRef
      .doc(tripId)
      .get()
      .then(doc => (trip = doc.data()))
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })

    const user = firebaseApp.auth().currentUser

    let userId = user.email
  }

  render() {
    if (!this.state.datePrefs.ranges) {
      return <div>Loading...</div>
    } else {
      const dateRanges = this.state.datePrefs.ranges
      console.log('date ranges', dateRanges)
      return (
        <div>
          <h2>Select Dates:</h2>
          {Object.keys(dateRanges).map(range => {
            return (
              <div key={range}>
                <DisplayCalendar range={dateRanges[range]} />
                <button type="button">I'm Available</button>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default DateList
