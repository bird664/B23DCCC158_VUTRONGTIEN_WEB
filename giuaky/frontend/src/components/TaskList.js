// frontend/src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../services/apiService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    // Tải tất cả tasks từ API
    const loadTasks = async () => {
        try {
            const response = await fetchTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // Hàm xử lý lưu task mới hoặc cập nhật task đã chỉnh sửa
    const handleSaveTask = async (task) => {
        try {
            if (editingTask) {
                // Cập nhật task đang chỉnh sửa
                await updateTask(editingTask.id, task);
                setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                        t.id === editingTask.id ? { ...t, ...task } : t
                    )
                );
            } else {
                // Thêm task mới
                const response = await addTask(task);
                setTasks((prevTasks) => [...prevTasks, response.data]);
            }
            setEditingTask(null); // Đặt lại trạng thái sau khi lưu để trở về chế độ thêm mới
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    // Hàm xử lý xóa task
    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Hàm xử lý cập nhật trạng thái completed của task
    const handleToggleComplete = (id, completed) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed } : task
            )
        );
    };

    return (
        <div>
            <h1>Task List</h1>
            <TaskForm 
                initialData={editingTask || {}} 
                onSave={handleSaveTask} 
                onCancel={() => setEditingTask(null)} 
            />
            <ul>
                {tasks.map((task) => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onEdit={() => setEditingTask(task)} 
                        onDelete={handleDeleteTask} 
                        onToggleComplete={handleToggleComplete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
