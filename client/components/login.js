import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router'
import {firebaseApp} from '../firebase'
import FirebaseAuthForm from './firebaseAuthForm'

class LoginView extends Component {
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
    return !this.user ? (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <label>
            Email:
            <input name="email" type="email" />
          </label>
          <label>
            Password:
            <input name="password" type="password" />
          </label>
          <button type="submit">Login</button>
        </form>
        <FirebaseAuthForm user={this.user} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  }
}

export default withRouter(LoginView)
