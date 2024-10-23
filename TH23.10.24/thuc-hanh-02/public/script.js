const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
let editProductId = null; // Biến lưu ID sản phẩm đang chỉnh sửa

const API_URL = 'http://localhost:3000/products';

// Hàm hiển thị danh sách sản phẩm
async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
    ${product.name} - ${product.price} 
    <button class="edit-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price})">Chỉnh sửa</button>
    <button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
`;

        productList.appendChild(li);
    });
}

// Hàm thêm/chỉnh sửa sản phẩm
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productData = {
        name: productNameInput.value,
        price: productPriceInput.value
    };

    if (editProductId) {
        // Nếu đang chỉnh sửa sản phẩm
        await fetch(`${API_URL}/${editProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        editProductId = null; // Đặt lại ID sau khi chỉnh sửa
    } else {
        // Nếu đang thêm sản phẩm mới
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
    }

    productNameInput.value = '';
    productPriceInput.value = '';
    fetchProducts(); // Tải lại danh sách sản phẩm
});

// Hàm xóa sản phẩm
async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchProducts(); // Tải lại danh sách sản phẩm
}

// Hàm chỉnh sửa sản phẩm
function editProduct(id, name, price) {
    productNameInput.value = name;
    productPriceInput.value = price;
    editProductId = id; // Lưu lại ID của sản phẩm đang được chỉnh sửa
}

// Tải danh sách sản phẩm khi trang được tải
fetchProducts();
