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
    const {user, signInWithGoogle} = this.props
    return (
      <div>
        {user ? (
          <Redirect to="/" />
        ) : (
          <button type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        )}
      </div>
    )
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(FirbaseAuthForm)
