import React from 'react'
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
// import login from './login'
// import signup from './signup'

class MainPage extends React.Component {
    constructor() {
        super()
        this.state = {
          redirect: false
        }
      }

      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

  render() {
    if (this.state.redirect) {
        return <Redirect to='/signup' />
    }

    else {
    return (
      <div id="mainPage">
        <div id="mainTitle">Flock.</div>
        <div id="mainDescription">
          Flock is a revolutionary new way to collaborate with your friends on
          planning travel.
        </div>
        <ButtonToolbar >
          <div id="lowerDescription">
            <Button variant="outline-light"
            onClick={this.setRedirect}
            >Come Fly With Us!</Button>
          </div>
        </ButtonToolbar>
      </div>
    )
    }
  }
}

export default MainPage
