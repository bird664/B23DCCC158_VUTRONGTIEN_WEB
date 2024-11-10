// frontend/src/components/EditTaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskForm = ({ taskToEdit, onSave, onCancel }) => {
    const [title, setTitle] = useState(taskToEdit.title);
    const [description, setDescription] = useState(taskToEdit.description);
    const [dueDate, setDueDate] = useState(taskToEdit.due_date);
    const [completed, setCompleted] = useState(taskToEdit.completed);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = { title, description, due_date: dueDate, completed };
        axios.put(`http://localhost:5000/api/tasks/${taskToEdit.id}`, updatedTask)
            .then(response => {
                onSave(response.data); // Gọi hàm onSave để cập nhật danh sách task
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
            />
            <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
            />
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
            />
            <input 
                type="checkbox" 
                checked={completed} 
                onChange={() => setCompleted(!completed)} 
            /> Completed
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditTaskForm;
