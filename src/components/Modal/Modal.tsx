import React, { useState } from 'react';
import './Modal.scss';
import { useTaskContext } from '../../contexts/TaskContext';

interface ModalProps {
  day: number;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ day, onClose }) => {
  const { tasks, addTask, removeTask, toggleTask } = useTaskContext();
  const [newTaskText, setNewTaskText] = useState('');
  const date = new Date().toISOString().split('T')[0];

  const handleAddTask = () => {
    addTask(date, newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Tasks for {day}</h2>
        <ul>
          {tasks[date]?.map((task) => (
            <li key={task.id}>
              {task.text}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(date, task.id)}
              />
              <button onClick={() => removeTask(date, task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};
