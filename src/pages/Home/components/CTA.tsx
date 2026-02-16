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
                        Whether you need a robust backend architecture, scalable APIs,
                        or technical documentation that empowers your developers, I'm here to help.
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
