import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const TaskContainer = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin: 8px 0;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: move;

  & > div {
    flex: 1;
  }

  input {
    cursor: pointer;
  }
`;

const Task = ({ task, onTaskCompletion }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK', // Define the type property
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <TaskContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Assignee: {task.assignee}</p>
        <p>Priority: {task.priority}</p>
      </div>
      <div>
        <input type="checkbox" checked={task.completed} onChange={() => onTaskCompletion(task.id)} />
      </div>
    </TaskContainer>
  );
};

export default Task;
