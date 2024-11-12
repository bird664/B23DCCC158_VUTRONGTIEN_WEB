// frontend/src/components/TaskItem.js
import React, { useState } from 'react';
import axios from 'axios';

// Hàm hỗ trợ định dạng ngày tháng theo kiểu dd-mm-yyyy
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Định dạng ngày theo dd-mm-yyyy
};

const TaskItem = ({ task, onEdit, onDelete }) => {
    const [completed, setCompleted] = useState(task.completed);

    // Chuyển trạng thái hoàn thành của task
    const handleToggleCompletion = () => {
        const updatedTask = { ...task, completed: !completed };
        axios.put(`http://localhost:5000/api/tasks/${task.id}`, updatedTask)
            .then(() => {
                setCompleted(!completed);
            })
            .catch(error => console.error('Error updating task completion:', error));
    };

    // Xóa task
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/tasks/${task.id}`)
            .then(() => {
                onDelete(task.id); // Xóa task khỏi danh sách
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <li>
            <input 
                type="radio" 
                checked={completed} 
                onChange={handleToggleCompletion} 
            />
            <div>
                <strong>{task.title}</strong>
            </div>
            <div>{task.description}</div>
            <div>{formatDate(task.due_date)}</div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => onEdit(task)}>Edit</button>
        </li>
    );
};

export default TaskItem;
