import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './App.css'; 
import './ModernTheme.css';

function App() { 
  return ( 
    <Router> 
      <div className="App modern-theme">
        <Navbar /> 
        <div className="page-container">
          <Routes> 
            <Route path="/" element={<Home />} /> 
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes> 
        </div>
        <Footer />
      </div>
    </Router>
  ); 
}

export default App;
