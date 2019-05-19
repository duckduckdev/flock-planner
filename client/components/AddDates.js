import React from 'react'
import firebase from '../firebase'
import Calendar from './Calendar'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'

// I am trying to make some slider arrows

// const Right = props => (
//   <div className="rightArrow">
//     <i className="fas fa-arrow-right fa-2x" id="slick-next" onClick={props.onClick}></i>
//   </div>
// )

// const Left = props => (
//   <div className="leftArrow">
//     <i className="fas fa-arrow-left fa-2x" id="slick-prev" onClick={props.onClick}></i>
//   </div>
// )

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

  async addDates() {
    // event.preventDefault()

    console.log('add dates has been called')

    let tripId = this.props.match.params.tripId
    // console.log('date range 1', this.state.dateRange1)
    // console.log('date range 1 to string', this.state.dateRange1.toString())
    // console.log('date range 2', this.state.dateRange2)

    console.log('date range on state', this.state.dateRange1)

    let prefs = {
      ranges: {
        dateRange1: {
          dates: {
            from: this.state.dateRange1.from,
            to: this.state.dateRange1.to
          },
          votes: [],
          numVotes: 1
        },
        dateRange2: {
          dates: {
            from: this.state.dateRange2.from,
            to: this.state.dateRange2.to
          },
          votes: [],
          numVotes: 1
        },
        dateRange3: {
          dates: {
            from: this.state.dateRange3.from,
            to: this.state.dateRange3.to
          },
          votes: [],
          numVotes: 1
        }
      },
      numRanges: 3,
      votes: []
    }

    console.log('prefs are', prefs)

    const firebaseDB = await firebase.firestore()

    await firebaseDB
      .collection('datePrefs')
      .doc(tripId)
      .set(prefs)

    //   const tripRef = await firebaseDB.collection('trips').add({
    //     tripName: this.state.tripName,
    //     finalDestination: this.state.finalDestination,
    //     finalDates: this.state.finalDates
    //   })

    this.props.history.push(`/addTravelers/${tripId}`)
  }

  // this is a function to send to calendar 1 to get the dates from it
  // and then set those dates on the state of this component so we can add them to the database
  getDates1 = dates => {
    console.log('dates in calendar 1', dates)
    this.setState({dateRange1: dates})
  }

  getDates2 = dates => {
    console.log('dates in calendar 2', dates)
    this.setState({dateRange2: dates})
  }

  getDates3 = dates => {
    console.log('dates in calendar 3', dates)
    this.setState({dateRange3: dates})
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
      // variableWidth: true,
      // nextArrow: <Right/>,
      // prevArrow: <Left/>
    }

    return (
      <div className="datesContainer">
        <h3>Choose Some Potential Dates for Your Trip!</h3>
        <div className="datesSlider">
          <center>
            <Slider {...settings}>
              <div>
                <h2>Date Range (1 of 3)</h2>
                <Calendar getDates={this.getDates1} />
              </div>
              <div>
                <h2>Date Range (2 of 3)</h2>
                <Calendar getDates={this.getDates2} />
              </div>
              <div>
                <h2>Date Range (3 of 3)</h2>
                <Calendar getDates={this.getDates3} />
              </div>
            </Slider>
          </center>
        </div>
        {/* <button type="button" onClick={this.addDates}>Next</button> */}
        <ButtonToolbar>
          <Button
            variant="dark"
            size="lg"
            type="button"
            onClick={this.addDates}
          >
            Add Dates
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}
export default AddDates
