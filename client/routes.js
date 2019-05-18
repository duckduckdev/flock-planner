import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PrivateRoute2 from './components/PrivateRoute2'
import {firebaseApp} from './firebase'

import {
  NewTripForm,
  AddTravelers,
  TripPrefForm,
  Visual,
  UserHome,
  Map,
  Login,
  Signup,
  FinalizeTripForm,
  MapVisualTabs,
  AddDates,
  MainPage
} from './components'

import BootstrapNavBar from './styling/bootstrapNavBar'

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
        <BootstrapNavBar />

        <Switch>
          <Route exact path="/" component={MainPage} />

          <PrivateRoute
            exact
            path="/userHome"
            component={UserHome}
            authenticated={authenticated}
            currentUser={currentUser}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute2
            exact
            path="/preference/:tripId"
            component={TripPrefForm}
            currentUser={currentUser}
            authenticated={authenticated}
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
            path="/addDates/:tripId"
            component={AddDates}
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
          <PrivateRoute
            exact
            path="/finalizeTrip/:tripId"
            component={FinalizeTripForm}
            authenticated={authenticated}
            currentUser={currentUser}
          />
          <PrivateRoute
            exact
            path="/trip/:tripId"
            component={MapVisualTabs}
            authenticated={authenticated}
            currentUser={currentUser}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
