import React from 'react';
import { Link } from 'react-router-dom';
import { Server, PenTool, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import './Services.css';

const Services: React.FC = () => {
    return (
        <section className="services" id="expertise">
            <div className="services-content">
                <div className="section-header">
                    <h2>What I Do</h2>
                    <p>I help companies accelerate developer onboarding and reduce support tickets by writing documentation that developers actually love to read.</p>
                </div>

                <div className="services-grid">
                    <Link to="/portfolio?category=Technical%20Writing" className="service-link">
                        <motion.div
                            className="service-card"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="icon-box">
                                <PenTool size={24} />
                            </div>
                            <h3>API & Developer Documentation</h3>
                            <p>Writing crystal-clear, developer-focused API references, tutorials, and integration guides that drastically accelerate time-to-hello-world for your users.</p>
                        </motion.div>
                    </Link>

                    <Link to="/portfolio?category=Developer%20Experience" className="service-link">
                        <motion.div
                            className="service-card"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="icon-box">
                                <Layout size={24} />
                            </div>
                            <h3>Developer Experience (DevEx)</h3>
                            <p>Improving the end-to-end developer journey. I identify friction points in your onboarding, rewrite confusing error messages, and structure content so developers find what they need instantly.</p>
                        </motion.div>
                    </Link>

                    <Link to="/portfolio?category=Software%20Development" className="service-link">
                        <motion.div
                            className="service-card"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="icon-box">
                                <Server size={24} />
                            </div>
                            <h3>Backend Engineering Context</h3>
                            <p>I don't just write overviews. Because I actively build and design reliable backend systems, I can dive directly into your source code, test the endpoints, and interview your senior engineers on their level.</p>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
