import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiBell, FiHeart, FiUser, FiMessageCircle, FiPlus } from 'react-icons/fi';

function Head() {
  const location = useLocation();
  const isDarkText = location.pathname.includes('/arac/') || 
                     location.pathname === '/products' || 
                     location.pathname === '/account'  ||
                     location.pathname === '/ilanver';  
 

  return (
    <nav className={`navbar ${isDarkText ? 'navbar-dark-text' : ''}`}>
      <div className="navbar-container">
        {/* Sol Grup */}
        <div className="nav-left">
          <Link to="/" className="logo">
            <img 
              src={isDarkText ? "/logo-alfa-white.png" : "/logo-alfa-white.png"} 
              alt="ALFA" 
              className="logo-img" 
            />
          </Link>
          <div className="categories">
            <Link to="/vasita" className={`nav-link ${isDarkText ? 'dark-text' : ''}`}>
               <span className="count"></span>
            </Link>
            <Link to="/otomobil" className={`nav-link active ${isDarkText ? 'dark-text' : ''}`}>
               <span className="count"></span>
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
          <div className="nav-icons">
            <Link to="/mesajlar" className={`icon-link ${isDarkText ? 'dark-text' : ''}`}>
              <FiMessageCircle size={20} />
              <span className="badge">2</span>
            </Link>
            <Link to="/bildirimler" className={`icon-link ${isDarkText ? 'dark-text' : ''}`}>
              <FiBell size={20} />
              <span className="badge">5</span>
            </Link>
            <Link to="/ilanver" className={`icon-link ${isDarkText ? 'dark-text' : ''}`}>
              <FiPlus size={20} />
            </Link>
            <Link to="/account" className={`icon-link ${isDarkText ? 'dark-text' : ''}`}>
              <FiUser size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Head;
