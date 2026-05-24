import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getPostBySlug, getRelatedPosts } from '../../services/wordpress';
import type { WPPost } from '../../types/wordpress';
import { ArrowLeft, Calendar, Github, ExternalLink, FileText, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../../components/shared/SEO';
import SkeletonLoader from '../../components/shared/SkeletonLoader';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './ProjectPost.css';

const ProjectPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<WPPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedProjects, setRelatedProjects] = useState<WPPost[]>([]);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (slug) {
                const data = await getPostBySlug(slug);
                setProject(data);

                if (data && data.categories && data.categories.length > 0) {
                    // Fetch related portfolio items
                    const related = await getRelatedPosts(data.categories[0], data.id, 2);
                    setRelatedProjects(related);
                }
            }
            setLoading(false);
        };
        fetchProjectData();
    }, [slug]);

    // Code syntax highlighting
    useEffect(() => {
        if (!project) return;
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    }, [project]);

    if (loading) {
        return (
            <div className="project-post-container">
                <Navbar />
                <SkeletonLoader type="blog-post" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="not-found-container">
                <h2>Project not found</h2>
                <Link to="/portfolio" className="back-btn">Back to Portfolio</Link>
            </div>
        );
    }

    const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const projectLinks = (project as any).customLinks || [];

    const getIcon = (link: { label: string; icon?: string }) => {
        if (link.icon === 'github') return <Github size={18} />;
        if (link.icon === 'external') return <ExternalLink size={18} />;
        
        const l = link.label.toLowerCase();
        if (l.includes('github')) return <Github size={18} />;
        if (l.includes('doc') || l.includes('read')) return <FileText size={18} />;
        if (l.includes('metric')) return <BarChart2 size={18} />;
        return <ExternalLink size={18} />;
    };

    return (
        <div className="project-post-container">
            <SEO
                title={project.title.rendered}
                description={project.excerpt.rendered.substring(0, 160)}
                type="article"
                image={featuredImage}
            />
            <Navbar />
            <motion.main
                className="project-post-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/portfolio" className="back-link">
                    <ArrowLeft size={16} /> Back to Portfolio
                </Link>

                <header className="project-header-section">
                    <h1 dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
                    <div className="project-header-meta">
                        <span className="project-date-meta">
                            <Calendar size={14} /> {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    {projectLinks.length > 0 && (
                        <div className="project-action-links">
                            {projectLinks.map((link: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    className={`project-action-btn ${idx === 0 ? 'primary-btn' : 'secondary-btn'}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {getIcon(link)} {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </header>

                {featuredImage && (
                    <div className="project-featured-img">
                        <img src={featuredImage} alt={project.title.rendered} />
                    </div>
                )}

                <article
                    className="project-body"
                    dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                />

                {relatedProjects.length > 0 && (
                    <div className="related-projects-section">
                        <h3>Other Projects</h3>
                        <div className="related-projects-grid">
                            {relatedProjects.map(rp => (
                                <Link to={`/portfolio/${rp.slug}`} key={rp.id} className="related-project-card">
                                    {rp._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                        <div className="related-project-image">
                                            <img src={rp._embedded['wp:featuredmedia'][0].source_url} alt={rp.title.rendered} />
                                        </div>
                                    )}
                                    <div className="related-project-content">
                                        <h4 dangerouslySetInnerHTML={{ __html: rp.title.rendered }} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </motion.main>
            <Footer />
        </div>
    );
};

export default ProjectPost;
