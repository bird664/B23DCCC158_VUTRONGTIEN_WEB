// backend/services/dbService.js
const mysql = require('mysql2');
const dbConfig = require('../config/databaseConfig');

const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
