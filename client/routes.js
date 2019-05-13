import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import {firebaseApp} from './firebase'
import {
  Navbar,
  NewTripForm,
  AddTravelers,
  TripPrefForm,
  Visual,
  UserHome,
  Map,
  Login,
  Signup
} from './components'

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
        <Navbar />
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={UserHome}
            authenticated={authenticated}
            currentUser={currentUser}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/preference/:tripId"
            component={TripPrefForm}
            currentUser={currentUser}
          />
          <Route
            exact
            path="/visual/:tripId"
            component={Visual}
            currentUser={currentUser}
          />
          <PrivateRoute
            exact
            path="/createTrip"
            component={NewTripForm}
            authenticated={authenticated}
            currentUser={currentUser}
          />
          <PrivateRoute
            exact
            path="/addTravelers/:tripId"
            component={AddTravelers}
            authenticated={authenticated}
            currentUser={currentUser}
          />

          <PrivateRoute
            exact
            path="/map/:tripId"
            component={Map}
            authenticated={authenticated}
            currentUser={currentUser}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
