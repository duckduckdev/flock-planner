import React from 'react'
import firebase from '../firebase'
import PropTypes from 'prop-types'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import CleanAddButtons from '../styling/cleanAddButton'
import SendButton from '../styling/sendButton'

import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

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

class AddTravelers extends React.Component {
  constructor() {
    super()
    this.state = {
      emails: {
        email1: ''
      },
      numEmails: 1
    }
    // this.updateInput = this.updateInput.bind(this)
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
        <h3>Invite people to your trip</h3>
        {/* <form onSubmit={this.addFriend}>
          {Object.keys(this.state.emails).map(key => {
            return (
              <div key={key}>
                <input
                  name={key}
                  type="text"
                  onChange={this.updateEmail}
                  value={this.state.emails[key]}
                />
              </div>
            )
          })}
          <div>
            <button type="button" id="addEmail" onClick={this.addEmailField}>
              +
            </button>
          </div>
          <div>
            <button type="submit">Send Invites</button>
          </div>
        </form> */}

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
          {/* <button type="button" id="addEmail" onClick={this.addEmailField}>
            +
          </button> */}
          <CleanAddButtons
            type="button"
            id="addEmail"
            onClick={this.addEmailField}
          />
        </form>
        <div id="sendButton">
          <SendButton onClick={this.addFriend} />
        </div>
        {/* <div>
          <button type="submit" onClick={this.addFriend}>
            Send Invites
          </button>
        </div> */}
      </div>
    )
  }
}

AddTravelers.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddTravelers)
