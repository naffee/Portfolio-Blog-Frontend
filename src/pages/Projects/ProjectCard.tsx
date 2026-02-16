import React from 'react';
import type { Project } from './data';
import { Github, ExternalLink, FileText, BarChart2, ArrowRight } from 'lucide-react';
import './ProjectCard.css';

interface ProjectCardProps {
    project: Project;
}

import { Link } from 'react-router-dom';

// ... existing imports

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const getIcon = (link: { label: string; icon?: string }) => {
        // specific icon override
        if (link.icon === 'github') return <Github size={16} />;
        if (link.icon === 'external') return <ExternalLink size={16} />;
        if (link.icon === 'arrow') return <ArrowRight size={16} />;

        // fallback to label matching
        const l = link.label.toLowerCase();
        if (l.includes('github')) return <Github size={16} />;
        if (l.includes('doc')) return <FileText size={16} />;
        if (l.includes('metric')) return <BarChart2 size={16} />;
        return <ExternalLink size={16} />;
    };

    return (
        <div className="project-grid-card">
            <div className="project-grid-image">
                <img src={project.imageUrl} alt={project.title} />
                <div className="project-grid-overlay"></div>
            </div>

            <div className="project-grid-content">
                <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className={`category-badge ${project.category.toLowerCase().replace(/\s+/g, '-')}`}>{project.category}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                    {project.tags.map(tag => (
                        <span key={tag} className="grid-tag">{tag}</span>
                    ))}
                </div>

                <div className="project-links">
                    {project.links.map((link, idx) => {
                        const isInternal = link.url.startsWith('/');
                        const content = (
                            <>
                                {getIcon(link)} {link.label}
                            </>
                        );

                        return isInternal ? (
                            <Link key={idx} to={link.url} className="project-link">
                                {content}
                            </Link>
                        ) : (
                            <a
                                key={idx}
                                href={link.url}
                                className="project-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {content}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
