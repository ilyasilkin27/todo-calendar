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
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];

  useEffect(() => {
    const checkHoliday = async () => {
      const holiday = await isHoliday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      setIsHolidayDay(holiday);
    };

    checkHoliday();
  }, [currentDate, day]);

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
