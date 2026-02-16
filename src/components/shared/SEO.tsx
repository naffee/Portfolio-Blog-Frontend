import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    type?: 'website' | 'article';
    name?: string;
    image?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    type = 'website',
    name = 'Nafisat',
    image = 'https://thetechwriter.com/og-image.jpg' // Default OG image
}) => {
    const siteTitle = 'Nafisat | Software Engineer & Technical Writer';
    const fullTitle = title === 'Home' ? siteTitle : `${title} | ${name}`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {/* <meta property="og:url" content={window.location.href} /> */}

            {/* Twitter tags */}
            <meta name="twitter:creator" content="@thetechwriter_" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
