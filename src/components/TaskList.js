import React, { useState, useEffect } from 'react';
import Task from './Task';
import Modal from 'react-modal';
import './TaskList.css';

Modal.setAppElement('#root');

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description, dueDate, priority, tags) => {
    const newTask = { id: Date.now(), description, dueDate, priority, tags, completed: false };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newDescription, newDueDate, newPriority, newTags) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, description: newDescription, dueDate: newDueDate, priority: newPriority, tags: newTags } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  }).filter(task => task.description.toLowerCase().includes(search.toLowerCase()));

  const openModal = (task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalIsOpen(false);
  };

  return (
    <div className="task-list">
      <div className="task-input">
        <input type="text" placeholder="New Task" onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            addTask(e.target.value.trim(), '', 'Low', []);
            e.target.value = '';
          }
        }} />
        <input type="date" placeholder="Due Date" />
        <select>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="text" placeholder="Tags (comma separated)" />
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <div className="search">
        <input type="text" placeholder="Search tasks..." onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ul>
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} toggleComplete={toggleComplete} openModal={openModal} />
        ))}
      </ul>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedTask && (
          <div className="task-details">
            <h2>Task Details</h2>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Tags:</strong> {selectedTask.tags.join(', ')}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TaskList;
