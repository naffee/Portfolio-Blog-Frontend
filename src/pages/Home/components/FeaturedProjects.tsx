import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../../Projects/ProjectCard';
import { projects } from '../../Projects/data';
import type { Project } from '../../Projects/data';
import { getPortfolioPosts } from '../../../services/wordpress';
import { mapPostToProject } from '../../../utils/projectMapper';
import './FeaturedProjects.css';

const FeaturedProjects: React.FC = () => {
    const [displayProjects, setDisplayProjects] = useState<Project[]>(projects.filter(p => p.featured).slice(0, 3));

    useEffect(() => {
        const fetchDynamic = async () => {
            try {
                const wpPosts = await getPortfolioPosts();
                if (wpPosts.length > 0) {
                    const mapped: Project[] = wpPosts.slice(0, 3).map(post => {
                        const p = mapPostToProject(post);
                        p.featured = true; // Force featured appearance
                        return p;
                    });
                    setDisplayProjects(mapped);
                }
            } catch (e) {
                console.error("Failed to fetch featured projects", e);
            }
        };
        fetchDynamic();
    }, []);

    return (
        <section className="featured-projects" id="work">
            <div className="projects-content">
                <div className="section-header-row">
                    <h2>Featured Portfolio</h2>
                    <Link to="/portfolio" className="view-all-link">
                        View All Work <ArrowRight size={16} />
                    </Link>
                </div>
                <p className="section-sub">A selection of my recent open-source work and documentation.</p>

                <div className="projects-grid">
                    {displayProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
