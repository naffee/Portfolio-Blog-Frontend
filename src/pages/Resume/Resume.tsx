import React, { useEffect, useState } from 'react';
import { Download, ArrowLeft, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/shared/SEO';
import { parseMarkdown } from '../../utils/markdownParser';
import resumeMarkdown from '../../content/resume.md?raw';
import './Resume.css';

const Resume: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const { html } = parseMarkdown(resumeMarkdown);
        setHtmlContent(html);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadMD = () => {
        const blob = new Blob([resumeMarkdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Nafisat_Damisa_Resume.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="resume-page-container">
            <SEO
                title="Resume | Nafisat Damisa"
                description="Technical Writer and Backend Engineer Resume for Nafisat Damisa."
            />
            
            <div className="resume-controls no-print">
                <Link to="/" className="back-link">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
                <div className="action-buttons">
                    <button className="btn-secondary" onClick={handleDownloadMD}>
                        <FileDown size={16} /> ATS Markdown (.md)
                    </button>
                    <button className="btn-primary" onClick={handlePrint}>
                        <Download size={16} /> Save as PDF
                    </button>
                </div>
            </div>

            <motion.main
                className="resume-document"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div 
                    className="resume-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </motion.main>
        </div>
    );
};

export default Resume;
