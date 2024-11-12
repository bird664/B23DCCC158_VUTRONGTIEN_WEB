// frontend/src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialData = {}, onSave, onCancel }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [dueDate, setDueDate] = useState(initialData.due_date || '');
    const [completed, setCompleted] = useState(initialData.completed || false);

    // Cập nhật form mỗi khi initialData thay đổi
    useEffect(() => {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setDueDate(initialData.due_date || '');
        setCompleted(initialData.completed || false);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, due_date: dueDate, completed });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
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
            <label>
                <input 
                    type="checkbox" 
                    checked={completed} 
                    onChange={() => setCompleted(!completed)} 
                /> 
                Completed
            </label>
            <div style={{ marginTop: '10px' }}>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</button>
            </div>
        </form>
    );
};

export default TaskForm;
