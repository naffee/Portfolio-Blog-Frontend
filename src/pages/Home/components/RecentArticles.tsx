import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../../Blog/BlogCard';
import type { WPPost } from '../../../types/wordpress';
import { getPosts } from '../../../services/wordpress';
import './RecentArticles.css';

const RecentArticles: React.FC = () => {
    const [posts, setPosts] = useState<WPPost[]>([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            const data = await getPosts(1, 3); // Fetch latest 3 posts
            setPosts(data);
        };
        fetchRecentPosts();
    }, []);

    if (posts.length === 0) return null;

    return (
        <section className="recent-articles-section">
            <div className="section-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Recent <span className="highlight">Articles</span>
                </motion.h2>
                <Link to="/blog" className="view-all-link">
                    View All Articles <ArrowRight size={16} />
                </Link>
            </div>

            <div className="recent-articles-grid">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <BlogCard post={post} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RecentArticles;
