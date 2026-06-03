import React from 'react';
import { Terminal, Database, Server, FileText, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import './TechStack.css';

const TechStack: React.FC = () => {
    const stack = [
        { icon: <FileText size={24} />, name: 'Markdown & MDX', desc: 'Technical Writing, Formatting' },
        { icon: <BookOpen size={24} />, name: 'OpenAPI / Swagger', desc: 'API Reference Specifications' },
        { icon: <Server size={24} />, name: 'Node.js & TS', desc: 'Backend Architecture, REST APIs' },
        { icon: <Terminal size={24} />, name: 'Python & Go', desc: 'Scripting, Fast APIs, CLIs' },
        { icon: <Database size={24} />, name: 'PostgreSQL', desc: 'Data Modeling, Schemas' },
    ];

    return (
        <section className="tech-stack">
            <div className="tech-content">
                <p className="tech-label">CORE TECHNOLOGY STACK</p>
                <div className="tech-icons">
                    {stack.map((item, index) => (
                        <motion.div
                            key={index}
                            className="tech-item"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            data-tooltip={item.desc}
                        >
                            <div className="icon-wrapper">{item.icon}</div>
                            <span>{item.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
