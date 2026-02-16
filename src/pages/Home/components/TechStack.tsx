import React from 'react';
import { Terminal, Database, Server, Layout, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import './TechStack.css';

const TechStack: React.FC = () => {
    const stack = [
        { icon: <FileCode size={24} />, name: 'TypeScript', desc: 'Type Safety, Interfaces' },
        { icon: <Layout size={24} />, name: 'React', desc: 'Hooks, Context, Redux' },
        { icon: <Server size={24} />, name: 'Node.js', desc: 'Express, NestJS, APIs' },
        { icon: <Terminal size={24} />, name: 'Python', desc: 'FastAPI, scripting' },
        { icon: <Database size={24} />, name: 'PostgreSQL', desc: 'Complex queries, schema design' },
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
