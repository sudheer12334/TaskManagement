import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      const { title, description, status, dueDate } = res.data;
      setTitle(title);
      setDescription(description);
      setStatus(status);
      setDueDate(dueDate ? new Date(dueDate).toISOString().split('T')[0] : '');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, dueDate };
    try {
      if (id) {
        await axios.patch(`http://localhost:5000/api/tasks/${id}`, taskData);
      } else {
        await axios.post('http://localhost:5000/api/tasks', taskData);
      }
      nav('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-form-container">
      <h2>{id ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          {id ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;