import React from 'react'
import firebase from '../firebase'
import DisplayCalendar from './DisplayCalendar'

class DateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datePrefs: {},
      votes: {},
      loading: true
    }
  }

  async componentDidMount() {
    const tripId = this.props.tripId

    const firebaseDB = firebase.firestore()

    const updateVotesFirstTime = newVotes => {
      this.setState({votes: newVotes})
    }

    await firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .onSnapshot(function(doc) {
        const newVotes = doc.data().ranges

        updateVotesFirstTime(newVotes)
      })

    this.setState({loading: false})

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

  // async addPreferences(event) {
  //   event.preventDefault()
  //   const firebaseDB = firebase.firestore()
  //   let tripId = this.props.tripId

  //   const tripRef = await firebaseDB.collection('trips')
  //   let trip = {}
  //   await tripRef
  //     .doc(tripId)
  //     .get()
  //     .then(doc => (trip = doc.data()))
  //     .catch(function(error) {
  //       console.log('Error getting documents: ', error)
  //     })

  //   const user = firebaseApp.auth().currentUser

  //   let userId = user.email
  // }

  async addVote(range) {
    // this needs to increment the votes for that date range in the database

    let tripId = this.props.tripId
    // console.log('trip id is', tripId)

    const firebaseDB = await firebase.firestore()

    // find the thing where the votes for that location are stored
    const doc = await firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .get()

    let ranges = doc.data().ranges

    ranges[range].numVotes++

    //this works but now we need to reset the firestore
    await firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .set({ranges: ranges}, {merge: true})

    const updateVotes = newVotes => {
      this.setState({votes: newVotes})
    }

    await firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .onSnapshot(function(doc) {
        const newVotes = doc.data().ranges

        updateVotes(newVotes)
      })
  }

  render() {

    if (this.state.loading) return 'Loadinggg'
    if (!this.state.datePrefs.ranges) {
      return <div>Loading...</div>
    } else {
      const dateRanges = this.state.datePrefs.ranges
      // console.log('date ranges', dateRanges)
      return (
        <div>
          <h2>Select Dates:</h2>
          {Object.keys(dateRanges).map(range => {
            return (
              <div key={range}>
                <DisplayCalendar range={dateRanges[range]} />
                <button type="button" onClick={() => this.addVote(range)}>
                  I'm Available
                </button>
                <div>
                  Number of Friends Available:{' '}
                  {this.state.votes[range].numVotes}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default DateList
