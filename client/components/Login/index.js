import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {firebaseApp} from '../../firebase'

import LoginView from './LoginView'

class LoginViewContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault()
    const {email, password} = event.target.elements
    try {
      const user = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
      this.props.history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return <LoginView onSubmit={this.handleLogin} />
  }
}

export default withRouter(LoginViewContainer)
