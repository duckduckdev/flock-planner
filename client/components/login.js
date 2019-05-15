import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router'
import {firebaseApp} from '../firebase'
import FirebaseAuthForm from './firebaseAuthForm'

// login needs to be a connected component
import {connect} from 'react-redux'
import {setTrip} from '../store'

// get the trip being edited from state (if there is one)
const mapStateToProps = (state) => ({tripId: state.currentTrip})

const mapDispatchToProps = (dispatch) => () => ({
  setTrip: (id) => dispatch(setTrip(id))
})

class LoginView extends Component {
  handleLogin = async event => {
    event.preventDefault()
    const {email, password} = event.target.elements
    try {
      const user = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
      console.log('trip Id just after sign in', this.props.tripId)
      if (this.props.tripId) {
        console.log('redirecting')
        console.log('history', this.props.history)
        this.props.history.push(`${this.props.tripId}`)
      }
      else {
        this.props.history.push('/')
      }
    } catch (error) {
      alert(error)
    }
  }
 
  render() {
    // console.log('is there a url here', this.props.location.state)
    // console.log('url', this.props.location.state.url)
    // console.log('props', this.props)

    // console.log('trip Id on state', this.props.tripId)

    if (this.props.location.state) {
      const tripId = this.props.location.state.url
      this.props.setTrip(tripId)
      console.log('setting tripId on state')
    }

    return (
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
        <FirebaseAuthForm user={this.user} tripId={this.props.tripId}/>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView))
