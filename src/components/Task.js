import React, { useState } from 'react';

const Task = ({ task, editTask, deleteTask, toggleComplete, openModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDueDate, setNewDueDate] = useState(task.dueDate);
  const [newPriority, setNewPriority] = useState(task.priority);
  const [newTags, setNewTags] = useState(task.tags.join(', '));

  return (
    <li className={`task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={() => {
              editTask(task.id, newDescription, newDueDate, newPriority, newTags.split(', '));
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editTask(task.id, newDescription, newDueDate, newPriority, newTags.split(', '));
                setIsEditing(false);
              }
            }}
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
          />
        </div>
      ) : (
        <span onClick={() => toggleComplete(task.id)}>
          {task.description}
        </span>
      )}
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => openModal(task)}>Details</button>
    </li>
  );
};

export default Task;
