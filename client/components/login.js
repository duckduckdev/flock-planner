import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router'
import {firebaseApp} from '../firebase'
import FirebaseAuthForm from './firebaseAuthForm'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {connect} from 'react-redux'
import {setTrip} from '../store'

// get the trip being edited from state (if there is one)
const mapStateToProps = state => ({tripId: state.currentTrip})

const mapDispatchToProps = dispatch => () => ({
  setTrip: id => dispatch(setTrip(id))
})

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

class LoginView extends Component {
  handleLogin = async event => {
    event.preventDefault()
    const {email, password} = event.target.elements
    try {
      const user = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
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
    const {classes} = this.props
    if (this.props.location.state) {
      const tripId = this.props.location.state.url
      this.props.setTrip(tripId)
    }

    return (
      <div className="loginsignupContainer">
        <form className="loginsignupForm" onSubmit={this.handleLogin}>
          <div>
            <TextField
              label="Email"
              name="email"
              type="email"
              style={{margin: 8}}
              fullWidth
              margin="normal"
              variant="outlined"
              className="textField"
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
              Login
            </Button>
          </ButtonToolbar>
          <FirebaseAuthForm user={this.user} tripId={this.props.tripId} />
        </form>
      </div>
    )
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView))
)
