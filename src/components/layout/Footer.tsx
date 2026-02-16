import React from 'react';
import './Footer.css';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} The Tech Writer. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://github.com/naffee" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/nafisat-adeyemi-572236162?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://x.com/thetechwriter_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                        <Twitter size={20} />
                    </a>
                    <a href="https://www.instagram.com/thetechwriter_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
