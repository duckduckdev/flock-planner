import React from 'react'
import firebase from '../firebase'
import PropTypes from 'prop-types'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
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

class AddTravelers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emails: {
        email1: ''
      },
      numEmails: 1
    }
    this.addFriend = this.addFriend.bind(this)
    this.addEmailField = this.addEmailField.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
  }

  updateEmail = event => {
    event.persist()
    this.setState(prevState => {
      return {
        emails: {
          ...prevState.emails,
          [event.target.name]: event.target.value
        }
      }
    })
  }

  addEmailField = async () => {
    await this.setState((prevState, props) => {
      let newNum = prevState.numEmails + 1
      return {
        numEmails: newNum,
        emails: {
          ...prevState.emails,
          [`email${newNum}`]: ''
        }
      }
    })
  }

  addFriend = async event => {
    event.preventDefault()

    const user = firebase.auth().currentUser
    const userName = user.displayName ? user.displayName : user.email
    console.log(userName)

    let data = {
      emails: this.state.emails,
      url: `http://localhost:8080/preference/${this.props.match.params.tripId}`,
      userName: userName
    }

    await axios.post('/send', data)

    this.setState({
      emails: {
        email1: ''
      }
    })

    this.props.history.push(`/preference/${this.props.match.params.tripId}`)
  }

  render() {
    const {classes} = this.props

    return (
      <div className="inviteContainer">
        <h3>Invite Others to Collaborate</h3>
        <form className={classes.container} noValidate autoComplete="off">
          {Object.keys(this.state.emails).map(key => (
            <TextField
              key={key}
              id="outlined-full-width"
              name={key}
              value={this.state.tripName}
              style={{margin: 8}}
              placeholder="i.e. cat@meow.com"
              margin="normal"
              variant="outlined"
              onChange={this.updateEmail}
              InputLabelProps={{
                shrink: true
              }}
            />
          ))}
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            type="button"
            id="addEmail"
            value={this.state.emails}
            onClick={this.addEmailField}
          >
            <AddIcon />
          </Fab>
        </form>
        <div className="send">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={this.addFriend}
          >
            Send
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      </div>
    )
  }
}

AddTravelers.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddTravelers)
