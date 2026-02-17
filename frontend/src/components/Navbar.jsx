import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">ShopMax</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Products</Link>
                <Link to="/cart" className="cart-link">
                    Cart
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
