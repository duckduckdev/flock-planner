import React, {Component} from 'react'
import firebase, {firebaseApp} from '../firebase'
// import {TripsLayer} from 'deck.gl'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import green from '@material-ui/core/colors/green'
import Radio from '@material-ui/core/Radio'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

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
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  checked: {}
})

class TripPrefForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLocation: '',
      secondLocation: '',
      thirdLocation: '',
      firstDates: '',
      secondDates: '',
      thirdDates: '',
      budget: '',
      tripName: '',
      datePrefs: {}
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addPreferences = this.addPreferences.bind(this)
  }

  componentDidMount() {
    const tripId = this.props.match.params.tripId

    const firebaseDB = firebase.firestore()

    firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .get()
      .then(doc => {
        this.setState({datePrefs: doc.data()})
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleOptionChange(event) {
    this.setState({budget: event.target.value})
  }

  async addPreferences(event) {
    event.preventDefault()
    const firebaseDB = firebase.firestore()
    let tripId = this.props.match.params.tripId

    const tripRef = await firebaseDB.collection('trips')
    let trip = {}
    await tripRef
      .doc(tripId)
      .get()
      .then(doc => (trip = doc.data()))
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })

    const user = firebaseApp.auth().currentUser

    let userId = user.email

    const preferencesRef = firebaseDB.collection('preferences').add({
      firstLocation: this.state.firstLocation,
      secondLocation: this.state.secondLocation,
      thirdLocation: this.state.thirdLocation,
      firstDates: this.state.firstDates,
      secondDates: this.state.secondDates,
      thirdDates: this.state.thirdDates,
      budget: this.state.budget,
      trip: trip,
      tripId: tripId,
      user: userId
    })

    //initialize values for locationPrefs and voted
    let locationPrefs = {}
    let voted = []

    // if this data already exists in firestore (meaning the trip already has preferences from other users)
    // then replace the newly initialized prefs and voted with data from the firstore
    let doc = await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .get()

    if (doc.exists) {
      locationPrefs = doc.data().prefs
      voted = doc.data().voted
    }

    // now add the new location data to the location prefs object
    let locationArray = [
      this.state.firstLocation,
      this.state.secondLocation,
      this.state.thirdLocation
    ]

    locationArray.forEach(location => {
      if (locationPrefs.hasOwnProperty(location)) {
        locationPrefs[location]++
      } else {
        locationPrefs[location] = 1
      }
    })

    // and record that the person with this user Id has already voted
    voted.push(userId)

    // and overwrite the data on the firestore
    await firebaseDB
      .collection('locationPrefs')
      .doc(tripId)
      .set({
        prefs: locationPrefs,
        voted: voted
      })

    this.setState({
      firstLocation: '',
      secondLocation: '',
      thirdLocation: '',
      firstDates: '',
      secondDates: '',
      thirdDates: '',
      budget: ''
    })

    this.props.history.push(`/trip/${this.props.match.params.tripId}`)
  }

  render() {
    // if the data is still loading
    // or if for some reason some nut has managed to get to this component without adding date preferences
    // show loading
    const {classes} = this.props
    if (!this.state.datePrefs.ranges) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="prefContainer">
          {/* <form onSubmit={this.addPreferences}> */}
          <form className={classes.container} noValidate autoComplete="off">
            <h3> Pick Your Top Three Destinations</h3>
            <div className="answer">
              <TextField
                id="outlined-full-width"
                label="First Choice"
                name="firstLocation"
                value={this.state.firstLocation}
                style={{margin: 8}}
                placeholder="i.e. Bali, Indonesia"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                id="outlined-full-width"
                label="Second Choice"
                name="secondLocation"
                value={this.state.secondLocation}
                style={{margin: 8}}
                placeholder="i.e. Santorini, Greece"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                id="outlined-full-width"
                label="Third Choice"
                name="thirdLocation"
                value={this.state.thirdLocation}
                style={{margin: 8}}
                placeholder="i.e. San José, Costa Rica"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </form>

          <h3>What's Your Budget?</h3>
          <div className="radio">
            <Radio
              color="primary"
              checked={this.state.budget === '< $150'}
              onChange={this.handleOptionChange}
              value="< $150"
              name="budget"
            />

            <span>{`< $150`}</span>
            <span />
            <Radio
              color="primary"
              checked={this.state.budget === '$150 to $500'}
              onChange={this.handleOptionChange}
              value="$150 to $500"
              name="budget"
            />
            <span>$150 to $500</span>
            <Radio
              color="primary"
              checked={this.state.budget === '$500 to $1,000'}
              onChange={this.handleOptionChange}
              value="$500 to $1,000"
              name="budget"
            />
            <span>$500 to $1,000</span>
            <Radio
              color="primary"
              checked={this.state.budget === '$1,000 to $1,500'}
              onChange={this.handleOptionChange}
              value="$1,000 to $1,500"
              name="budget"
            />
            <span>> $1,000 to $1,500</span>
            <Radio
              color="primary"
              checked={this.state.budget === '> $1,500'}
              onChange={this.handleOptionChange}
              value="> $1,500"
              name="budget"
            />
            <span>{`> $1,500`}</span>
          </div>
          <br />
          <ButtonToolbar className="form-sumbit">
            <Button variant="dark" size="lg" onClick={this.addPreferences}>
              Submit
            </Button>
          </ButtonToolbar>
        </div>
      )
    }
  }
}

TripPrefForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TripPrefForm)
