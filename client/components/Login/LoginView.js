import React from 'react'
import FirebaseAuthForm from '../firebaseAuthForm'
import {Redirect} from 'react-router'

const LoginView = ({onSubmit, user}) => {
  return !user ? (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
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
      <FirebaseAuthForm user={user} />
    </div>
  ) : (
    <Redirect to="/" />
  )
}

export default LoginView
