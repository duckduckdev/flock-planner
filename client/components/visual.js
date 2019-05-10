//TODO:render out three lists of preferences

import firebase from '../firebase'
import React from 'react'
// import BudgetChart from './BudgetChart'

class Visual extends React.Component {
  componentDidMount() {
    let arrayPrefs = []
    const firebaseDB = firebase.firestore()
    firebaseDB
      .collection('preferences')
      .where('trip', '==', this.props.match.params.tripId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          arrayPrefs.push(doc.data())
        })
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
    console.log(arrayPrefs)
  }

  render() {
    console.log(this.arrayPrefs)
    return (
      <div>
        <h1>Trip Preferences:</h1>
        {/* <BudgetChart arrayPrefs={this.arrayPrefs} /> */}
      </div>
    )
  }
}

export default Visual
