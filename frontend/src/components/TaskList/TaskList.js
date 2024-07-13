import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks
    .filter(task => filter === 'All' || task.status === filter)
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="task-list-container">
      <h2>Welcome, {user.username}!</h2>
      <div className="task-controls">
        <Link to="/create" className="create-task-btn">Create New Task</Link>
        <select onChange={(e) => setFilter(e.target.value)} className="task-filter">
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="task-search"
        />
        <select onChange={(e) => setSortBy(e.target.value)} className="task-sort">
          <option value="createdAt">Sort by Created Date</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task._id} className={`task-item ${task.status.toLowerCase().replace(' ', '-')}`}>
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className="task-status">{task.status}</span>
              {task.dueDate && (
                <span className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
            </div>
            <div className="task-actions">
              <Link to={`/edit/${task._id}`} className="edit-btn">Edit</Link>
              <button onClick={() => deleteTask(task._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;