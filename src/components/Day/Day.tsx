import React, { useState, useEffect } from 'react';
import './Day.scss';
import { Modal } from '../Modal/Modal';
import { useTaskContext } from '../../contexts/TaskContext';
import isHoliday from '../../utils/isDayOff';

interface DayProps {
  day: number;
  currentDate: Date;
}

export const Day: React.FC<DayProps> = ({ day, currentDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHolidayDay, setIsHolidayDay] = useState(false);
  const { tasks } = useTaskContext();
  const date = currentDate.toISOString().split('T')[0];

  const onDayClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const checkHoliday = async () => {
      const dateToCheck = new Date(currentDate);
      dateToCheck.setDate(day);
      const result = await isHoliday(dateToCheck);
      setIsHolidayDay(result);
    };

    checkHoliday();
  }, [day, currentDate]);

  const dayClasses = ['day'];
  if (tasks[date]?.length > 0) dayClasses.push('has-tasks');
  if (isHolidayDay) dayClasses.push('holiday');

  return (
    <div
      className={dayClasses.join(' ')}
      onClick={onDayClick}
    >
      <span>{day}</span>
      {isModalOpen && <Modal day={day} currentDate={currentDate} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
