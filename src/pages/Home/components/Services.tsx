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
                    <p>I help companies build reliable software and write clear documentation that developers love to read.</p>
                </div>

                <div className="services-grid">
                    <Link to="/portfolio?category=Software%20Development" className="service-link">
                        <motion.div
                            className="service-card"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="icon-box">
                                <Server size={24} />
                            </div>
                            <h3>Software Development</h3>
                            <p>Building reliable and fast web applications using Python and Go. I focus on code that is easy to maintain.</p>
                        </motion.div>
                    </Link>

                    <Link to="/portfolio?category=Technical%20Writing" className="service-link">
                        <motion.div
                            className="service-card"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="icon-box">
                                <PenTool size={24} />
                            </div>
                            <h3>Technical Writing</h3>
                            <p>Writing clear guides and documentation that help people understand and use your software.</p>
                        </motion.div>
                    </Link>

                    <motion.div
                        className="service-card"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <div className="icon-box">
                            <Layout size={24} />
                        </div>
                        <h3>System Design</h3>
                        <p>Planning how your software will grow. I design systems that are stable and easy to expand in the future.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;
