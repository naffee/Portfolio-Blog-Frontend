import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import './NotFound.css';

const NotFound: React.FC = () => {
    return (
        <div className="not-found-page">
            <div className="noise-overlay"></div>
            <motion.div
                className="not-found-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="glitch-wrapper">
                    <h1 className="glitch" data-text="404">404</h1>
                </div>
                <h2>Page Not Found</h2>
                <p>The signal you're looking for has been lost in the void.</p>

                <div className="not-found-actions">
                    <Link to="/" className="action-btn primary">
                        <Home size={18} /> Return Home
                    </Link>
                    <button onClick={() => window.history.back()} className="action-btn secondary">
                        <ArrowLeft size={18} /> Go Back
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
