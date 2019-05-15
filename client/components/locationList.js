import React from 'react'
import firebase from '../firebase'

class LocationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      votes: 1
    }

    this.addVote = this.addVote.bind(this)
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
        const newVotes = doc.data().prefs[location]
        // const pinArr = Object.keys(fbPins).map(key => fbPins[key])

        updateVotes(newVotes)
      })
  }

  render() {
    // console.log(this.props.arrayPrefs)
    console.log('location prefs', this.props.locationPrefs)

    let locations = this.props.locationPrefs.prefs

    // ok we want to sort the location prefs by whichever one is most popular
    let sortedLocations = Object.keys(locations).sort(
      (a, b) => locations[b] - locations[a]
    )

    console.log('sorted Locations', sortedLocations)

    return (
      <div>
        {sortedLocations.map(location => {
          return (
            <div key={location}>
              {`${location} ${this.state.votes}`}
              <button type="button" onClick={() => this.addVote(location)}>
                ❤️
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default LocationList
