import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router'
import firebase, {firebaseApp} from '../firebase'
import FirebaseAuthForm from './firebaseAuthForm'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

// signup needs to be a connected component
import {connect} from 'react-redux'

const mapStateToProps = state => ({tripId: state.currentTrip})

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})

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
      <div className="loginsignupContainer">
        {/* <h2>Start planning trips with Flock!</h2> */}
        <form onSubmit={this.handleSignUp}>
          <div>
            <TextField
              label="Email"
              name="email"
              style={{margin: 8}}
              fullWidth
              margin="normal"
              variant="outlined"
              // onChange={this.updateInput}
              InputLabelProps={{
                shrink: true
              }}
            />
            {/* <label>
              Email
              <input name="email" type="email" />
            </label> */}
          </div>
          <br />
          <div>
            <TextField
              type="password"
              label="Password"
              name="password"
              style={{margin: 8}}
              fullWidth
              margin="normal"
              variant="outlined"
              // onChange={this.updateInput}
              InputLabelProps={{
                shrink: true
              }}
            />
            {/* <label>
              Password
              <input name="password" type="password" />
            </label> */}
          </div>
          <br />
          <ButtonToolbar>
            <Button
              variant="dark"
              size="lg"
              type="submit"
              onClick={this.handleSignUp}
            >
              Signup
            </Button>
          </ButtonToolbar>
          <FirebaseAuthForm user={this.user} tripId={this.props.tripId} />
          {/* <div>
            <button type="submit">Sign Up</button>
          </div> */}
          {/* <div>
            <FirebaseAuthForm user={this.user} tripId={tripId} />
          </div> */}
        </form>
      </div>
    ) : (
      <Redirect to="/userHome" />
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, null)(SignUp))
)
