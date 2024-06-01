import React, { useState } from 'react';
import './Day.scss';
import { Modal } from '../Modal/Modal';
import { useTaskContext } from '../../contexts/TaskContext';

interface DayProps {
  day: number;
}

export const Day: React.FC<DayProps> = ({ day }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useTaskContext();
  const date = new Date().toISOString().split('T')[0];

  return (
    <div className="day" onClick={() => setIsModalOpen(true)}>
      <span>{day}</span>
      {tasks[date]?.length > 0 && <span>{tasks[date].length}</span>}
      {isModalOpen && <Modal day={day} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
