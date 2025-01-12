import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiBell, FiHeart, FiUser, FiMessageCircle } from 'react-icons/fi';

function Head({ darkText }) {
  const location = useLocation();
  const isProductsPage = location.pathname.includes('/products');

  return (
    <nav className={`navbar ${darkText ? 'navbar-dark-text' : ''} ${isProductsPage ? 'navbar-products' : ''}`}>
      <div className="navbar-container">
        {/* Sol Grup */}
        <div className="nav-left">
          <Link to="/" className="logo">
         
            <img src="/logo-alfa-white.png" alt="ALFA" className="logo-img" / >
          </Link>
          <div className="categories">
            <Link to="/vasita" className="nav-link">
              Vasıta <span className="count">(8.745)</span>
            </Link>
            <Link to="/otomobil" className="nav-link active">
              Otomobil <span className="count">(6.234)</span>
            </Link>
          </div>
        </div>

        {/* Orta - Arama */}
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text"
            placeholder="Araba, model veya marka ara..."
            className="search-input"
          />
        </div>

        {/* Sağ Grup */}
        <div className="nav-right">
          <button className="btn-primary">
            
          </button>
          <div className="nav-icons">
            <Link to="/mesajlar" className="icon-link">
              <FiMessageCircle size={20} />
              <span className="badge">2</span>
            </Link>
            <Link to="/bildirimler" className="icon-link">
              <FiBell size={20} />
              <span className="badge">5</span>
            </Link>
            <Link to="/favoriler" className="icon-link">
              <FiHeart size={20} />
            </Link>
            <Link to="/hesabim" className="icon-link">
              <FiUser size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Head;
