import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BlogCard from './BlogCard';
import type { WPPost } from '../../types/wordpress';
import { getPosts } from '../../services/wordpress';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Pagination from '../../components/shared/Pagination';
import SkeletonLoader from '../../components/shared/SkeletonLoader';
import './Blog.css';

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2; // Temporary low limit for testing

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts(1, 100); // Fetch more to allow client-side filtering
                setPosts(data);
            } catch {
                setError('Failed to load posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Reset page on filter/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, searchQuery]);

    // Filter Categories (Dynamic)
    const allTags = posts.flatMap(post => {
        const terms = post._embedded?.['wp:term']?.flat() || [];
        return terms.map(t => t.name);
    });
    const uniqueTags = Array.from(new Set(allTags)).sort();
    const categories = ['All', ...uniqueTags];

    // Filter Logic
    const filteredPosts = posts.filter(post => {
        // 1. Category Filter
        const terms = post._embedded?.['wp:term']?.flat() || [];
        const termNames = terms.map(t => t.name.toLowerCase());
        const matchesCategory = filter === 'All'
            ? true
            : termNames.includes(filter.toLowerCase());

        // 2. Search Filter
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = post.title.rendered.toLowerCase().includes(searchLower) ||
            post.excerpt.rendered.toLowerCase().includes(searchLower);

        return matchesCategory && matchesSearch;
    });

    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="blog-container">
            <SEO
                title={filter === 'All' ? 'Blog' : `${filter} Articles`}
                description="Technical articles and tutorials on software engineering, distributed systems, and backend development."
            />
            <Navbar />
            <main className="blog-main">
                <motion.div
                    className="blog-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="header-top">
                        <h1>Engineering <span className="highlight">Insights.</span></h1>
                    </div>

                    <p className="blog-intro">
                        A collection of technical articles and tutorials.
                    </p>

                    <div className="blog-controls">
                        <div className="search-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="blog-tags">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`tag-btn ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="blog-list-skeleton">
                        <SkeletonLoader type="card" repeat={4} className="blog-card-skeleton" />
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            className="blog-list"
                            layout
                        >
                            <AnimatePresence mode="popLayout">
                                {currentPosts.length > 0 ? (
                                    currentPosts.map(post => (
                                        <motion.div
                                            key={post.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <BlogCard post={post} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="no-results"
                                    >
                                        <p>No articles found for "{filter}".</p>
                                        <button onClick={() => setFilter('All')} className="reset-btn">
                                            View All Posts
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {filteredPosts.length > postsPerPage && (
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

export default Blog;
