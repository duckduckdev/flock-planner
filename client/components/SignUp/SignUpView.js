import React from 'react'
import FirebaseAuthForm from '../firebaseAuthForm'

const SignUpView = ({onSubmit}) => {
  return (
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
      <FirebaseAuthForm />
    </div>
  )
}

export default SignUpView
