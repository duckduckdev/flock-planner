import React from 'react'
import NewTripForm from './newTripForm'
import {firebaseApp} from '../firebase'

const user = firebaseApp.auth().currentUser

export const UserHome = props => {
  return (
    <div>
      <h3>Welcome</h3>
      <NewTripForm props={props} />
      <a href="/map/:tripId">Take me to map</a>
    </div>
  )
}

export default UserHome
