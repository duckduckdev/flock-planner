import React from 'react'
import firebase, {firebaseApp} from '../firebase'
import withFirebaseAuth from 'react-with-firebase-auth'

const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}

class FirbaseAuthForm extends React.Component {
  render() {
    const {user, signOut, signInWithGoogle} = this.props
    return (

      <div>
        {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
        {user ? (
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
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
