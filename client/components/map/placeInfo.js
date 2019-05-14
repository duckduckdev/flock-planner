import React, {PureComponent} from 'react'

export default class PlaceInfo extends PureComponent {
  render() {
    console.log('PROPS', this.props)
    const {name, category} = this.props.info

    return (
      <div>
        <p>{name}</p>
      </div>
    )
  }
}
