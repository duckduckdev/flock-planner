import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import NewTripForm from './NewTripForm'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {/* need conditional logic here - if user has no trips, show them the form to create one
      if they DO have trips, show them the trips they're on
      maybe with a button to add a new trip or something */}
      <NewTripForm />
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
