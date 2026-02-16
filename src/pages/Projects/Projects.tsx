import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { projects } from './data';
import type { Project } from './data';
import ProjectCard from './ProjectCard';
import { getPortfolioPosts } from '../../services/wordpress';
import { mapPostToProject } from '../../utils/projectMapper'; // Import mapper
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/shared/SEO';
import Pagination from '../../components/shared/Pagination';
import './Projects.css';

const Projects: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('category') || 'All';
    const categories = ['All', 'Software Development', 'Technical Writing', 'API Design'];

    // State for dynamic projects
    const [dynamicProjects, setDynamicProjects] = React.useState<Project[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 2; // Temporary low limit for testing

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const wpPosts = await getPortfolioPosts();

                // Map WP posts using the shared utility
                const mappedProjects: Project[] = wpPosts.map(mapPostToProject);

                // If no dynamic projects yet, fallback to static for demo?
                // The user said "I have added the Portfolio", so we should show what they added.
                // But we might want to blend them or replace them.
                // "Let's do something similar... I want to be able to add..."
                // Implies ADDING to existing or replacing.
                // Let's COMBINE for now, or just use dynamic if available.
                // User expects to see THEIR added portfolio.

                if (mappedProjects.length > 0) {
                    setDynamicProjects(mappedProjects);
                } else {
                    // Fallback to static if fetch fails or empty, so page isn't broken
                    setDynamicProjects(projects);
                }

            } catch (err) {
                console.error("Failed to load portfolio", err);
                setDynamicProjects(projects); // Fallback
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleFilterChange = (newFilter: string) => {
        if (newFilter === 'All') {
            setSearchParams({});
        } else {
            setSearchParams({ category: newFilter });
        }
    };

    // Reset page on filter change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const filteredProjects = filter === 'All'
        ? dynamicProjects
        : dynamicProjects.filter(p => {
            // ... existing filter logic ...
            if (filter === 'Technical Writing') return p.category === 'Writing';
            if (filter === 'API Design') return p.tags?.includes('API') || p.tags?.includes('OpenAPI') || p.category === 'API';
            if (filter === 'Software Development') return p.category === 'Software Development' || p.category === 'Backend';
            return p.category === filter || p.tags?.includes(filter);
        });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="projects-container">
            <SEO
                title={filter === 'All' ? 'Portfolio' : `${filter} Portfolio`}
                description={
                    filter === 'All'
                        ? "Showcase of recent software engineering and technical writing work by Nafisat."
                        : `Explore Nafisat's ${filter} portfolio.`
                }
            />
            <Navbar />
            <main className="projects-main">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Selected <span className="highlight">Portfolio</span></h1>
                    <p className="projects-subtext">
                        A collection of my software development and technical writing work.
                    </p>

                    <div className="projects-filter">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => handleFilterChange(cat)}
                            >
                                {cat === 'All' ? 'All Work' : cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                        Loading portfolio...
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="projects-grid-layout"
                        >
                            <AnimatePresence mode="popLayout">
                                {currentProjects.map(project => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredProjects.length > itemsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Projects;
