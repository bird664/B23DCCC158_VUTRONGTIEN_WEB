// backend/controllers/taskController.js
const taskModel = require('../models/taskModel');

const getAllTasks = (req, res) => {
    taskModel.getAllTasks((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

const addTask = (req, res) => {
    const newTask = req.body;
    taskModel.addTask(newTask, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, ...newTask });
    });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    taskModel.updateTask(id, updatedTask, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, ...updatedTask });
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    taskModel.deleteTask(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).end();
    });
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
