import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = ({ token, setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  console.log('Nav render. Token:', token)

  return (
    <nav className="nav-bar">
      <div className="nav-logo" onClick={toggleDropdown}>
        ☰
      </div>
      {isOpen && (
        <ul className="nav-links">
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
      )}
    </nav>
  );
};

export default Nav;

