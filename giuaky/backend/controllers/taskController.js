// backend/controllers/taskController.js
const taskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
    try {
        const [rows] = await taskModel.getAllTasks();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addTask = async (req, res) => {
    const newTask = req.body;
    try {
        const [result] = await taskModel.addTask(newTask);
        res.status(201).json({ id: result.insertId, ...newTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    try {
        const [result] = await taskModel.updateTask(id, updatedTask);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ id, ...updatedTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await taskModel.deleteTask(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
