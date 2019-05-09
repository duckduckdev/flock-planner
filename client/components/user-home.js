import React from 'react'
import TripPrefForm from './trip-pref-form'
import firebase from '../firebase'

const user = firebase.auth().currentUser

export const UserHome = () => {
  const {email} = user

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <TripPrefForm />
    </div>
  )
}

export default UserHome
