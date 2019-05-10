import React from 'react'

class LocationList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.arrayPrefs.map(userPref => {
          return (
            <div key={userPref.id}>
              <li>
                <font color="gold">
                  <b>{userPref.firstLocation}</b>
                </font>
              </li>
              <li>
                <font color="silver">
                  <b>{userPref.secondLocation}</b>
                </font>
              </li>
              <li>
                <font color="bronze">
                  <b>{userPref.thirdLocation}</b>
                </font>
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
}

export default LocationList
