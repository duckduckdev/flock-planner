//TODO:render out three lists of preferences

import firebase from '../firebase'
import React from 'react'

class Visual extends React.Component {
  getData(event) {
    event.preventDefault()

    const firebaseDB = firebase.firestore()

    // firebaseDB
    //   .collection('trips')
    //   .get(this.props.match.params.tripId)
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, ' => ', doc.data())
    //     })
    //   })

    var docRef = firebaseDB
      .collection('trips')
      .doc(this.props.match.params.tripId)
      .collection('preferences')

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  }

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
