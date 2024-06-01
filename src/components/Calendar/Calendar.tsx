import React from 'react';
import './Calendar.scss';
import { Day } from '../Day/Day';

const Calendar = () => {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar">
      {daysArray.map((day) => (
        <Day key={day} day={day} />
      ))}
    </div>
  );
};

export default Calendar;
