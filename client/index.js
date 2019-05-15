import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import history from './history'
import App from './app'

import {Provider} from 'react-redux'
import store from './store'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
  </Provider>,
  document.getElementById('app')
)
