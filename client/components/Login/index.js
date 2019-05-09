import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {firebaseApp} from '../../firebase'

import LoginView from './LoginView'
class LoginViewContainer extends Component {
  handleLogin = async event => {
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
    return (
      <LoginView onSubmit={this.handleLogin} user={this.handleLogin.user} />
    )
  }
}

export default withRouter(LoginViewContainer)
