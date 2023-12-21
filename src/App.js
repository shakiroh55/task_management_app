// MainApp.jsx

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import TaskForm from './components/taskForm/taskForm';
import './style.css';

const MainApp = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    // Generate a unique ID using uuid
    newTask.id = uuidv4();
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Task Management Application</h1>
      <TaskForm onSubmit={addTask} />
    </div>
  );
};

export default MainApp;
