import React from 'react';
import type { WPPost } from '../../types/wordpress';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

interface BlogCardProps {
    post: WPPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Helper to strip HTML tags for excerpt
    const stripHtml = (html: string) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredImage?.source_url;
    const altText = featuredImage?.alt_text || post.title.rendered;

    return (
        <article className="blog-card">
            <div className="blog-card-content">
                <div className="blog-meta">
                    <span className="blog-date">
                        <Calendar size={14} style={{ marginRight: '5px' }} />
                        {formatDate(post.date)}
                    </span>
                    <span className="blog-separator">•</span>
                    <span className="blog-read-time">
                        <Clock size={14} style={{ marginRight: '5px' }} />
                        5 MIN READ
                    </span>
                </div>

                <h2 className="blog-title">
                    <Link to={`/blog/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </h2>

                <p className="blog-excerpt">
                    {stripHtml(post.excerpt.rendered).substring(0, 150)}...
                </p>

                <Link to={`/blog/${post.slug}`} className="read-article-link">
                    Read Article <ArrowRight size={16} />
                </Link>
            </div>

            {imageUrl && (
                <div className="blog-card-image">
                    <img src={imageUrl} alt={altText} />
                </div>
            )}
        </article>
    );
};

export default BlogCard;
