import React, {PureComponent} from 'react'

export default class PlaceInfo extends PureComponent {
  render() {
    const {info} = this.props
    const displayName = info.placeName

    return (
      <div>
        <p>{displayName}</p>
        <p>{info.address}</p>
      </div>
    )
  }
}
