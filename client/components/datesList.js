import React from 'react'
import firebase from '../firebase'
import DisplayCalendar from './DisplayCalendar'
import Loader from 'react-loader-spinner'

class DateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datePrefs: {},
      votes: {},
      loading: true,
      available: false
    }

    this.addVote = this.addVote.bind(this)
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
        // console.log('state is now', this.state)
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
  }

  async addVote(range) {
    // this needs to increment the votes for that date range in the database

    let tripId = this.props.tripId

    // is checkbox checked?
    let checked = document.getElementById(`availableBox_${range}`).checked

    const firebaseDB = await firebase.firestore()

    // find the thing where the votes for that location are stored
    const doc = await firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .get()

    let ranges = doc.data().ranges
    // console.log('ranges is', ranges)

    if (checked) {
      // console.log('box is checked, adding new vote')

      ranges[range].numVotes++

      //this works but now we need to reset the firestore
      await firebaseDB
        .collection('datePrefs')
        .doc(tripId)
        .set({ranges: ranges}, {merge: true})
    } else {
      // console.log('box is not checked, need to remove vote')

      //how would you take out a vote?
      ranges[range].numVotes--

      //this works but now we need to reset the firestore
      await firebaseDB
        .collection('datePrefs')
        .doc(tripId)
        .set({ranges: ranges}, {merge: true})
    }

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
    // if (this.state.loading) return 'Loadinggg'
    if (!this.state.datePrefs.ranges) {
      return (
        <div className="plane">
          <center>
            <Loader type="Plane" color="#343840" height={80} width={80} />
          </center>
        </div>
      )
    } else {
      const dateRanges = this.state.datePrefs.ranges

      return (
        <div>
          <h2>Select Dates</h2>
          {Object.keys(dateRanges).map(range => {
            return (
              <div key={range}>
                <DisplayCalendar range={dateRanges[range]} />
                <form>
                  {' '}
                  <input
                    type="checkbox"
                    name="availability"
                    id={`availableBox_${range}`}
                    onChange={() => this.addVote(range)}
                  />
                  <label htmlFor="availability"> I'm available</label>
                </form>
                <div className="available">
                  <bold>Number of Friends Available: </bold>
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
