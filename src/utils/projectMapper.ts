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
    const links = [
        { label: 'View Project', url: `/portfolio/${post.slug}`, icon: 'arrow' }
    ];

    // Attempt to finding external links from ACF/Meta (simulated for now)
    // In a real WP setup, you'd expose these via REST API
    // For this demo, we can also parse them from specific tags or just check title

    // DEMO LOGIC: If title contains "API" or "Gateway", add a GitHub link
    if (post.title.rendered.toLowerCase().includes('api') || post.title.rendered.toLowerCase().includes('gateway')) {
        links.push({
            label: 'GitHub',
            url: 'https://github.com/naffee',
            icon: 'github'
        });
    }

    // DEMO LOGIC: If title contains "Processor" or "Real-time", add a Demo link
    if (post.title.rendered.toLowerCase().includes('processor') || post.title.rendered.toLowerCase().includes('real-time')) {
        links.push({
            label: 'Live Demo',
            url: '#', // TODO: Map to actual demo URL from CMS
            icon: 'external'
        });
    }

    return {
        id: String(post.id),
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]+>/g, ''), // Strip HTML
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400',
        category: category,
        tags: tagNames.slice(0, 4), // Limit to 4 tags for display
        links: links,
        featured: false
    };
};
