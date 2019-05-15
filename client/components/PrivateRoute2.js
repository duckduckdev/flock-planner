import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function PrivateRoute2({
  component: Component,
  authenticated, 
  ...rest
}) {
    // console.log('location is', location)
    // console.log('url', location.pathname)
    console.log('hitting private route 2', authenticated)

    // if the user is not logged in, the url for prefs will be passed to the login component as a prop
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{pathname: '/login', state: {url: location.pathname}}} />
        )
      }
    />
    //<Redirect to={{pathname: '/login', state: {url: location.pathname}}} />
  )
}