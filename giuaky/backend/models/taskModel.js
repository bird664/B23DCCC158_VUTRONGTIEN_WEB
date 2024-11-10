// backend/models/taskModel.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

const getAllTasks = (callback) => {
    db.query('SELECT * FROM tasks', callback);
};

const addTask = (task, callback) => {
    db.query('INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)', 
        [task.title, task.description, task.due_date], callback);
};

const updateTask = (id, task, callback) => {
    db.query('UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?',
        [task.title, task.description, task.due_date, task.completed, id], callback);
};

const deleteTask = (id, callback) => {
    db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
