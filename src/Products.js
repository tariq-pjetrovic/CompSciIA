import React, { useState, useEffect } from 'react';
import { Link, Link as RouterLink, useNavigate} from 'react-router-dom';
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
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserName = localStorage.getItem('userName');
    const storedRole = localStorage.getItem('role');
        
    if (storedUserName && storedRole) {
      setUser({ userName: storedUserName, role: storedRole });
    }
  }, []);

  useEffect(() => {

    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Update state with valid JSON data
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/wishlist', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
        } else {
          console.error('Failed to fetch wishlist');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
  
    fetchWishlist();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    console.log('Cart:', cart);
    console.log('Wishlist:', wishlist);
  }, [cart, wishlist]);  

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

  const handleAddToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          product: {
            productId: product._id, 
            name: product.name, 
            price: product.price, 
            image: product.image 
          }, 
          quantity 
        }),
      });
  
      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart); // Assuming `setCart` is a state updater function
        alert(`${product.name} has been added to your cart!`);
      } else {
        console.error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };  
  
  const handleToggleWishlist = async (product) => {
    const token = localStorage.getItem('token');
    try {
      const exists = wishlist.some((item) => item._id === product._id);
      const method = exists ? 'DELETE' : 'POST';
      const url =
        'http://localhost:5000/api/wishlist' +
        (exists ? `/${product._id}` : '');
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: !exists ? JSON.stringify({ productId: product._id }) : null,
      });
  
      if (response.ok) {
        const updatedWishlist = await response.json();
        setWishlist(updatedWishlist);
      } else {
        console.error('Failed to update wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };  

  return (
        <div>
        <h1>Products</h1>
        {Array.isArray(products) && products.length > 0 ? (
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

                <button
                  className={`wishlist-heart ${
                    Array.isArray(wishlist) &&
                    wishlist.some((item) => item._id === product._id)
                      ? 'filled'
                      : 'outlined'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent click handler
                    handleToggleWishlist(product);
                  }}
                >
                  {Array.isArray(wishlist) &&
                  wishlist.some((item) => item._id === product._id)
                    ? '❤️'
                    : '🤍'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available.</p>
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
            <button onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
            </div>
        )}

        <div className="cart">
            <h2>Shopping Cart</h2>
            {Array.isArray(products) && cart.length > 0 ? (
            <ul>
                {cart.map((item) => (
                <li key={item._id}>
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </li>
                ))}
            </ul>
            ) : (
            <p>Your cart is empty.</p>
            )}
        </div>

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