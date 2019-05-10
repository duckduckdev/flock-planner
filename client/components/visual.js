//TODO:render out three lists of preferences

import firebase from '../firebase'
import React from 'react'
import BudgetChart from './BudgetChart'

class Visual extends React.Component {
  constructor() {
    super()
    this.state = {
      arrayPrefs: []
    }
  }
  getData() {
    setTimeout(async () => {
      const data = []
      const firebaseDB = await firebase.firestore()
      await firebaseDB
        .collection('preferences')
        .where('trip', '==', this.props.match.params.tripId)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data())
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      await this.setState({
        arrayPrefs: [...data]
      })
    })

  }
  componentDidMount() {
    this.getData()
  }
  render() {
    if (this.state.arrayPrefs.length < 1) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
          <h1>Trip Preferences:</h1>
          <BudgetChart arrayPrefs={this.state.arrayPrefs} />
        </div>
      )
    }
  }
}

export default Visual