import React, {Component} from 'react'
import {withRouter} from 'react-router'
import firebase, {firebaseApp} from '../../firebase'

import SignUpView from './SignUpView'

class SignUpContainer extends Component {
  render() {
    const handleSignUp = async event => {
      event.preventDefault()
      const {email, password} = event.target.elements
      try {
        const user = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)

        //add to user collection
        console.log('has currentUser been created in sign up view??', user)

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
    return <SignUpView onSubmit={handleSignUp} user={handleSignUp.user} />
  }
}

export default withRouter(SignUpContainer)
