import React from 'react'
import firebase from '../firebase'

class AddTravelers extends React.Component {
  constructor() {
    super()
    this.state = {
      emails: {
        email1: ''
      },
      numEmails: 1
    }
    this.updateInput = this.updateInput.bind(this)
    this.addFriend = this.addFriend.bind(this)
    this.addEmail = this.addEmail.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
  }

  updateInput = event => {
    this.setState({[event.target.name]: event.target.value})
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

  addEmail = async () => {
    // when this number increments, the state will change
    // which will trigger... what?
    // we want it to trigger the render of a new line on the form
    //I guess the emails could be an array
    //or an object
    //and then we can iterate over it to create the component

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

  addFriend = event => {
    event.preventDefault()

    this.setState({
      email1: ''
    })
    this.props.history.push(`/preference/${this.props.match.params.tripId}`)
  }

  render() {
    return (
      <div>
        <h3>Add Your Friends!</h3>
        <form onSubmit={this.addFriend}>
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
            <button type="button" id="addEmail" onClick={this.addEmail}>
              +
            </button>
          </div>
          <div>
            <button type="submit">Send Invites</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddTravelers
