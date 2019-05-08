// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import config from './config'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
export const firebaseApp = firebase.initializeApp(config)

// var db = firebase.firestore()

export default firebase
