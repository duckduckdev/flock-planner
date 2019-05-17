import React from 'react'
import firebase from '../firebase'
import Calendar from './Calendar'
import OutlinedTextFields from '../styling/inputBox'

class NewTripForm extends React.Component {
  render() {
    return (
      <div className="newTripContainer">
        <OutlinedTextFields history={this.props.history} />
      </div>
    )
  }
}

export default NewTripForm
