import type { WPPost, WPComment } from '../types/wordpress';

const WP_API_URL = 'http://wordpress-oswkcckcokc4o40ss8ssco8g.16.16.27.94.sslip.io/wp-json/wp/v2';

export const getPosts = async (page = 1, perPage = 10): Promise<WPPost[]> => {
    try {
        const response = await fetch(`${WP_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

export const getPostBySlug = async (slug: string): Promise<WPPost | null> => {
    try {
        const response = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        const posts = await response.json();
        return posts.length > 0 ? posts[0] : null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
};

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

export const getCategories = async (): Promise<WPCategory[]> => {
    try {
        const response = await fetch(`${WP_API_URL}/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const getPortfolioPosts = async (): Promise<WPPost[]> => {
    try {
        // First, find the 'Portfolio' category ID
        const categories = await getCategories();
        const portfolioCategory = categories.find(cat => cat.name.toLowerCase() === 'portfolio' || cat.slug === 'portfolio');

        if (!portfolioCategory) {
            console.warn('Portfolio category not found');
            return [];
        }

        // Fetch posts in that category
        const response = await fetch(`${WP_API_URL}/posts?_embed&categories=${portfolioCategory.id}&per_page=100`);
        if (!response.ok) {
            throw new Error('Failed to fetch portfolio posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching portfolio posts:', error);
        return [];
    }
};

export const getRelatedPosts = async (categoryId: number, excludePostId: number, limit = 3): Promise<WPPost[]> => {
    try {
        const response = await fetch(`${WP_API_URL}/posts?_embed&categories=${categoryId}&per_page=${limit + 1}&exclude=${excludePostId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch related posts');
        }
        const posts = await response.json();
        return posts.slice(0, limit);
    } catch (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }
};

export const getComments = async (postId: number): Promise<WPComment[]> => {
    try {
        const response = await fetch(`${WP_API_URL}/comments?post=${postId}&per_page=20&order=asc`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
};
