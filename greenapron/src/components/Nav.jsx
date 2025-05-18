import React, { useState } from 'react';
import './Nav.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo" onClick={toggleDropdown}>
        ☰
      </div>
      {isOpen && (
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/board">Board</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
