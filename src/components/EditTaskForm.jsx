import React, { useState } from 'react';

const EditTaskForm = ({ task, onEdit }) => {
  const [title, setTitle] = useState(task.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ ...task, title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditTaskForm;
