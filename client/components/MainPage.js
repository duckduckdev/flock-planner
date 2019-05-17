import React from 'react'
// import login from './login'
// import signup from './signup'

class MainPage extends React.Component {
  render() {
    return (
      <div id="mainPage">
        <div id="mainTitle">Flock.</div>
        <div id="mainDescription">
          Flock is a revolutionary new way to collaborate with your friends on
          planning travel.
        </div>
        <div id="lowerDescription">
          <button type="button">Come Fly With Us!</button>
        </div>
      </div>
    )
  }
}

export default MainPage
