import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import FloatingActionButtons from '../styling/addButton'
import firebase from '../firebase'

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

class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tripName: '',
      finalDestination: '',
      finalDates: ''
    }
    this.updateInput = this.updateInput.bind(this)
    this.addTrip = this.addTrip.bind(this)
  }

  updateInput = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  addTrip = async event => {
    event.preventDefault()

    const firebaseDB = await firebase.firestore()

    const tripRef = await firebaseDB.collection('trips').add({
      tripName: this.state.tripName,
      finalDestination: this.state.finalDestination,
      finalDates: this.state.finalDates
    })

    this.setState({
      tripName: '',
      finalDestination: '',
      finalDates: ''
    })

    this.props.history.push(`/addDates/${tripRef.id}`)
  }

  render() {
    const {classes} = this.props

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          {/* <label htmlFor="tripName"> */}
          <h3>Name Your Trip!</h3>
          {/* </label> */}
          <p>
            {' '}
            Make it nice and descriptive, like "Nancy's Bachelorette Party"
          </p>
          <TextField
            className="create-trip"
            id="outlined-full-width"
            label="Trip Name"
            name="tripName"
            value={this.state.tripName}
            style={{margin: 8}}
            placeholder="i.e. Ski Trip 2K19"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.updateInput}
            InputLabelProps={{
              shrink: true
            }}
          />
          {/* <div> */}
          <ButtonToolbar>
            <Button
              variant="dark"
              size="lg"
              type="submit"
              onClick={this.addTrip}
            >
              Create Trip
            </Button>
          </ButtonToolbar>
          {/* </div> */}
        </div>
      </form>
    )
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OutlinedTextFields)
