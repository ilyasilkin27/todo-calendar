import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Record<string, Task[]>;
  addTask: (date: string, text: string) => void;
  removeTask: (date: string, taskId: string) => void;
  toggleTask: (date: string, taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});

  const addTask = (date: string, text: string) => {
    const newTask: Task = { id: Date.now().toString(), text, completed: false };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: [...(prevTasks[date] || []), newTask],
    }));
  };

  const removeTask = (date: string, taskId: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: prevTasks[date].filter((task) => task.id !== taskId),
    }));
  };

  const toggleTask = (date: string, taskId: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: prevTasks[date].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
