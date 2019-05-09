import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import UserHome from './components/user-home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {firebaseApp} from './firebase'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      authenticated: false,
      currentUser: null
    }
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        })
      }
    })
  }

  render() {
    const {authenticated, loading} = this.state

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <Router>
        <div>
          <PrivateRoute
            exact
            path="/"
            component={UserHome}
            authenticated={authenticated}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    )
  }
}

export default App
