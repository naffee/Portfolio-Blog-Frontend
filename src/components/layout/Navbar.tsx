import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="navbar-content">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <div className="logo-icon">T</div>
                    <span>The Tech Writer</span>
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/portfolio" className={isActive('/portfolio')} onClick={closeMenu}>Portfolio</Link>
                    <Link to="/blog" className={isActive('/blog')} onClick={closeMenu}>Blog</Link>
                    <Link to="/about" className={isActive('/about')} onClick={closeMenu}>About</Link>
                    <Link to="/contact" className={`nav-contact-btn ${isActive('/contact')}`} onClick={closeMenu}>Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
