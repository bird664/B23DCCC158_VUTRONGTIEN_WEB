// frontend/src/components/AddTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = { title, description, due_date: dueDate };
        axios.post('http://localhost:5000/api/tasks', newTask)
            .then(response => {
                // Handle success (reset form, update list, etc.)
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
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;
