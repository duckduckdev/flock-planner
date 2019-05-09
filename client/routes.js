import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

import UserHome from './components/user-home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {firebaseApp} from './firebase'
import TripPrefForm from './components/trip-pref-form'
import Visual from './components/visual'

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
    const {authenticated, loading, currentUser} = this.state

    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={UserHome}
            authenticated={authenticated}
            currentUser={currentUser}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/preference" component={TripPrefForm} />
          <Route exact path="/visual" component={Visual} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
