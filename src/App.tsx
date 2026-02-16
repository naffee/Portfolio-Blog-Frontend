import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-container">
          <AnimatePresence mode='wait'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
