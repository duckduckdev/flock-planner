import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'

class Map extends React.Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 40.7308,
      longitude: -73.99733,
      zoom: 12
    }
  }

  render() {
    const TOKEN =
      'pk.eyJ1Ijoia2ltbWExMjYxIiwiYSI6ImNqdDRqeW0yeDFiN2w0M21qYWZ1bnBzZWoifQ.O-7JvQWK8pqXWgSiwIN8tQ'
    return (
      <ReactMapGL
        mapboxApiAccessToken={TOKEN}
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
      >
        <Marker
          latitude={this.state.viewport.latitude}
          longitude={this.state.viewport.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          {/* <div>You are here</div> */}
          <img
            src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
            height="20"
            width="20"
          />
        </Marker>
      </ReactMapGL>
    )
  }
}

export default Map
