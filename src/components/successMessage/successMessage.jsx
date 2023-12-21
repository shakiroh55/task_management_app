
import React from 'react';
// import './style.css'; // Import the styles

const SuccessMessage = ({ task }) => (
  <div className="success-message">
    <h2>Task Submitted Successfully!</h2>
    <p>Title: {task.title}</p>
    <p>Description: {task.description}</p>
    <p>Due Date: {task.dueDate}</p>
    <p>Assignee: {task.assignee}</p>
  </div>
);

export default SuccessMessage;
