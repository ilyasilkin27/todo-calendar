import React, { useState } from 'react';
import './Modal.scss';
import { useTaskContext } from '../../contexts/TaskContext';

interface ModalProps {
  day: number;
  currentDate: Date;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ day, currentDate, onClose }) => {
  const { tasks, addTask, removeTask, toggleTask } = useTaskContext();
  const [newTaskText, setNewTaskText] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const date = currentDate.toISOString().split('T')[0];

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      addTask(date, newTaskText);
      setNewTaskText('');
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleToggleTask = (taskId: string) => {
    toggleTask(date, taskId);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-header'>
            <button className="close-button" onClick={(e) => { e.stopPropagation(); onClose(); }}>×</button>
            <h2>Tasks for {day}</h2>
        </div>
        <div className='modal-body'>
            <ul>
            {tasks[date]?.map((task) => (
                <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                />
                <button onClick={() => removeTask(date, task.id)}>Delete</button>
                </li>
            ))}
            </ul>
        </div>
        <div>
            <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            />
            {showWarning && <p style={{ color: 'red' }}>Please en
            ter a non-empty task.</p>}
            <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
};
