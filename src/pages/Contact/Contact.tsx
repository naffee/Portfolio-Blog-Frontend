import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Mail, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../../components/shared/SEO';
import './Contact.css';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Technical Writing Project',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Message sent! (Simulation)');
    };

    return (
        <div className="contact-container">
            <SEO
                title="Contact"
                description="Get in touch with Nafisat for software engineering or technical writing projects."
            />
            <Navbar />
            <main className="contact-main">
                <div className="contact-grid">
                    {/* Left Column: Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>Let's connect.</h1>
                        <p className="contact-desc">
                            If you need a software engineer or technical writer, let's talk.
                        </p>

                        <div className="contact-methods">
                            <div className="method-item">
                                <div className="method-icon"><Mail size={20} /></div>
                                <div className="method-details">
                                    <span className="method-label">EMAIL ME</span>
                                    <a href="mailto:nafisat@thetechwriter.com" className="method-link">nafisat@thetechwriter.com</a>
                                </div>
                            </div>

                            <div className="method-item">
                                <div className="method-icon"><Linkedin size={20} /></div>
                                <div className="method-details">
                                    <span className="method-label">SOCIALS</span>
                                    <div className="social-links-row">
                                        <a href="https://www.linkedin.com/in/nafisat-adeyemi-572236162?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="method-link">LinkedIn</a>
                                        <span className="separator">/</span>
                                        <a href="https://x.com/thetechwriter_" target="_blank" rel="noopener noreferrer" className="method-link">X (Twitter)</a>
                                        <span className="separator">/</span>
                                        <a href="https://www.instagram.com/thetechwriter_/" target="_blank" rel="noopener noreferrer" className="method-link">Instagram</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="quote-box">
                            <p>"Clear code, clear writing."</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        className="contact-form-wrapper"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Alex Rivera"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="alex@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <div className="select-wrapper">
                                    <select
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option>Technical Writing Project</option>
                                        <option>Software Development</option>
                                        <option>Speaking Inquiry</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    placeholder="Tell me about your project or inquiry..."
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Send Message <Send size={16} />
                            </button>

                            <p className="form-note">I typically respond within 24-48 business hours.</p>
                        </form>
                    </motion.div>
                </div>

                {/* Footer Banner / Visual */}
                <motion.div
                    className="location-banner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="banner-visual"></div>
                    <div className="location-pill">
                        <span className="dot"></span> BASED IN REMOTE / NIGERIA
                    </div>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
};

export default Contact;
