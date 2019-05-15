import React from 'react'
import firebase from '../firebase'

class LocationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      votes: {},
      loading: true
    }

    this.addVote = this.addVote.bind(this)
  }

  async componentDidMount() {
    const tripId = this.props.tripId
    const firebaseDB = await firebase.firestore()

    const updateVotesFirstTime = newVotes => {
      this.setState({votes: newVotes})
    }

    await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .onSnapshot(function(doc) {
        const newVotes = doc.data().prefs

        updateVotesFirstTime(newVotes)
      })

    this.setState({loading: false})
  }



  async addVote(location) {
    // this needs to increment the votes for that location in the database
    // shit how do you do that

    let tripId = this.props.tripId
    // console.log('trip id is', tripId)

    const firebaseDB = await firebase.firestore()

    // find the thing where the votes for that location are stored
    const doc = await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .get()

    let prefs = doc.data().prefs
    console.log('prefs is', prefs)

    prefs[location]++

    console.log('prefs is now', prefs)

    //this works but now we need to reset the firestore
    await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .set({prefs: prefs}, {merge: true})

    const updateVotes = newVotes => {
      this.setState({votes: newVotes})
    }

    await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .onSnapshot(function(doc) {
        const newVotes = doc.data().prefs

        updateVotes(newVotes)
      })
  }

  render() {
    let locations = this.props.locationPrefs.prefs

    // ok we want to sort the location prefs by whichever one is most popular
    let sortedLocations = Object.keys(locations).sort(
      (a, b) => locations[b] - locations[a]
    )

    if (this.state.loading) return 'Loadinggg'
    return (
      <table>
        <div>
          {sortedLocations.map(location => {
            let votes = this.state.votes[location]
            let hearts = '❤️'
            while (votes > 1) {
              hearts += '❤️'
              votes--
            }
            console.log(hearts, 'hearts')

            return (
              <tr key={location}>
                <td>{location}</td>
                <td> {this.state.votes[location]}</td>
                <td>
                  <button type="button" onClick={() => this.addVote(location)}>
                    ❤️
                  </button>
                </td>

                <td>{hearts}</td>
              </tr>
            )
          })}
        </div>
      </table>
    )
  }
}

export default LocationList
