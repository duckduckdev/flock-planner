import React from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase, { firebaseApp } from './firebase'
import { Navbar } from './components'
import Routes from './routes'


const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App)
