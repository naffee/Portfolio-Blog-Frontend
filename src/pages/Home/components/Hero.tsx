import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="hero">
            <motion.div
                className="hero-badge-container"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="badge">AVAILABLE FOR NEW PROJECTS</div>
            </motion.div>

            <div className="hero-content">
                <motion.div
                    className="hero-text"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants}>
                        Software Developer <br />
                        <span className="highlight">& Technical Writer</span>
                    </motion.h1>
                    <motion.p className="hero-subtext" variants={itemVariants}>
                        I build reliable software systems and write clear technical documentation that helps teams create better products.
                    </motion.p>
                    <motion.div className="hero-buttons" variants={itemVariants}>
                        <Link to="/portfolio" className="btn-primary">
                            View Projects <ArrowRight size={16} />
                        </Link>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            onClick={(e) => {
                                if (e.currentTarget.getAttribute('href') === '#') {
                                    e.preventDefault();
                                    alert("Resume link coming soon!");
                                }
                            }}
                        >
                            Download Resume
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="code-window">
                        <div className="window-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                            <span className="filename">main.go</span>
                        </div>
                        <div className="window-body">
                            <pre>
                                <code>
                                    <TypewriterLine text="package main" className="kwd" delay={0.5} />
                                    <br />
                                    <br />
                                    <TypewriterLine text="// Build threaded engineer profile" className="comment" delay={1.2} />
                                    <br />
                                    <br />
                                    <TypewriterLine text="func " className="kwd" delay={2.5} />
                                    <TypewriterLine text="GetEngineer" className="func" delay={2.8} />
                                    <TypewriterLine text="() {" delay={3.2} />
                                    <br />
                                    <TypewriterLine text="  skills := []" delay={3.5} />
                                    <TypewriterLine text="string" className="type" delay={4.0} />
                                    <TypewriterLine text="{" delay={4.2} />
                                    <br />
                                    <TypewriterLine text='    "Software Engineering",' className="str" delay={4.5} />
                                    <br />
                                    <TypewriterLine text='    "Technical Writing",' className="str" delay={5.5} />
                                    <br />
                                    <TypewriterLine text='    "System Architecture",' className="str" delay={6.5} />
                                    <br />
                                    <TypewriterLine text="  }" delay={7.5} />
                                    <br />
                                    <TypewriterLine text="  " delay={7.8} />
                                    <TypewriterLine text="return " className="kwd" delay={7.9} />
                                    <TypewriterLine text="skills" delay={8.2} />
                                    <br />
                                    <TypewriterLine text="}" delay={8.5} />
                                    <span className="cursor"></span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const TypewriterLine: React.FC<{ text: string; className?: string; delay: number }> = ({ text, className, delay }) => {
    const [displayText, setDisplayText] = React.useState('');

    React.useEffect(() => {
        const startTimeout = setTimeout(() => {
            let currentText = '';
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    currentText += text[currentIndex];
                    setDisplayText(currentText);
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 30); // Typing speed

            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [text, delay]);

    return <span className={className}>{displayText}</span>;
};

export default Hero;
