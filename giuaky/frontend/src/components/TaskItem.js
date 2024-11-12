// frontend/src/components/TaskItem.js
import React from 'react';
import { updateTask } from '../services/apiService';
import '../App.css'; // Import CSS nếu bạn đã thêm vào App.css

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
        <li className="task-item">
            <div className="task-content">
                <strong className="task-title">{task.title}</strong>
                <p className="task-description">{task.description}</p>
                <small className="task-date">
                    Due Date: {new Date(task.due_date).toLocaleDateString('en-GB')}
                </small>
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
            <div className="task-buttons">
                <button onClick={() => onEdit(task)} className="button button-edit">Edit</button>
                <button onClick={() => onDelete(task.id)} className="button button-delete">Delete</button>
            </div>
        </li>
    );
};

export default TaskItem;
