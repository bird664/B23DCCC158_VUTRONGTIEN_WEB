// frontend/src/components/TaskItem.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onEdit }) => {
    const [completed, setCompleted] = useState(task.completed);

    const handleToggleCompletion = () => {
        const updatedTask = { ...task, completed: !completed };
        axios.put(`http://localhost:5000/api/tasks/${task.id}`, updatedTask)
            .then(response => {
                setCompleted(!completed);
            })
            .catch(error => console.error(error));
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/tasks/${task.id}`)
            .then(() => {
                // Update the task list (to be implemented)
            })
            .catch(error => console.error(error));
    };

    return (
        <li>
            <input 
                type="radio" 
                checked={completed} 
                onChange={handleToggleCompletion} 
            />
            {task.title} - {task.due_date}
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => onEdit(task)}>Edit</button>
        </li>
    );
};

export default TaskItem;
