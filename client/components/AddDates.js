import React from 'react'
import firebase from '../firebase'
import Calendar from './Calendar'
import '../style/addDates.css'

class AddDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateRange1: {},
      dateRange2: {},
      dateRange3: {}
    }
    // this.updateInput = this.updateInput.bind(this)
    this.addDates = this.addDates.bind(this)
  }

  // updateInput = event => {
  //   this.setState({[event.target.name]: event.target.value})
  // }

  addDates = async event => {
    event.preventDefault()

    let tripId = this.props.match.params.tripId
    // console.log('date range 1', this.state.dateRange1)
    // console.log('date range 1 to string', this.state.dateRange1.toString())
    // console.log('date range 2', this.state.dateRange2)

    // console.log('date range on state', this.state.dateRange1)

    let prefs = {
      ranges: {
        dateRange1: {
          dates: {
            from: this.state.dateRange1.from,
            to: this.state.dateRange1.to
          }, votes: []
        },
        dateRange2: {
          dates: {
            from: this.state.dateRange2.from,
            to: this.state.dateRange2.to
          }, votes: []
        },
        dateRange3: {
          dates: {
            from: this.state.dateRange3.from,
            to: this.state.dateRange3.to
          }, votes: []
        }
      },
      numRanges: 3,
      votes: []
    }

    //but how can I add new date ranges??
    // we'll figure it out

    console.log('prefs are', prefs)

    const firebaseDB = await firebase.firestore()

    await firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .set(
        prefs
      )

    //   const tripRef = await firebaseDB.collection('trips').add({
    //     tripName: this.state.tripName,
    //     finalDestination: this.state.finalDestination,
    //     finalDates: this.state.finalDates
    //   })
<<<<<<< HEAD

    this.props.history.push(`/addTravelers/${this.props.match.params.tripId}`)
  }

  // this is a function to send to calendar 1 to get the dates from it
  // and then set those dates on the state of this component so we can add them to the database
  getDates1 = dates => {
    console.log(dates)
    this.setState({ dateRange1: dates })
  }

  getDates2(dates) {
    console.log(dates)
  }

  getDates3(dates) {
    console.log(dates)
  }

  render() {
    return (
      <div className="addDatesBody">
        <form onSubmit={this.addDates}>
          <Calendar getDates={this.getDates1} />
          <Calendar getDates={this.getDates2} />
          <Calendar getDates={this.getDates3} />
          <div>
            <button type="submit">Add Dates</button>
          </div>
        </form>
      </div>
    )
=======

      this.props.history.push(`/addTravelers/${tripId}`)
    }

    // this is a function to send to calendar 1 to get the dates from it
    // and then set those dates on the state of this component so we can add them to the database
    getDates1 = dates => {
      console.log(dates)
      this.setState({dateRange1: dates})
    }

    getDates2 = dates => {
      console.log(dates)
      this.setState({dateRange2: dates})
    }

    getDates3 = dates => {
      console.log(dates)
      this.setState({dateRange3: dates})
    }

    render() {
      return (
        <div>
          <h2>Choose Some Potential Dates for Your Trip!</h2>
          <form onSubmit={this.addDates}>
            <Calendar getDates={this.getDates1}/>
            <Calendar getDates={this.getDates2}/>
            <Calendar getDates={this.getDates3}/>
            <div>
              <button type="submit">Add Dates</button>
            </div>
          </form>
        </div>
      )
    }
>>>>>>> master
  }
}
export default AddDates
