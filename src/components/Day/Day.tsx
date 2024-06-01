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
  const { tasks } = useTaskContext();
  const [isHolidayDay, setIsHolidayDay] = useState(false);

  useEffect(() => {
    const checkHoliday = async () => {
      const result = await isHoliday(currentDate);
      setIsHolidayDay(result);
    };
    checkHoliday();
  }, [currentDate]);

  const date = currentDate.toISOString().split('T')[0];

  const onDayClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={`day ${tasks[date]?.length > 0 ? 'has-tasks' : ''} ${isHolidayDay ? 'holiday' : ''}`} onClick={onDayClick}>
      <span>{day}</span>
      {isModalOpen && <Modal day={day} currentDate={currentDate} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
