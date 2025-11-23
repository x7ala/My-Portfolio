import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Footer from './components/Footer'; // <-- import your Footer 
import './App.css'; 





function App() { 
return ( 
<Router> 
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
</Router> ); 
}

 export default App;


