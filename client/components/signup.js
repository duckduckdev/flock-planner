import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router'
import firebase, {firebaseApp} from '../firebase'
import FirebaseAuthForm from './firebaseAuthForm'

// signup needs to be a connected component
import {connect} from 'react-redux'

const mapStateToProps = state => ({tripId: state.currentTrip})

class SignUp extends Component {
  handleSignUp = async event => {
    event.preventDefault()
    const {email, password} = event.target.elements
    try {
      const user = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)

      const firebaseDB = firebase.firestore()

      const userRef = await firebaseDB
        .collection('users')
        .doc(email.value)
        .set({})
        .then(function() {
          console.log('Document successfully written!')
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })

      if (this.props.tripId) {
        console.log('redirecting')
        console.log('history', this.props.history)
        this.props.history.push(`${this.props.tripId}`)
      } else {
        this.props.history.push('/userHome')
      }
    } catch (error) {
      alert(error)
    }
  }
  render() {
    console.log('trip Id on state', this.props.tripId)
    const tripId = this.props.tripId

    return !this.user ? (
      <div className="visualContainer">
        <form onSubmit={this.handleSignUp}>
          <div>
            <h2>Start planning trips with Flock!</h2>
          </div>
          <br />
          <div>
            <label>
              Email
              <input name="email" type="email" />
            </label>
          </div>
          <br />
          <div>
            <label>
              Password
              <input name="password" type="password" />
            </label>
          </div>
          <br />
          <div>
            <button type="submit">Sign Up</button>
          </div>
          <div>
            <FirebaseAuthForm user={this.user} tripId={tripId} />
          </div>
        </form>
      </div>
    ) : (
      <Redirect to="/userHome" />
    )
  }
}

export default withRouter(connect(mapStateToProps, null)(SignUp))
