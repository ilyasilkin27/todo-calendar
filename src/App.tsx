import React from 'react';
import './App.scss';
import { TaskProvider } from './contexts/TaskContext';
import Calendar from './components/Calendar/Calendar';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app">
        <Calendar />
      </div>
    </TaskProvider>
  );
};

export default App;
