import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User } from 'lucide-react';
import { getComments } from '../../../services/wordpress';
import type { WPComment } from '../../../types/wordpress';
import './CommentsSection.css';

interface CommentsSectionProps {
    postId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
    const [comments, setComments] = useState<WPComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            const data = await getComments(postId);
            setComments(data);
            setLoading(false);
        };

        if (postId) {
            fetchComments();
        }
    }, [postId]);

    if (loading) {
        return <div className="comments-loading">Loading comments...</div>;
    }

    if (comments.length === 0) {
        return (
            <div className="no-comments">
                <MessageSquare size={48} className="no-comments-icon" />
                <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section className="comments-section">
            <h3>Comments ({comments.length})</h3>
            <div className="comments-list">
                {comments.map((comment, index) => (
                    <motion.div
                        key={comment.id}
                        className="comment-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="comment-avatar">
                            {comment.author_avatar_urls ? (
                                <img src={comment.author_avatar_urls['96']} alt={comment.author_name} />
                            ) : (
                                <User size={24} />
                            )}
                        </div>
                        <div className="comment-content-wrapper">
                            <div className="comment-header">
                                <span className="comment-author">{comment.author_name}</span>
                                <span className="comment-date">{formatDate(comment.date)}</span>
                            </div>
                            <div
                                className="comment-body"
                                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CommentsSection;
