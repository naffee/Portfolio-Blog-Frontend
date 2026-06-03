import type { WPPost, WPTerm } from '../types/wordpress';
import type { Project } from '../pages/Projects/data';

export const mapPostToProject = (post: WPPost): Project => {
    // 1. Flatten terms to find categories and tags
    const terms = post._embedded?.['wp:term'] || [];
    const allTerms: WPTerm[] = terms.flat();

    const tagNames = allTerms.map(t => t.name);

    // 2. Determine Category
    // Prefer actual WP Categories (excluding 'Portfolio' and 'Uncategorized')
    const categories = tagNames.filter(t =>
        t.toLowerCase() !== 'portfolio' &&
        t.toLowerCase() !== 'uncategorized'
    );

    let category = categories.length > 0 ? categories[0] : 'Software Development';

    // 3. Extract Links
    let links = (post as any).customLinks;
    if (!links || links.length === 0) {
        links = [
            { label: 'View Project', url: `/portfolio/${post.slug}`, icon: 'arrow' }
        ];


    }

    const isFeatured = (post as any).customFeatured || false;

    return {
        id: String(post.id),
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]+>/g, ''), // Strip HTML
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400',
        category: category,
        tags: tagNames.slice(0, 4), // Limit to 4 tags for display
        links: links,
        featured: isFeatured,
        slug: post.slug
    };
};
