import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskForm = ({ taskToEdit, onSave, onCancel }) => {
    const [title, setTitle] = useState(taskToEdit.title);
    const [description, setDescription] = useState(taskToEdit.description);
    const [dueDate, setDueDate] = useState(taskToEdit.due_date);
    const [completed, setCompleted] = useState(taskToEdit.completed);

    useEffect(() => {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setDueDate(taskToEdit.due_date);
        setCompleted(taskToEdit.completed);
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTask = { title, description, due_date: dueDate, completed };
        try {
            const response = await axios.put(`http://localhost:5000/api/tasks/${taskToEdit.id}`, updatedTask);
            onSave(response.data); // Cập nhật task trong TaskList
        } catch (error) {
            console.error('Error updating task:', error);
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
            <input 
                type="checkbox" 
                checked={completed} 
                onChange={() => setCompleted(!completed)} 
            />
            Completed
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditTaskForm;
