import React from 'react'
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
