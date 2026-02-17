import React, { useState, useEffect } from 'react';

const Cart = ({ updateCartCount }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        fetch('http://localhost:8000/cart')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCartItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart:', error);
                setError('Failed to load cart. Please try again later.');
                setLoading(false);
            });
    };

    const removeFromCart = (productId) => {
        fetch(`http://localhost:8000/cart/${productId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    fetchCart(); // Refresh cart
                    if (updateCartCount) updateCartCount();
                    // You might want to update a global cart count here in a real app
                    // For this simple example, we might rely on a passed prop or context update
                    // But since Navbar gets cartCount from parent, we need to trigger an update upstairs.
                    // For now, let's just update local state to reflect removal immediately
                    setCartItems(prev => prev.filter(item => item.product_id !== productId));
                } else {
                    console.error('Failed to remove item');
                }
            })
            .catch(error => console.error('Error removing item:', error));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    if (loading) return <div className="loading">Loading cart...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.product_id} className="cart-item">
                                <div className="cart-item-details">
                                    <h3>{item.product_name}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.product_id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: ${calculateTotal()}</h3>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
