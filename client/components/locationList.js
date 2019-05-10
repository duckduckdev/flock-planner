import React from 'react'

class LocationList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.arrayPrefs.map(userPref => {
          return (
            <div key={userPref.id}>
              <li>
                <font color="gold">{userPref.firstLocation}</font>
              </li>
              <li>
                <font color="silver">{userPref.secondLocation}</font>
              </li>
              <li>
                <font color="bronze">{userPref.thirdLocation}</font>
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
}

export default LocationList
