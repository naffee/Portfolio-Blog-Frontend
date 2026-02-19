import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import type { Project } from './data';
import ProjectCard from './ProjectCard';
import { getPortfolioPosts, getSubcategories } from '../../services/wordpress';
import { mapPostToProject } from '../../utils/projectMapper'; // Import mapper
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/shared/SEO';
import Pagination from '../../components/shared/Pagination';
import SkeletonLoader from '../../components/shared/SkeletonLoader';
import './Projects.css';

const Projects: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('category') || 'All';

    // State for dynamic projects and categories
    const [dynamicProjects, setDynamicProjects] = React.useState<Project[]>([]);
    const [categories, setCategories] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch posts AND subcategories for Portfolio
                const [wpPosts, subCats] = await Promise.all([
                    getPortfolioPosts(),
                    getSubcategories('portfolio')
                ]);

                // Map WP posts
                const mappedProjects: Project[] = wpPosts.map(mapPostToProject);

                // Set Projects
                if (mappedProjects.length > 0) {
                    setDynamicProjects(mappedProjects);
                } else {
                    setDynamicProjects([]); // No projects found
                }

                // Set Categories (Dynamic subcategories)
                if (subCats.length > 0) {
                    const catNames = subCats.map(c => c.name).sort();
                    setCategories(catNames);
                }
            } catch (err) {
                console.error("Failed to load portfolio", err);
                // setDynamicProjects([]); // Already empty by default
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (newFilter: string) => {
        if (filter === newFilter) {
            setSearchParams({}); // Toggle off
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
            // Check if project category matches filter (exact match for custom WP subcats)
            // Or if it's in the tags
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
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                        <SkeletonLoader type="card" repeat={3} className="projects-grid-layout" />
                    </div>
                ) : filteredProjects.length > 0 ? (
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
                ) : (
                    <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#888' }}>
                        <h3>No projects found</h3>
                        <p>Try selecting a different category or check back later.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Projects;
