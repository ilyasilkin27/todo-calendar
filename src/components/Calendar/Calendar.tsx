import React, { useState } from 'react';
import './Calendar.scss';
import { Day } from '../Day/Day';

const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const switchToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const switchToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calendar">
      <div className="month-switcher">
        <button onClick={switchToPreviousMonth}>Previous Month</button>
        <span>{new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={switchToNextMonth}>Next Month</button>
      </div>
      <div className="days">
        {daysArray.map((day) => (
            <Day key={day} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
