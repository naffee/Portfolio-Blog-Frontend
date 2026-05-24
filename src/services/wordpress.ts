import type { WPPost, WPComment, WPTerm } from '../types/wordpress';
import { parseMarkdown } from '../utils/markdownParser';

// 1. Eagerly import all markdown files from local content folders
const rawBlogFiles = import.meta.glob('/src/content/blog/*.md', { query: '?raw', eager: true });
const rawPortfolioFiles = import.meta.glob('/src/content/portfolio/*.md', { query: '?raw', eager: true });

// 2. Hash helper for deterministic IDs
const getDeterministicId = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
};

// 3. Map markdown content to simulated WPPost structure
const createWPPostFromMarkdown = (
    filePath: string,
    rawContent: string,
    defaultCategory: string
): WPPost => {
    const { metadata, html } = parseMarkdown(rawContent);
    const slug = metadata.slug || filePath.split('/').pop()?.replace('.md', '') || '';
    const id = metadata.id || getDeterministicId(slug);
    const categoryName = metadata.category || defaultCategory;
    const categoryId = getDeterministicId(categoryName);

    // Terms (Categories and Tags)
    const categoryTerm: WPTerm = {
        id: getDeterministicId(defaultCategory),
        name: defaultCategory,
        slug: defaultCategory.toLowerCase(),
        taxonomy: 'category',
        link: '#'
    };

    const subCategoryTerm: WPTerm = {
        id: categoryId,
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        taxonomy: 'category',
        link: '#'
    };

    const termArray: WPTerm[] = [categoryTerm];
    if (categoryName.toLowerCase() !== defaultCategory.toLowerCase()) {
        termArray.push(subCategoryTerm);
    }

    const tagTerms: WPTerm[] = (metadata.tags || []).map(tag => ({
        id: getDeterministicId(tag),
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
        taxonomy: 'post_tag',
        link: '#'
    }));

    const post: WPPost = {
        id,
        date: metadata.date,
        date_gmt: metadata.date,
        guid: { rendered: '#' },
        modified: metadata.date,
        modified_gmt: metadata.date,
        slug,
        status: 'publish',
        type: 'post',
        link: '#',
        title: { rendered: metadata.title },
        content: { rendered: html, protected: false },
        excerpt: { rendered: metadata.excerpt || metadata.description || '', protected: false },
        author: 1,
        featured_media: 1,
        comment_status: 'closed',
        ping_status: 'closed',
        sticky: false,
        template: '',
        format: 'standard',
        meta: {},
        categories: [getDeterministicId(defaultCategory), categoryId],
        tags: tagTerms.map(t => t.id),
        _embedded: {
            'wp:featuredmedia': [
                {
                    id: 1,
                    date: metadata.date,
                    slug: 'featured-media',
                    type: 'attachment',
                    link: '#',
                    title: { rendered: 'Featured Media' },
                    author: 1,
                    caption: { rendered: '' },
                    alt_text: metadata.title,
                    media_type: 'image',
                    mime_type: 'image/jpeg',
                    media_details: { width: 800, height: 600, file: '', sizes: {} },
                    source_url: metadata.thumbnail || metadata.imageUrl || 'https://via.placeholder.com/600x400'
                }
            ],
            'wp:term': [
                termArray,
                tagTerms
            ]
        }
    };

    // Attach custom attributes so projectMapper can query them
    (post as any).customLinks = metadata.links || [];
    (post as any).customFeatured = metadata.featured || false;

    return post;
};

// 4. Initialize datasets from imports
const allBlogPosts: WPPost[] = Object.entries(rawBlogFiles).map(([path, content]) => {
    return createWPPostFromMarkdown(path, (content as any).default || '', 'Blog');
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const allPortfolioPosts: WPPost[] = Object.entries(rawPortfolioFiles).map(([path, content]) => {
    return createWPPostFromMarkdown(path, (content as any).default || '', 'Portfolio');
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export interface WPCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    meta: unknown[];
}

// Helper to extract unique terms from loaded posts dynamically
const collectCategoriesFromPosts = (posts: WPPost[], parentName: string, parentId: number): WPCategory[] => {
    const uniqueTerms = new Map<string, { id: number; name: string }>();

    posts.forEach(post => {
        const terms = post._embedded?.['wp:term'] || [];
        const categories = terms[0] || [];
        categories.forEach(cat => {
            if (cat.name.toLowerCase() !== parentName.toLowerCase()) {
                uniqueTerms.set(cat.name.toLowerCase(), { id: cat.id, name: cat.name });
            }
        });
    });

    return Array.from(uniqueTerms.values()).map(term => ({
        id: term.id,
        count: posts.filter(p => p.categories.includes(term.id)).length,
        description: '',
        link: '#',
        name: term.name,
        slug: term.name.toLowerCase().replace(/\s+/g, '-'),
        taxonomy: 'category',
        parent: parentId,
        meta: []
    }));
};

// API Mock Implementation (Pulls from local parsed state)

export const getPosts = async (page = 1, perPage = 10): Promise<WPPost[]> => {
    const startIndex = (page - 1) * perPage;
    return allBlogPosts.slice(startIndex, startIndex + perPage);
};

export const getPostBySlug = async (slug: string): Promise<WPPost | null> => {
    const found = allBlogPosts.find(p => p.slug === slug) || allPortfolioPosts.find(p => p.slug === slug);
    return found || null;
};

export const getCategories = async (parentId?: number): Promise<WPCategory[]> => {
    const categories: WPCategory[] = [
        {
            id: getDeterministicId('Blog'),
            count: allBlogPosts.length,
            description: 'Blog Posts',
            link: '#',
            name: 'Blog',
            slug: 'blog',
            taxonomy: 'category',
            parent: 0,
            meta: []
        },
        {
            id: getDeterministicId('Portfolio'),
            count: allPortfolioPosts.length,
            description: 'Portfolio Projects',
            link: '#',
            name: 'Portfolio',
            slug: 'portfolio',
            taxonomy: 'category',
            parent: 0,
            meta: []
        }
    ];

    if (parentId === getDeterministicId('Blog')) {
        return collectCategoriesFromPosts(allBlogPosts, 'Blog', parentId);
    }
    if (parentId === getDeterministicId('Portfolio')) {
        return collectCategoriesFromPosts(allPortfolioPosts, 'Portfolio', parentId);
    }

    if (!parentId) {
        const blogSubs = collectCategoriesFromPosts(allBlogPosts, 'Blog', getDeterministicId('Blog'));
        const portfolioSubs = collectCategoriesFromPosts(allPortfolioPosts, 'Portfolio', getDeterministicId('Portfolio'));
        return [...categories, ...blogSubs, ...portfolioSubs];
    }

    return [];
};

export const getSubcategories = async (parentSlug: string): Promise<WPCategory[]> => {
    const parentId = getDeterministicId(parentSlug === 'blog' ? 'Blog' : 'Portfolio');
    return getCategories(parentId);
};

export const getPortfolioPosts = async (): Promise<WPPost[]> => {
    return allPortfolioPosts;
};

export const getRelatedPosts = async (categoryId: number, excludePostId: number, limit = 3): Promise<WPPost[]> => {
    const isBlogCategory = allBlogPosts.some(p => p.categories.includes(categoryId));
    const dataset = isBlogCategory ? allBlogPosts : allPortfolioPosts;

    return dataset
        .filter(p => p.id !== excludePostId && p.categories.includes(categoryId))
        .slice(0, limit);
};

export const getBlogPosts = async (page = 1, perPage = 10): Promise<WPPost[]> => {
    const startIndex = (page - 1) * perPage;
    return allBlogPosts.slice(startIndex, startIndex + perPage);
};

export const getComments = async (_postId: number): Promise<WPComment[]> => {
    return [];
};
