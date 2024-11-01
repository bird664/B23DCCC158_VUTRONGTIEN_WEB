const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Route cho đường dẫn gốc
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Thông điệp cho đường dẫn gốc
});

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ]);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
