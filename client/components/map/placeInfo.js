import React, {PureComponent} from 'react'

export default class PlaceInfo extends PureComponent {
  render() {
    const {name, category} = this.props.info

    return (
      <div>
        <p>{name}</p>
      </div>
    )
  }
}
