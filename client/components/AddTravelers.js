import React from 'react'
import firebase from '../firebase'
import axios from 'axios'
import '../style/addTravellers.css'

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

  // updateInput = event => {
  //   this.setState({[event.target.name]: event.target.value})
  // }

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
    // when this number increments, the state will change
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

  addFriend = async event => {
    event.preventDefault()

    // I also want to know the trip id so I can include it in the link that I send in the body of the email
    // how can I do this?
    // REDUX

    const user = firebase.auth().currentUser
    const userName = user.displayName ? user.displayName : user.email
    console.log(userName)

    // const firebaseDB = await firebase.firestore()
    // const userObj = await firebaseDB
    // .collection('users')
    // .where('trip', '==', this.props.currentUser)
    // .get()

    let data = {
      emails: this.state.emails,
      url: `http://localhost:8080/preference/${this.props.match.params.tripId}`,
      userName: userName
    }

    await axios.post('/send', data)

    //resets the form after adding the data
    this.setState({
      emails: {
        email1: ''
      }
    })

    this.props.history.push(`/preference/${this.props.match.params.tripId}`)
  }

  render() {
    return (
      <div className="addTravellersBody">
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
            <button type="button" id="addEmail" onClick={this.addEmailField}>
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
