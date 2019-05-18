import React from 'react'
import firebase from '../firebase'
import PropTypes from 'prop-types'
import axios from 'axios'
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
  constructor(props) {
    super(props)
    this.state = {
      emails: {
        email1: ''
      },
      numEmails: 1
    }
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

  render() {
    const {classes} = this.props

    return (
      <div className="inviteContainer">
        <form className={classes.container} noValidate autoComplete="off">
          <h3>Invite people to your trip</h3>

          {Object.keys(this.state.emails).map(key => {
            return (
              <TextField
                key={key}
                id="outlined-full-width"
                name={key}
                value={this.state.emails[key]}
                style={{margin: 8}}
                placeholder="i.e. meow@cat.com"
                margin="normal"
                variant="outlined"
                onChange={this.updateEmail}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )
          })}

          <CleanAddButtons
            type="button"
            id="addEmail"
            value={this.state.emails}
            onClick={this.addEmailField}
          />
          <div id="sendButton">
            <SendButton
              onClick={this.state.emails}
              history={this.props.history}
              tripId={this.props.match.params.tripId}
            />
          </div>
        </form>
      </div>
    )
  }
}

AddTravelers.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddTravelers)
