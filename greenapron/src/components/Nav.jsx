import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = ({ token, setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(prev => {
      console.log('Toggling menu', !prev);
      return !prev;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };


  return (
    <nav className="nav-bar">
      <div 
        className="nav-logo" 
        onClick={toggleDropdown}
        aria-label='Toggle menu'
        role='button'
        tabIndex={0}
        onKeyDown={(e)=> {
          if (e.key === 'Enter' || e.key === ' ') toggleDropdown();
        }}
      >
        ☰
      </div>
  
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/board">Board</Link></li>
          {!token ? (
            <li><Link to="/login">Login</Link></li>
          ) : (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          )}
        </ul>
    </nav>
  );
};

export default Nav;

