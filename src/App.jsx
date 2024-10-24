import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const response = await fetch('https://task-backend-culturelinkr-chandan.onrender.com/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (task) => {
    await fetch('https://task-backend-culturelinkr-chandan.onrender.com/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const editTask = async (task) => {
    await fetch(`https://task-backend-culturelinkr-chandan.onrender.com/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    setEditingTask(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`https://task-backend-culturelinkr-chandan.onrender.com/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const toggleTaskCompletion = async (id, completed) => {
    await fetch(`https://task-backend-culturelinkr-chandan.onrender.com/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <a href="https://www.linkedin.com/in/saichandanyadav/" className="follow-button" target="_blank" rel="noopener noreferrer">
        Follow Me on LinkedIn
      </a>
      <AddTaskForm onAdd={addTask} />
      {editingTask ? (
        <EditTaskForm task={editingTask} onEdit={editTask} />
      ) : (
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} onToggle={toggleTaskCompletion} />
      )}
    </div>
  );
};

export default App;
