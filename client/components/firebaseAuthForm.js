import React from 'react'
import firebase, {firebaseApp} from '../firebase'
import withFirebaseAuth from 'react-with-firebase-auth'
import {Redirect} from 'react-router'
import Button from 'react-bootstrap/Button'
import {withStyles} from '@material-ui/core/styles'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}

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

class FirbaseAuthForm extends React.Component {
  render() {
    console.log('tripId in fb auth form', this.props.tripId)

    const {user, signInWithGoogle} = this.props

    if (!user) {
      return (
        <ButtonToolbar>
          <Button
            variant="dark"
            size="lg"
            type="button"
            onClick={signInWithGoogle}
          >
            Continue with Google
          </Button>
        </ButtonToolbar>
      )
    } else
      return this.props.tripId ? (
        <Redirect to={`${this.props.tripId}`} />
      ) : (
        <Redirect to="/userHome" />
      )

    // return (
    //   <div>
    //     {user ? (
    //       <Redirect to="/" />
    //     ) : (
    //       <button type="button" onClick={signInWithGoogle}>
    //         Sign in with Google
    //       </button>
    //     )}
    //   </div>
    // )
  }
}

export default withStyles(styles)(
  withFirebaseAuth({
    providers,
    firebaseAppAuth
  })(FirbaseAuthForm)
)
