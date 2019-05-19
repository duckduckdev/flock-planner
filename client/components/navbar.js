import React from 'react'
import {Link} from 'react-router-dom'
import firebase, {firebaseApp} from '../firebase'
import Loader from 'react-loader-spinner'

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
      return (
        <div className="plane">
          <center>
            <Loader type="Plane" color="#343840" height={80} width={80} />
          </center>
        </div>
      )
    }

    return (
      <div>
        <h1 id="title">Flock</h1>
        <nav>
          {this.state.currentUser ? (
            <div>
              <Link to="/userHome">Home</Link>
              <button type="button" onClick={this.handleClick}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/new">Login</Link>
              <Link to="/new">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

export default Navbar
