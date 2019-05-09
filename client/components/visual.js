//TODO:render out three lists of preferences

import firebase from '../firebase'
import React from 'react'

class Visual extends React.Component {
  getData(event) {
    event.preventDefault()

    console.log('was this hit')
    const firebaseDB = firebase.firestore()
    // const preferenceRef = firebaseDB.collection('preferences')

    firebaseDB
      .collection('preferences')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
        })
      })
  }

  // const tripRef = firebaseDB.collection('trip').doc()

  render() {
    return (
      <div>
        <h1>Should be data visualization here</h1>
        <button type="submit" onClick={this.getData.bind(this)}>
          Fetch Data From Firebase
        </button>
      </div>
    )
  }
}

export default Visual
