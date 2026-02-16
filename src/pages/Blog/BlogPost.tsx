import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getPostBySlug, getRelatedPosts } from '../../services/wordpress';
import type { WPPost } from '../../types/wordpress';
import { ArrowLeft, Calendar, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../../components/shared/SEO';
import CommentsSection from './components/CommentsSection';
import SkeletonLoader from '../../components/shared/SkeletonLoader';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Dark theme
import './BlogPost.css';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<WPPost | null>(null);
    const [loading, setLoading] = useState(true);

    const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);

    useEffect(() => {
        const fetchPostData = async () => {
            if (slug) {
                const data = await getPostBySlug(slug);
                setPost(data);

                if (data && data.categories && data.categories.length > 0) {
                    // Fetch related posts based on the first category
                    const related = await getRelatedPosts(data.categories[0], data.id);
                    setRelatedPosts(related);
                }
            }
            setLoading(false);
        };
        fetchPostData();
    }, [slug]);

    // Syntax Highlighting & Copy Button
    useEffect(() => {
        if (!post) return;

        // 1. Highlight Code
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });

        // 2. Add Copy Buttons
        document.querySelectorAll('pre').forEach((pre) => {
            // Check if button already exists to prevent duplicates
            if (pre.querySelector('.copy-btn')) return;

            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
            `;

            button.addEventListener('click', () => {
                const code = pre.querySelector('code')?.innerText || '';
                navigator.clipboard.writeText(code);

                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                `;
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                    `;
                    button.classList.remove('copied');
                }, 2000);
            });

            pre.style.position = 'relative'; // Ensure relative positioning for absolute button
            pre.appendChild(button);
        });
    }, [post]);

    if (loading) {
        return (
            <div className="blog-post-container">
                <Navbar />
                <SkeletonLoader type="blog-post" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="not-found-container">
                <h2>Post not found</h2>
                <Link to="/blog" className="back-btn">Back to Blog</Link>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const shareUrl = window.location.href;
    const shareText = `Check out this article by Nafisat: ${post?.title.rendered}`;

    const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="blog-post-container">
            {post && (
                <SEO
                    title={post.title.rendered}
                    description={post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 160)}
                    type="article"
                    image={post._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                />
            )}
            <Navbar />
            <motion.main
                className="blog-post-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/blog" className="back-link">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>

                <header className="post-header">
                    <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <div className="post-meta">
                        <span className="date">
                            <Calendar size={14} /> {formatDate(post.date)}
                        </span>
                    </div>
                </header>

                <article
                    className="post-body"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                <div className="share-section">
                    <h3>Share this article</h3>
                    <div className="share-buttons">
                        <button onClick={() => handleShare('twitter')} className="share-btn twitter">
                            <Twitter size={18} /> Twitter
                        </button>
                        <button onClick={() => handleShare('linkedin')} className="share-btn linkedin">
                            <Linkedin size={18} /> LinkedIn
                        </button>
                        <button onClick={() => handleShare('copy')} className="share-btn copy">
                            <LinkIcon size={18} /> Copy Link
                        </button>
                    </div>
                </div>

                {relatedPosts.length > 0 && (
                    <div className="related-posts-section">
                        <h3>Related Articles</h3>
                        <div className="related-posts-grid">
                            {relatedPosts.map(rp => (
                                <Link to={`/blog/${rp.slug}`} key={rp.id} className="related-post-card">
                                    {rp._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                        <div className="related-post-image">
                                            <img src={rp._embedded['wp:featuredmedia'][0].source_url} alt={rp.title.rendered} />
                                        </div>
                                    )}
                                    <div className="related-post-content">
                                        <h4 dangerouslySetInnerHTML={{ __html: rp.title.rendered }} />
                                        <span className="related-date">{formatDate(rp.date)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <CommentsSection postId={post.id} />
            </motion.main>
            <Footer />
        </div>
    );
};

export default BlogPost;
