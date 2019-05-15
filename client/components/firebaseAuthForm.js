import React from 'react'
import firebase, {firebaseApp} from '../firebase'
import withFirebaseAuth from 'react-with-firebase-auth'
import {Redirect} from 'react-router'

const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}

class FirbaseAuthForm extends React.Component {
  render() {
    console.log('tripId in fb auth form', this.props.tripId)

    const {user, signInWithGoogle} = this.props

    if (!user) {
      return (
        <button type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
      )
    } 

    else return (
      this.props.tripId? <Redirect to={`${this.props.tripId}`} /> : 
      <Redirect to="/" />
    )

    // return (
    //   <div>
    //     {user ? (
    //       <Redirect to="/" />
    //     ) : (
    //       <button type="button" onClick={signInWithGoogle}>
    //         Sign in with Google
    //       </button>
    //     )}
    //   </div>
    // )
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(FirbaseAuthForm)
