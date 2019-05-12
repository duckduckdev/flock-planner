// import React from 'react'
// import ReactMapGL, {Marker} from 'react-map-gl'
// import Geocoder from 'react-map-gl-geocoder'
// // import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

// // import Dropdown from './dropdown.tsx'

// class Map extends React.Component {
//   state = {
//     viewport: {
//       width: 700,
//       height: 700,
//       latitude: 40.7308,
//       longitude: -73.99733,
//       zoom: 12
//     }
//   }

//   mapRef = React.createRef()

//   render() {
//     const TOKEN =
//       'pk.eyJ1Ijoia2ltbWExMjYxIiwiYSI6ImNqdDRqeW0yeDFiN2w0M21qYWZ1bnBzZWoifQ.O-7JvQWK8pqXWgSiwIN8tQ'
//     return (
//       <ReactMapGL
//         mapboxApiAccessToken={TOKEN}
//         {...this.state.viewport}
//         onViewportChange={viewport => this.setState({viewport})}
//       >
//         {/* <Dropdown
//           onSearch={this.onSearch}
//           onSelectItem={this.onSelectItem}
//           options={options}
//         /> */}
//         <Geocoder
//           mapRef={this.mapRef}
//           onViewportChange={viewport => this.setState({viewport})}
//           mapboxApiAccessToken={TOKEN}
//           position="top-left"
//         />

//         <Marker
//           latitude={40.7308}
//           longitude={-73.99733}
//           offsetLeft={-20}
//           offsetTop={-10}
//         >
//           {/* <div>You are here</div> */}
//           <img
//             src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
//             height="20"
//             width="20"
//           />
//         </Marker>
//       </ReactMapGL>
//     )
//   }
// }

//TODO: testing sandbox
// import 'mapbox-gl/dist/mapbox-gl.css'
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, {Component} from 'react'

import MapGL, {Marker, Popup} from 'react-map-gl'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2ltbWExMjYxIiwiYSI6ImNqdDRqeW0yeDFiN2w0M21qYWZ1bnBzZWoifQ.O-7JvQWK8pqXWgSiwIN8tQ'

class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    searchResultLayer: null,
    showPopup: false
  }

  mapRef = React.createRef()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
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

  handleOnResult = async event => {
    console.log(event.result)

    const newSearchResultLayer = new GeoJsonLayer({
      id: 'search-result',
      data: event.result.geometry,
      getFillColor: [255, 0, 0, 128],
      getRadius: 1000,
      pointRadiusMinPixels: 10,
      pointRadiusMaxPixels: 10
    })
    this.setState({
      searchResultLayer: newSearchResultLayer
    })
    console.log(
      'HII checking newSearchResultLayer',
      this.state.searchResultLayer
    )
  }

  handleMarkerClick = event => {
    event.preventDefault()

    const {popupInfo} = this.state

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={this.state.searchResultLayer.props.data.coordinates[0]}
          latitude={this.state.searchResultLayer.props.data.coordinates[1]}
          // closeOnClick={false}
          // onClose={() => this.setState({popupInfo: null})}
        >
          <div>hi im here!</div>
          {/* <CityInfo info={popupInfo} /> */}
        </Popup>
      )
    )
  }

  render() {
    const {viewport, searchResultLayer} = this.state

    return (
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
        {this.state.searchResultLayer && (
          <Marker
            latitude={this.state.searchResultLayer.props.data.coordinates[1]}
            longitude={this.state.searchResultLayer.props.data.coordinates[0]}
            offsetLeft={-20}
            offsetTop={-10}
            onClick={this.handleMarkerClick}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
              height="30"
              width="30"
            />
          </Marker>
        )}
        {/* {this.showPopup && (
          <Popup
            coordinates={this.state.searchResultLayer.props.data.coordinates}
          >
            <div>hi im here!</div>
          </Popup>
        )} */}
      </MapGL>
    )
  }
}

export default Map
