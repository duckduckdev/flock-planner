//TODO: testing sandbox

import React, {Component} from 'react'

import MapGL, {Marker, Popup} from 'react-map-gl'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'
import Pin from './pin'
import PlaceInfo from './placeInfo'
// import Loader from 'react-loader-spinner'

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2ltbWExMjYxIiwiYSI6ImNqdDRqeW0yeDFiN2w0M21qYWZ1bnBzZWoifQ.O-7JvQWK8pqXWgSiwIN8tQ'

class Map extends Component {
  constructor() {
    super()

    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      searchResultLayer: null,
      popupInfo: null,
      loading: true
    }
  }

  mapRef = React.createRef()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
    this.setState({loading: false})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.handleViewportChange({
      // width: window.innerWidth,
      // height: window.innerHeight
      width: 1000,
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
    console.log(event.result)

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

    console.log(
      'HII checking newSearchResultLayer',
      this.state.searchResultLayer
    )
  }

  _renderPlaceMarker = () => {
    return (
      <Marker
        // key={`marker-${index}`}
        longitude={this.state.searchResultLayer.props.data.coordinates[0]}
        latitude={this.state.searchResultLayer.props.data.coordinates[1]}
      >
        <Pin
          size={20}
          onClick={() =>
            this.setState({
              popupInfo: {
                placeName: 'PlaceHolder Name',
                address: '101 Grace Street - Place Holder Address'
              }
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
          anchor="top"
          longitude={this.state.searchResultLayer.props.data.coordinates[0]}
          latitude={this.state.searchResultLayer.props.data.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <PlaceInfo info={popupInfo} />
          <p>hi pop up is working!</p>
        </Popup>
      )
    )
  }

  render() {
    const {viewport, searchResultLayer} = this.state

    return this.state.loading ? (
      // <Loader type="Grid" color="#00BFFF" height="100" width="100" />
      <h6>Loading...</h6>
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

        {this.state.searchResultLayer && this._renderPlaceMarker()}
        {this.state.searchResultLayer && this._renderPopup()}
      </MapGL>
    )
  }
}

export default Map
