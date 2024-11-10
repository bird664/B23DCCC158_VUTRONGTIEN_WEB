// frontend/src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import EditTaskForm from './EditTaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleSave = (updatedTask) => {
        setTasks(tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        ));
        setEditingTask(null);
    };

    const handleCancel = () => {
        setEditingTask(null);
    };

    return (
        <div>
            <h1>Task List</h1>
            {editingTask ? (
                <EditTaskForm 
                    taskToEdit={editingTask} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            ) : (
                <ul>
                    {tasks.map(task => (
                        <TaskItem 
                            key={task.id} 
                            task={task} 
                            onEdit={handleEdit} 
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
