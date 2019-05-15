// given a date, render a calendar that shows that date selected
// ummm
// ok so you CAN pass a string to be highlighted on the calendar
// given some dates, let's try to select a RANGE

import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

let date1 = new Date('Wed May 15 2019 12:00:00 GMT-0400 (Eastern Daylight Time)')
let date2 = new Date('Mon May 20 2019 12:00:00 GMT-0400 (Eastern Daylight Time)')

export default function Example() {
  const modifiers = { start: date1, end: date2 }

  return (
    <DayPicker
      modifiers={modifiers}
      // initialMonth={new Date(2017, 3)}
      
      selectedDays={[
        // new Date('Wed May 29 2019 12:00:00 GMT-0400 (Eastern Daylight Time)'),

        {from: date1, to: date2}
        // new Date(2017, 3, 2),
        // {
        //   after: new Date(2017, 3, 20),
        //   before: new Date(2017, 3, 25),
        // },
      ]}
    />
  );
}