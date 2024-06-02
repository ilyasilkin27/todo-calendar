import { useState, useEffect } from 'react';
import './Calendar.scss';
import { Day } from '../Day/Day';

const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [weeks, setWeeks] = useState<number[][]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const switchToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setCurrentWeekIndex(0);
  };

  const switchToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setCurrentWeekIndex(0);
  };

  const switchToPreviousWeek = () => {
    setCurrentWeekIndex((prev) => Math.max(prev - 1, 0));
  };

  const switchToNextWeek = () => {
    setCurrentWeekIndex((prev) => Math.min(prev + 1, weeks.length - 1));
  };

  useEffect(() => {
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weeksArray: number[][] = [];
    let week: number[] = [];

    daysArray.forEach((day, index) => {
      week.push(day);
      if (week.length === 7 || index === daysArray.length - 1) {
        if (week.length < 7) {
          const nextMonthDays = 7 - week.length;
          for (let i = 1; i <= nextMonthDays; i++) {
            week.push(i);
          }
        }
        weeksArray.push(week);
        week = [];
      }
    });

    setWeeks(weeksArray);
  }, [currentMonth, currentYear, daysInMonth]);

  const renderDays = () => {
    if (viewMode === 'month') {
      return weeks.flat().map((day, dayIndex) => (
        <div className="day-container" key={dayIndex}>
          <Day key={day} day={day} currentDate={new Date(currentYear, currentMonth, day)} />
        </div>
      ));
    }

    return weeks[currentWeekIndex]?.map((day, dayIndex) => (
      <div className="day-container" key={dayIndex}>
        <Day key={day} day={day} currentDate={new Date(currentYear, currentMonth, day)} />
      </div>
    ));
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <div className="month-switcher">
          <button onClick={switchToPreviousMonth}>&lt;</button>
          <span>{new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' }).toUpperCase()}</span>
          <button onClick={switchToNextMonth}>&gt;</button>
        </div>
        <div className="view-switcher">
          <button onClick={() => setViewMode('month')}>Month</button>
          <button onClick={() => setViewMode('week')}>Week</button>
        </div>
        {viewMode === 'week' && (
          <div className="week-switcher">
            <button onClick={switchToPreviousWeek}>&lt;</button>
            <span className="weekName">Week {currentWeekIndex + 1}</span>
            <button onClick={switchToNextWeek}>&gt;</button>
          </div>
        )}
        <div className="days">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
