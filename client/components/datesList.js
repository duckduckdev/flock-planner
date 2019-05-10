import React from 'react'

class DateList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.arrayPrefs.map(userPref => {
          return (
            <div key={userPref.id}>
              <li>
                <font color="gold">{userPref.firstDates}</font>
              </li>
              <li>
                <font color="silver">{userPref.secondDates}</font>
              </li>
              <li>
                <font color="bronze">{userPref.thirdDates}</font>
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
}

export default DateList
