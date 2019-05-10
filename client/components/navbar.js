import React from 'react'
import {Link} from 'react-router-dom'
import firebase, {firebaseApp} from '../firebase'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      currentUser: null
    }
  }

  handleClick = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {
        console.log(error)
      })
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user,
          loading: false
        })
      } else {
        this.setState({
          currentUser: null,
          loading: false
        })
      }
    })
  }

  render() {
    const {loading} = this.state

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <h1>Flock</h1>
        <nav>
          {this.state.currentUser ? (
            <div>
              <Link to="/">Home</Link>
              <button type="button" onClick={this.handleClick}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

export default Navbar
