import React from 'react'
import FirebaseAuthForm from '../firebaseAuthForm'

const LoginView = ({onSubmit, user}) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password:
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <FirebaseAuthForm user={user} />
    </div>
  )
}

export default LoginView
