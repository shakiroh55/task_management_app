// TaskForm.jsx

import React, { useState } from 'react';
import '../../components/taskList/style.css';
import SuccessMessage from '../successMessage/successMessage';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [submittedTask, setSubmittedTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      assignee,
      status: 'pending',
    };

    onSubmit(newTask);
    setSubmittedTask(newTask);

    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignee('');
  };

  return (
    <div>
      {submittedTask ? (
        <SuccessMessage task={submittedTask} />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Due Date:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

          <label>Assignee:</label>
          <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} required />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
