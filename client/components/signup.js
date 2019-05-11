import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router'
import firebase, {firebaseApp} from '../firebase'
import FirebaseAuthForm from './firebaseAuthForm'

class SignUp extends Component {
  handleSignUp = async event => {
    event.preventDefault()
    const {email, password} = event.target.elements
    try {
      const user = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)

      const firebaseDB = firebase.firestore()

      const userRef = firebaseDB
        .collection('users')
        .doc(email.value)
        .set({})
        .then(function() {
          console.log('Document successfully written!')
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })

      this.props.history.push('/')
    } catch (error) {
      alert(error)
    }
  }
  render() {
    return !this.user ? (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSignUp}>
          <label>
            Email:
            <input name="email" type="email" />
          </label>
          <label>
            Password:
            <input name="password" type="password" />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <FirebaseAuthForm user={this.user} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  }
}

export default withRouter(SignUp)
