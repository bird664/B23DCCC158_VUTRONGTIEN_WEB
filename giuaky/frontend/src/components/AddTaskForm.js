// frontend/src/components/AddTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Gửi dữ liệu thêm task mới lên API
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = { title, description, due_date: dueDate };
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', newTask);
            onTaskAdded(response.data); // Cập nhật danh sách task sau khi thêm
            setTitle(''); // Reset form
            setDescription('');
            setDueDate('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                required 
            />
            <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
                required 
            />
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
                required 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;
