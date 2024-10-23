const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Danh sách sản phẩm mẫu
let products = [
    { id: 1, name: 'Sản phẩm A', price: 100 },
    { id: 2, name: 'Sản phẩm B', price: 200 }
];
app.use(express.static(path.join(__dirname, 'public')));

// GET: Lấy danh sách sản phẩm
app.get('/products', (req, res) => {
    res.json(products);
});

// POST: Thêm sản phẩm mới
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1, // Tạo ID mới
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct); // Trả về sản phẩm đã tạo
});

// PUT: Cập nhật sản phẩm theo ID
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).send('Sản phẩm không tìm thấy');
    }

    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product); // Trả về sản phẩm đã cập nhật
});

// DELETE: Xóa sản phẩm theo ID
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).send('Sản phẩm không tìm thấy');
    }

    products.splice(productIndex, 1); // Xóa sản phẩm khỏi danh sách
    res.status(204).send(); // Trả về trạng thái 204 No Content
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
