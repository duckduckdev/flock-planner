//TODO: testing sandbox

import React, {Component} from 'react'

import MapGL, {Marker, Popup} from 'react-map-gl'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'
import Pin from './pin'
import PlaceInfo from './YelpTest'
import firebase from '../../firebase'
import Loader from 'react-loader-spinner'

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2ltbWExMjYxIiwiYSI6ImNqdDRqeW0yeDFiN2w0M21qYWZ1bnBzZWoifQ.O-7JvQWK8pqXWgSiwIN8tQ'

class Map extends Component {
  constructor() {
    super()

    this.state = {
      viewport: {
        width: 1300,
        height: 1000,
        latitude: 40.7793195,
        longitude: -73.96354299999999,
        zoom: 12
      },
      searchResultLayer: null,
      popupInfo: null,
      loading: true,
      mapPins: null
    }
  }

  mapRef = React.createRef()

  async componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
    //subscribe to map firebase
    let tripId = this.props.trip

    const firebaseDB = firebase.firestore()

    const updateMapPins = pin => {
      this.setState({mapPins: pin})
    }

    await firebaseDB
      .collection('maps')
      .doc(tripId)
      .onSnapshot(function(doc) {
        const fbPins = doc.data()
        const pinArr = Object.keys(fbPins).map(key => fbPins[key])

        updateMapPins(pinArr)
      })

    this.setState({loading: false})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.handleViewportChange({
      // width: window.innerWidth,
      // height: window.innerHeight
      width: 1300,
      height: 1000
    })
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = {transitionDuration: 1000}

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  handleOnResult = event => {
    console.log('eventresult', event.result)

    const placeId = event.result.id
    const name = event.result.place_name
    const address = event.result.properties.address
    const category = event.result.properties.category
    const coordinates = event.result.geometry.coordinates
    const text = event.result.text

    //write map locations to firebase
    let tripId = this.props.trip

    const firebaseDB = firebase.firestore()

    const mapRef = firebaseDB
      .collection('maps')
      .doc(tripId)
      .set(
        {
          [placeId]: {
            name: name,
            address: address,
            category: category,
            coordinates: coordinates,
            text: text
          }
        },
        {
          merge: true
        }
      )

    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
  }

  _renderPlaceMarker = (place, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={place.coordinates[0]}
        latitude={place.coordinates[1]}
      >
        <Pin
          size={30}
          onClick={() =>
            this.setState({
              popupInfo: place
            })
          }
        />
      </Marker>
    )
  }

  _renderPopup() {
    const {popupInfo} = this.state

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.coordinates[0]}
          latitude={popupInfo.coordinates[1]}
          closeOnClick={true}
          onClose={() => this.setState({popupInfo: null})}
        >
          <PlaceInfo info={popupInfo} />
        </Popup>
      )
    )
  }

  render() {
    const {viewport, searchResultLayer} = this.state

    return this.state.loading ? (
      <div className="plane">
        <center>
          <Loader type="Plane" color="#343840" height={80} width={80} />
        </center>
      </div>
    ) : (
      <MapGL
        ref={this.mapRef}
        {...viewport}
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
        {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}

        {this.state.mapPins && this.state.mapPins.map(this._renderPlaceMarker)}
        {this.state.popupInfo && this._renderPopup()}
      </MapGL>
    )
  }
}

export default Map
