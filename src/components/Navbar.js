import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // import Link
import './Navbar.css';
import Logo from '../assets/images/logo-pf.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <nav className="navbar">
    <div className="logo">
      <img src={Logo} alt="Logo" className="logo-img" />

      <div className="logo-text">
        <h1 className="myName">HM</h1>
      </div>
    </div>

    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/experience">Experience</Link>
      <Link to="/contact">Contact</Link>
    </div>

    <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
      ☰
    </div>
  </nav>
  );
}

export default Navbar;
