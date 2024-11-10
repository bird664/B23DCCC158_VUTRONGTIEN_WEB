// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
