import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import './CTA.css';

const CTA: React.FC = () => {
    return (
        <section className="cta-section">
            <div className="cta-content">
                <div className="cta-card">
                    <h2>Ready to build something <br />exceptional together?</h2>
                    <p>
                        Whether you need best-in-class API documentation, onboarding tutorials,
                        or a technical writer who can actually read the source code, I'm here to help.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn-white">
                            <Mail size={18} />
                            Start a Project
                        </Link>
                        <Link to="/portfolio" className="btn-outline">
                            View My Work
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
