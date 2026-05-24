import { marked } from 'marked';

export interface Frontmatter {
    id?: number;
    title: string;
    excerpt?: string;
    description?: string;
    date: string;
    readTime?: string;
    category?: string;
    tags?: string[];
    thumbnail?: string;
    imageUrl?: string;
    slug?: string;
    featured?: boolean;
    links?: { label: string; url: string; icon?: string }[];
}

export interface ParsedMarkdown {
    metadata: Frontmatter;
    html: string;
}

export function parseMarkdown(rawContent: string): ParsedMarkdown {
    if (typeof rawContent !== 'string') {
        return {
            metadata: {
                title: 'Untitled',
                date: new Date().toISOString()
            },
            html: ''
        };
    }
    // Matches --- followed by non-greedy anything, followed by --- and the rest of content
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = rawContent.match(frontmatterRegex);

    if (!match) {
        return {
            metadata: {
                title: 'Untitled',
                date: new Date().toISOString()
            },
            html: rawContent
        };
    }

    const yamlBlock = match[1];
    const markdownContent = match[2];
    const metadata: any = {
        tags: [],
        links: []
    };

    yamlBlock.split(/\r?\n/).forEach(line => {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex !== -1) {
            const key = line.substring(0, separatorIndex).trim();
            const value = line.substring(separatorIndex + 1).trim();

            // Strip quotes
            const cleanValue = value.replace(/^['"]|['"]$/g, '');

            if (key === 'tags') {
                if (cleanValue.startsWith('[') && cleanValue.endsWith(']')) {
                    metadata.tags = cleanValue
                        .slice(1, -1)
                        .split(',')
                        .map(s => s.trim().replace(/^['"]|['"]$/g, ''));
                } else {
                    metadata.tags = cleanValue ? [cleanValue] : [];
                }
            } else if (key === 'featured') {
                metadata.featured = cleanValue === 'true';
            } else if (key === 'links') {
                try {
                    metadata.links = JSON.parse(cleanValue);
                } catch {
                    metadata.links = [];
                }
            } else {
                metadata[key] = cleanValue;
            }
        }
    });

    const html = marked.parse(markdownContent) as string;

    return {
        metadata: metadata as Frontmatter,
        html
    };
}
