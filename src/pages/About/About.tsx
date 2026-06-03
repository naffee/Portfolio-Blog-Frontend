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
                        <span className="highlight">Technical Writer Who Codes</span>
                    </p>

                    <div className="about-intro-text">
                        <p>
                            Hi, I'm Nafisat. I am a Technical Writer with a strong background in backend engineering. I specialize in translating complex system architectures, APIs, and backend patterns into practical, easy-to-follow documentation.
                        </p>
                        <p>
                            Because I've built these systems myself—working with Node.js, REST APIs, and database-driven applications—I know exactly what developers need to see in the docs. I can read the source code, interview engineers on their level, and produce guides that drastically reduce time-to-hello-world.
                        </p>
                        <p>
                            Writing, for me, is the final and most important step of the software development lifecycle. I believe good software is not only functional, but expertly explained.
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
                                    <span className="var">03</span>   <span className="str">"location"</span>: <span className="str">"Remote"</span>,{'\n'}
                                    <span className="var">04</span>   <span className="str">"role"</span>: <span className="str">"Technical Writer"</span>,{'\n'}
                                    <span className="var">05</span>   <span className="str">"also"</span>: <span className="str">"Backend Engineer"</span>,{'\n'}
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
                            <h4>Backend Developer & Technical Writer @ Miniemoney</h4>
                            <p>Spearheading backend architecture and technical documentation. I actively build scalable REST APIs while simultaneously authoring the documentation used by our frontend team and enterprise partners (like Wakanow and Venco). This dual role reduced partner integration time by over 40% and accelerated internal frontend feature delivery by 25%.</p>
                        </div>

                        <div className="timeline-item">
                            <span className="timeline-date">2024 — 2025</span>
                            <h4>Backend Support & Developer @ Finclusion</h4>
                            <p>Managed and optimized critical backend systems utilizing NestJS and PostgreSQL. Authored internal technical documentation and runbooks to streamline developer workflows, directly contributing to resolving critical incidents 35% faster and reducing overall support resolution times.</p>
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
