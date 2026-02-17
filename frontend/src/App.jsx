import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import './App.css'

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = () => {
    fetch('http://localhost:8000/cart')
      .then(res => res.json())
      .then(data => {
        const count = data.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
      })
      .catch(err => console.error("Error fetching cart count:", err));
  };

  const addToCart = (product) => {
    fetch('http://localhost:8000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1
      }),
    })
      .then(res => {
        if (res.ok) {
          fetchCartCount(); // Update badge
          alert("Added to cart!");
        } else {
          alert("Failed to add to cart.");
        }
      })
      .catch(err => console.error("Error adding to cart:", err));
  };

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cartCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart updateCartCount={fetchCartCount} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
