import { useState } from 'react';
import './Calendar.scss';
import { Day } from '../Day/Day';
import { Modal } from '../Modal/Modal';

const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="calendar">
      <div className="month-switcher">
        <button onClick={switchToPreviousMonth}>&#9664;</button>
        <span className="month-year">{new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={switchToNextMonth}>&#9654;</button>
      </div>
      <div className="days">
        {daysArray.map((day) => (
          <Day key={day} day={day} onDayClick={() => handleDayClick(day)} />
        ))}
      </div>
      {selectedDate && (
        <Modal
          day={selectedDate.getDate()}
          currentDate={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
