import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Admin from './pages/Admin';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
