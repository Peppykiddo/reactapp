import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
    document.body.classList.toggle('light-mode', isDarkMode);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">JMS PVT LIMITED</Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Services
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/Updatematerialreceipt" className="dropdown-item">Update Material Receipt</Link>
                <Link to="/Updateothertable" className="dropdown-item">Update other table</Link>
                <Link to="/Instructions" className="dropdown-item">Instructions</Link>
                <Link to="/Formtable" className="dropdown-item">FormTable</Link>
                <Link to="/EMD" className="dropdown-item">EMD</Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="theme-toggle">
          <button onClick={toggleDarkMode} className="btn-theme-toggle">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
