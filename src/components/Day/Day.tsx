import React from 'react';
import './Day.scss';
import { useTaskContext } from '../../contexts/TaskContext';

interface DayProps {
  day: number;
  onDayClick: () => void;
}

export const Day: React.FC<DayProps> = ({ day, onDayClick }) => {
  const { tasks } = useTaskContext();
  const date = new Date(new Date().getFullYear(), new Date().getMonth(), day).toISOString().split('T')[0];

  return (
    <div className="day" onClick={onDayClick}>
      <span>{day}</span>
      {tasks[date]?.length > 0 && <span>•</span>}
    </div>
  );
};
