import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/IMG_2816.PNG';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSearchSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <nav>
      <div className="nav__header">
        <div className="nav__logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Aurazy Logo" className="logo-img" />
          </Link>
        </div>

        <div className="nav__actions">
          {/* SEARCH */}
          <i className="ri-search-line nav-icon" id="mobile-search" onClick={toggleSearch}></i>

          {/* USER */}
          <Link to={isLoggedIn ? "/profile" : "/login"}>
            <i className="ri-user-3-line nav-icon" id="mobile-account"></i>
          </Link>

          {/* CART */}
          <div className="cart-icon mobile-cart" id="mobile-cart" onClick={() => { setIsCartOpen(true); closeMenu(); }}>
            <i className="ri-shopping-bag-line nav-icon"></i>
            <span id="mobile-cart-count">{cartCount}</span>
          </div>

          <div className="nav__menu__btn" id="menu-btn" onClick={toggleMenu}>
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </div>
        </div>

        <ul className={`nav__links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
          <li>
            <HashLink smooth to="/#catalogue" onClick={closeMenu}>CATALOGUE</HashLink>
          </li>
          <li>
            <HashLink smooth to="/#fashion" onClick={closeMenu}>FASHION</HashLink>
          </li>
          <li>
            <HashLink smooth to="/#favourite" onClick={closeMenu}>FAVOURITE</HashLink>
          </li>
          <li>
            <HashLink smooth to="/#lifestyle" onClick={closeMenu}>LIFESTYLE</HashLink>
          </li>

          <li className="desktop-icons">
            <button className="icon-btn" id="desktop-search" onClick={toggleSearch}>
              <i className="ri-search-line"></i>
            </button>

            <Link to={isLoggedIn ? "/profile" : "/login"} className="icon-btn" id="desktop-account">
              <i className="ri-user-3-line"></i>
            </Link>

            <button className="icon-btn" id="cart-btn" onClick={() => setIsCartOpen(true)}>
              <i className="ri-shopping-bag-line"></i>
              <span className="cart-count" id="desktop-cart-count">{cartCount}</span>
            </button>
          </li>
        </ul>
      </div>

      <div id="search-box" className={`search-box ${isSearchOpen ? 'show' : ''}`} style={{ display: isSearchOpen ? 'block' : 'none' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={isSearchOpen}
          />
          <i 
            className="ri-search-line" 
            style={{ position: 'absolute', right: '15px', cursor: 'pointer', color: '#000' }}
            onClick={handleSearchSubmit}
          ></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
