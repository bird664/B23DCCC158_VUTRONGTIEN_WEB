// backend/models/taskModel.js
const db = require('../services/dbService');

const getAllTasks = () => db.query('SELECT * FROM tasks');
const addTask = (task) => db.query('INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)', [task.title, task.description, task.due_date]);
const updateTask = (id, task) => db.query('UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?', [task.title, task.description, task.due_date, task.completed, id]);
const deleteTask = (id) => db.query('DELETE FROM tasks WHERE id = ?', [id]);

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
