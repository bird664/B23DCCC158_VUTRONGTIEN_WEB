import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleSave = (updatedTask) => {
        // Cập nhật task trong state sau khi lưu
        setTasks(prevTasks =>
            prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditingTask(null); // Đóng form chỉnh sửa
    };

    const handleCancel = () => {
        setEditingTask(null); // Đóng form mà không thay đổi gì
    };

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <div>
            <h1>Task List</h1>
            <AddTaskForm onTaskAdded={handleAddTask} />
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
                            onDelete={handleDelete} 
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
