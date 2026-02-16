import React from 'react';
import './SkeletonLoader.css';

interface SkeletonProps {
    type?: 'text' | 'rect' | 'circle' | 'card' | 'blog-post';
    width?: string;
    height?: string;
    className?: string;
    repeat?: number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
    type = 'text',
    width,
    height,
    className = '',
    repeat = 1
}) => {
    const renderSkeleton = (index: number) => {
        if (type === 'blog-post') {
            return (
                <div key={index} className="skeleton-blog-post">
                    <div className="skeleton-header">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-meta"></div>
                    </div>
                    <div className="skeleton-body">
                        <div className="skeleton-line full"></div>
                        <div className="skeleton-line full"></div>
                        <div className="skeleton-line three-quarter"></div>
                        <div className="skeleton-line full"></div>
                        <div className="skeleton-block"></div>
                        <div className="skeleton-line full"></div>
                    </div>
                </div>
            );
        }

        if (type === 'card') {
            return (
                <div key={index} className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-line half"></div>
                        <div className="skeleton-line full"></div>
                        <div className="skeleton-line three-quarter"></div>
                    </div>
                </div>
            );
        }

        const style = {
            width,
            height,
        };

        return (
            <div
                key={index}
                className={`skeleton ${type} ${className}`}
                style={style}
            ></div>
        );
    };

    return (
        <>
            {Array.from({ length: repeat }).map((_, index) => renderSkeleton(index))}
        </>
    );
};

export default SkeletonLoader;
