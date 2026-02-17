import React, { useState, useEffect } from 'react';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-list-container">
            <h2>Featured Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-container">
                            <img src={product.image_url} alt={product.name} className="product-image" />
                        </div>
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
