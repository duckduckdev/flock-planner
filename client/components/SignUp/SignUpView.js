import React from 'react'
import FirebaseAuthForm from '../firebaseAuthForm'
import {Redirect} from 'react-router'

const SignUpView = ({onSubmit, user}) => {
  console.log(user)
  return !user ? (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password:
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <FirebaseAuthForm user={user} />
    </div>
  ) : (
    <Redirect to="/" />
  )
}

export default SignUpView
