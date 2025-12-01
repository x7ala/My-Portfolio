import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/images/logo-pf.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo-img" />
        <div className="logo-text">
          <h1 className="myName">HM</h1>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`menu ${isOpen ? 'open' : ''}`}
        aria-expanded={isOpen}
      >
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/projects" onClick={handleLinkClick}>Projects</Link>
        <Link to="/experience" onClick={handleLinkClick}>Experience</Link>
        <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
      </div>

      <div
        className={`toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      >
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
