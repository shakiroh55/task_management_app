import React, { useState, useEffect } from 'react';
import Task from '../task/task';
import { useDrop } from 'react-dnd';
import '../../components/taskPage/style.css'; 

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch tasks from the backend or use mock data
    const fetchedTasks = [
      { id: 1, title: 'Task Page 1', description: 'Description 1', dueDate: '2023-12-20', assignee: 'User A', priority: 'high', completed: false },
      { id: 2, title: 'Task Page 2', description: 'Description 2', dueDate: '2023-12-21', assignee: 'User B', priority: 'low', completed: false },
      { id: 3, title: 'Task Page 3', description: 'Description 3', dueDate: '2023-12-22', assignee: 'User C', priority: 'medium', completed: false },
    ];
    setTasks(fetchedTasks);
  }, []);

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const [, drop] = useDrop({ accept: 'TASK' });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF6347'; // Tomato
      case 'medium':
        return '#FFD700'; // Gold
      case 'low':
        return '#90EE90'; // LightGreen
      default:
        return '#FFFFFF'; // Default color
    }
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      if (statusFilter === 'all') {
        return true; // Show all tasks
      } else {
        return statusFilter === 'completed' ? task.completed : !task.completed;
      }
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        return a.priority.localeCompare(b.priority);
      } else {
        return 0;
      }
    });

  return (
    <div className="task-page-container">
      <div className='status-filter'>
        <label>
          Status Filter:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
      </div>

      <div className='sort-by'>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className="task-list" ref={drop}>
        {filteredAndSortedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskCompletion={handleTaskCompletion}
            priorityColor={getPriorityColor(task.priority)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
