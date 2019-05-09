import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import NewTripForm from './newTripForm'
import TripPrefForm from './trip-pref-form'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <NewTripForm props={props} />
      {/* <TripPrefForm props={props} /> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
