import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../../components/shared/SEO';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <SEO
                title="About"
                description="Learn more about Nafisat, a Software Engineer based in Nigeria with expertise in JavaScript, Python, and Go."
            />
            <Navbar />
            <main className="about-main">
                {/* Header / Intro */}
                <motion.section
                    className="about-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="badge">AVAILABLE FOR PROJECTS</div>
                    <h1>Nafisat Damisa</h1>
                    <p className="about-subtitle">
                        <span className="highlight">Software Developer Who Writes</span>
                    </p>

                    <div className="about-intro-text">
                        <p>
                            Hi, I'm Nafisat. I am a backend-focused software developer who enjoys building systems and writing about how they work.
                        </p>
                        <p>
                            I work primarily with JavaScript and TypeScript, designing APIs, backend services, and database-driven applications. My development experience is rooted in startup environments, where I have contributed to financial systems, notification architectures, third-party integrations, and scalable backend logic.
                        </p>
                        <p>
                            Beyond development, I write technical content that helps developers understand concepts more clearly. I enjoy breaking down backend patterns, APIs, and system design into practical, easy-to-follow explanations. Writing, for me, is a natural extension of development — a way to make complex ideas more accessible.
                        </p>
                        <p>
                            I believe good software is not only functional but also understandable.
                        </p>
                    </div>
                </motion.section>

                {/* Philosophy Card */}
                <motion.section
                    className="philosophy-section"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="philosophy-card">
                        <div className="philosophy-header">
                            <span className="label">PHILOSOPHY</span>
                            <BookOpen size={24} className="icon" />
                        </div>
                        <blockquote>
                            "Clear thinking produces clean code. Clear writing makes it usable."
                        </blockquote>
                    </div>
                </motion.section>

                {/* JSON Profile Visual */}
                <motion.section
                    className="profile-visual-section"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="code-window">
                        <div className="window-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                            <span className="filename">nafisat.json</span>
                        </div>
                        <div className="window-body">
                            <pre>
                                <code>
                                    <span className="var">01</span> &#123;{'\n'}
                                    <span className="var">02</span>   <span className="str">"name"</span>: <span className="str">"Nafisat Damisa"</span>,{'\n'}
                                    <span className="var">03</span>   <span className="str">"location"</span>: <span className="str">"Nigeria"</span>,{'\n'}
                                    <span className="var">04</span>   <span className="str">"role"</span>: <span className="str">"Software Developer"</span>,{'\n'}
                                    <span className="var">05</span>   <span className="str">"also"</span>: <span className="str">"Technical Writer"</span>,{'\n'}
                                    <span className="var">06</span>   <span className="str">"focus"</span>: [<span className="str">"Backend Systems"</span>, <span className="str">"APIs"</span>, <span className="str">"Documentation"</span>],{'\n'}
                                    <span className="var">07</span>   <span className="str">"stack"</span>: [<span className="str">"JavaScript"</span>, <span className="str">"TypeScript"</span>, <span className="str">"Node.js"</span>, <span className="str">"SQL"</span>]{'\n'}
                                    <span className="var">08</span> &#125;
                                </code>
                            </pre>
                        </div>
                    </div>
                </motion.section>

                {/* Skills Lists */}
                <motion.section
                    className="skills-section"
                    id="skills"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="skills-grid">
                        <div className="skill-column">
                            <h3>SOFTWARE DEVELOPMENT</h3>
                            <ul>
                                <li><span className="num">[01]</span> JavaScript / TypeScript</li>
                                <li><span className="num">[02]</span> Node.js / NestJS</li>
                                <li><span className="num">[03]</span> REST API Design</li>
                                <li><span className="num">[04]</span> Backend Architecture</li>
                                <li><span className="num">[05]</span> PostgreSQL / Database Design</li>
                            </ul>
                        </div>
                        <div className="skill-column">
                            <h3>TECHNICAL WRITING</h3>
                            <ul>
                                <li><span className="num">[01]</span> API Documentation</li>
                                <li><span className="num">[02]</span> Technical Tutorials & Guides</li>
                                <li><span className="num">[03]</span> Backend & System Concepts</li>
                                <li><span className="num">[04]</span> Developer-Focused Content</li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Journey Timeline */}
                <motion.section
                    className="journey-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="section-label">JOURNEY</h3>
                    <div className="timeline">
                        <div className="timeline-item">
                            <span className="timeline-date">2025 — PRESENT</span>
                            <h4>Backend Developer @ Miniemoney</h4>
                            <p>Designing and developing backend services for a fintech startup, including notification systems, user workflows, and third-party API integrations.</p>
                        </div>

                        <div className="timeline-item">
                            <span className="timeline-date">2024 — 2025</span>
                            <h4>Backend Support / Developer @ Finclusion</h4>
                            <p>Worked across multiple backend systems including financial workflows, incident reporting, and database-driven applications using NestJS, TypeORM, and PostgreSQL.</p>
                        </div>

                        <div className="timeline-item">
                            <span className="timeline-date">Earlier</span>
                            <h4>Full Stack / Technical Writing</h4>
                            <p>Explored full-stack development, backend engineering, and technical writing — gradually combining both into a unified professional focus.</p>
                        </div>
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section
                    className="about-cta"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2>Let's build something readable.</h2>
                    <p>I'm always open to discussing technical documentation strategies or backend architecture.</p>
                    <button className="btn-primary">Get in Touch</button>
                </motion.section>

            </main>
            <Footer />
        </div>
    );
};

export default About;
