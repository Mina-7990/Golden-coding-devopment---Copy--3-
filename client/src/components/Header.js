import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Import a CSS file for styling

const Header = ({ userInfo, logoutHandler }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Golden coding devopment</h1>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'active' : ''}`}></div>
      </div>
      {isMenuOpen && (
        <nav className="side-menu">
          <ul>
            <li>
              <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            </li>
            {userInfo && !userInfo.isAdmin && (
              <>
                <li>
                  <NavLink to="/lessons-list" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Lesson List</NavLink>
                </li>
                <li>
                  <NavLink to="/my-lessons" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>My Lessons</NavLink>
                </li>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <li>
                <NavLink to="/admin" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Admin Panel</NavLink>
              </li>
            )}
            {!userInfo ? (
              <>
                <li>
                  <NavLink to="/login" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register" onClick={toggleMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Register</NavLink>
                </li>
              </>
            ) : (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
