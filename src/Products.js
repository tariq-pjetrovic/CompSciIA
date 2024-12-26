import React, { useState, useEffect } from 'react';
import './Product.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });  
  console.log('User in render:', user); // Debugging
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  // Fetch user data and products on component mount
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserName = localStorage.getItem('userName');
    const storedRole = localStorage.getItem('role');

    if (storedUserName && storedRole) {
      setUser({ userName: storedUserName, role: storedRole });
    }

    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Ensure the admin is authenticated
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts([...products, data]); // Update the product list
        setNewProduct({ name: '', description: '', price: '', image: '' });
        alert('Product added successfully');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        alert('Product deleted successfully');
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
            >
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Sorry, no products available.</p>
      )}

      {selectedProduct && (
        <div className="product-modal">
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>${selectedProduct.price.toFixed(2)}</p>
          {user?.role === 'admin' && (
            <button onClick={() => handleDeleteProduct(selectedProduct._id)}>Delete</button>
          )}
          <button onClick={() => setSelectedProduct(null)}>Close</button>
          <button>Add to Cart</button>
        </div>
      )}

      {/* Admin-only features */}
      {user?.role === 'admin' && (
        <div>
          <h3>Admin Panel</h3>
          <button onClick={() => setShowAddProduct((prev) => !prev)}>
            {showAddProduct ? 'Cancel' : 'Add New Product'}
          </button>
          {showAddProduct && (
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                required
              />
              <button type="submit">Add Product</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;