const express = require('express');
const todosRouter = require('./src/routers/todos'); // Đường dẫn đã điều chỉnh
const app = express();

// Các cấu hình khác...
app.use(express.json()); // Đảm bảo rằng bạn có middleware để xử lý JSON

app.use('/todos', todosRouter);

// Khởi động ứng dụng...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
