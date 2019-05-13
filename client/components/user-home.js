import React from 'react'
import PropTypes from 'prop-types'
//import {connect} from 'react-redux'
import TripPrefForm from './trip-pref-form'
import {firebaseApp} from '../firebase'
import NewTripForm from './newTripForm'

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
