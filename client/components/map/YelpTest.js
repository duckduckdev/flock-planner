import axios from 'axios'
import React from 'react'

class Yelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      businessId: null,
      imageUrl: null,
      rating: null,
      photos: null
    }
  }

  componentDidMount() {
    const address = this.props.info.address
    console.log('checkign address', this.props)
    this.fetchYelp(address)
    this.fetchInfo()
  }

  setId = id => {
    this.setState({businessId: id})
  }

  async fetchYelp(address) {
    await axios
      .get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${address}&radius=20`,
        {
          headers: {
            Authorization: `Bearer HEAtPVXFd6XOPXWHsL7QXVzxHyja4I894xaDiVGK2mzdw79z8VXrheC-IuZF563ThoQAXmrv5mt_xKERU8D0coihssQdAVbEoxSuN9_P64CvZxzRUd3PkGE7ei3bXHYx`
          }
        }
      )
      .then(res => {
        this.setId(res.data.businesses[0].id)
        console.log(res)
        console.log(this.state.businessId)
        this.fetchInfo()
      })
      .catch(err => {
        console.log('error')
      })
  }

  async fetchInfo() {
    await axios
      .get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${
          this.state.businessId
        }`,
        {
          headers: {
            Authorization: `Bearer HEAtPVXFd6XOPXWHsL7QXVzxHyja4I894xaDiVGK2mzdw79z8VXrheC-IuZF563ThoQAXmrv5mt_xKERU8D0coihssQdAVbEoxSuN9_P64CvZxzRUd3PkGE7ei3bXHYx`
          }
        }
      )
      .then(res => {
        console.log('business info', res)
        this.setState({
          imageUrl: res.data.image_url,
          rating: res.data.rating,
          photos: res.data.photos
        })
        console.log('checking state', this.state)
      })
      .catch(err => {
        console.log('error')
      })
  }

  render() {
    return (
      <div>
        <h1>{this.props.info.text}</h1>
        <p>{this.props.info.address}</p>
        {this.state.rating && <p>Rating:{this.state.rating}</p>}
        {this.state.imageUrl && <img src={this.state.imageUrl} height="200" />}
      </div>
    )
  }
}

export default Yelp
