import React from 'react'

class DateList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.arrayPrefs.map(userPref => {
          return (
            <div key={userPref.id}>
              <li>
                <font color="gold">
                  <b>{userPref.firstDates}</b>
                </font>
              </li>
              <li>
                <font color="silver">
                  <b>{userPref.secondDates}</b>
                </font>
              </li>
              <li>
                <font color="bronze">
                  <b>{userPref.thirdDates}</b>
                </font>
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
}

export default DateList
