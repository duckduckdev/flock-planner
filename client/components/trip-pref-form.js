import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAddAnswer} from '../store/tripPrefAnswers'

class TripPrefForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLocation: '',
      secondLocation: '',
      thirdLocation: '',
      firstDates: '',
      secondDates: '',
      thirdDates: '',
      budget: ''
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleOptionChange(changeEvent) {
    this.setState({
      budget: changeEvent.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.add(this.state)
    this.setState({
      firstLocation: '',
      secondLocation: '',
      thirdLocation: '',
      firstDates: '',
      secondDates: '',
      thirdDates: '',
      budget: ''
    })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h2>Where do you want to go?</h2>
          <div className="answer">
            <label>
              First Choice:
              <input
                type="text"
                name="firstLocation"
                value={this.state.firstLocation}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Second Choice:
              <input
                type="text"
                name="secondLocation"
                value={this.state.secondLocation}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Third Choice:
              <input
                type="text"
                name="thirdLocation"
                value={this.state.thirdLocation}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <h2>What dates do you prefer?</h2>
          <div className="answer">
            <label>
              First Choice:
              <input
                type="text"
                name="firstDates"
                value={this.state.firstDates}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Second Choice:
              <input
                type="text"
                name="secondDates"
                value={this.state.secondDates}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Third Choice:
              <input
                type="text"
                name="thirdDates"
                value={this.state.thirdDates}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <h2>How much do you want to spend overall on the trip?</h2>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="< $150"
                checked={this.state.budget === '< $150'}
                onChange={this.handleOptionChange}
              />
              Less Than $150
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$150-$500"
                checked={this.state.budget === '$150-$500'}
                onChange={this.handleOptionChange}
              />
              $150 - $500
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$500 - $1000"
                checked={this.state.budget === '$500 - $1000'}
                onChange={this.handleOptionChange}
              />
              $500 - $1000
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$1000-$1500"
                checked={this.state.budget === '$1000-$1500'}
                onChange={this.handleOptionChange}
              />
              $1000-$1500
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="budget"
                value="$1500+"
                checked={this.state.budget === '$1500+'}
                onChange={this.handleOptionChange}
              />
              $1500+
            </label>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: obj => {
      dispatch(fetchAddAnswer(obj))
    }
  }
}

export default connect(null, mapDispatchToProps)(TripPrefForm)
