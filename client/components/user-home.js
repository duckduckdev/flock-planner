import React from 'react'
import TripPrefForm from './trip-pref-form'
import {firebaseApp} from '../firebase'

const user = firebaseApp.auth().currentUser

export const UserHome = () => {
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <NewTripForm props={props} />
      {/* <TripPrefForm props={props} /> */}
    </div>
  )
}

export default UserHome
