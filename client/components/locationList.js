import React from 'react'
import firebase from '../firebase'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Favorite from '@material-ui/icons/Favorite'
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
    // upon component mount, get data about locations and votes from firestore

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

    let tripId = this.props.tripId

    const firebaseDB = await firebase.firestore()

    // find the thing where the votes for that location are stored
    const doc = await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .get()

    let prefs = doc.data().prefs

    prefs[location]++

    //this works but now we need to reset the firestore
    await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .set({prefs: prefs}, {merge: true})

    const updateVotes = newVotes => {
      this.setState({votes: newVotes})
    }

    // listen to the firestore for new changes
    await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .onSnapshot(function(doc) {
        const newVotes = doc.data().prefs

        console.log('new votes is', newVotes)

        updateVotes(newVotes)
      })
  }

  render() {
    let locations = this.state.votes

    const user = firebase.auth().currentUser
    // console.log('current user', user.email)

    // ok we want to sort the location prefs by whichever one is most popular
    let sortedLocations = Object.keys(locations).sort(
      (a, b) => locations[b] - locations[a]
    )

    if (this.state.loading) return <div>Loading...</div>

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

            return (
              <tr key={location}>
                <td>{location}</td>
                <td> {this.state.votes[location]}</td>
                <td>
                  {/* <button type="button" onClick={() => this.addVote(location)}> */}
                  {/* <FavoriteBorder onClick={() => this.addVote(location)} /> */}
                  {/* </button> */}
                  <div onClick={() => this.addVote(location)}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="checkedH"
                        />
                      }
                      label="Custom icon"
                    />
                  </div>
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
