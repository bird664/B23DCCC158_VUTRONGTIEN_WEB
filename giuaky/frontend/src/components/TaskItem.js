// frontend/src/components/TaskItem.js
import React from 'react';
import { updateTask } from '../services/apiService';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
    const handleToggleComplete = async () => {
        const updatedTask = { ...task, completed: !task.completed };
        try {
            await updateTask(task.id, updatedTask);
            onToggleComplete(task.id, updatedTask.completed);
        } catch (error) {
            console.error('Error updating task completion:', error);
        }
    };

    return (
        <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <small>Due Date: {new Date(task.due_date).toLocaleDateString('en-GB')}</small>
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={handleToggleComplete} 
                        /> 
                        Completed
                    </label>
                </div>
            </div>
            <div>
                <button onClick={() => onEdit(task)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </li>
    );
};

export default TaskItem;
