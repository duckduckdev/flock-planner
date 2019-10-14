import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router'
import firebase, {firebaseApp} from '../firebase'
import FirebaseAuthForm from './firebaseAuthForm'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
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
        this.props.history.push(`${this.props.tripId}`)
      } else {
        this.props.history.push('/userHome')
      }
    } catch (error) {
      alert(error)
    }
  }
  render() {
    return !this.user ? (
      <div className="loginsignupContainer">
        <form className="loginsignupForm" onSubmit={this.handleSignUp}>
          <div>
            <TextField
              label="Email"
              name="email"
              type="email"
              style={{margin: 8}}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
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
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <br />
          <ButtonToolbar>
            <Button variant="dark" size="lg" type="submit">
              Signup
            </Button>
          </ButtonToolbar>
          <FirebaseAuthForm user={this.user} tripId={this.props.tripId} />
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
