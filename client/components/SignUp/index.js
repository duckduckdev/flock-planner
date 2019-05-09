import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {firebaseApp} from '../../firebase'

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
        this.props.history.push('/')
      } catch (error) {
        alert(error)
      }
    }
    return <SignUpView onSubmit={handleSignUp} user={handleSignUp.user} />
  }
}

export default withRouter(SignUpContainer)