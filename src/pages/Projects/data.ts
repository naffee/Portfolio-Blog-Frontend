export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string; // In a real app, these would be local assets or URLs
    category: string; // Allow dynamic strings from WP
    tags: string[];
    links: {
        label: string;
        url: string;
        icon?: string;
    }[];
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'Scalable API Gateway',
        description: 'A high-performance entry point for microservices using FastAPI and Redis for rate limiting. Supports dynamic routing and JWT authentication.',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&q=80&w=1000', // Placeholder
        category: 'Software Development',
        tags: ['FastAPI', 'PostgreSQL', 'Redis'],
        links: [
            { label: 'GitHub', url: '#' },
            { label: 'Demo', url: '#' }
        ],
        featured: true
    },
    {
        id: '2',
        title: 'Microservices Architecture Guide',
        description: 'A comprehensive 50-page technical guide for implementing event-driven architectures. Focuses on consistency patterns and error handling.',
        imageUrl: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=1000',
        category: 'Writing',
        tags: ['Markdown', 'Docusaurus', 'Architecture'],
        links: [
            { label: 'Read Guide', url: '#' }
        ],
        featured: true
    },
    {
        id: '3',
        title: 'Real-time Data Processor',
        description: 'Streaming data pipeline utilizing Kafka and Python to process 100k+ events per second with sub-millisecond latency.',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
        category: 'Software Development',
        tags: ['Python', 'Kafka', 'Docker'],
        links: [
            { label: 'GitHub', url: '#' },
            { label: 'Metrics', url: '#' }
        ],
        featured: true
    },
    {
        id: '4',
        title: 'API Documentation Standard',
        description: 'Internal documentation standard for REST and GraphQL APIs. Adopted by teams of 50+ engineers to ensure consistency.',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
        category: 'Writing',
        tags: ['OpenAPI', 'GraphQL', 'Style Guide'],
        links: [
            { label: 'Documentation', url: '#' }
        ],
        featured: false
    },
    {
        id: '5',
        title: 'Auth Service Microkernel',
        description: 'A reusable authentication core supporting OAuth2, SAML, and WebAuthn. Designed for modular integration into existing ecosystems.',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000',
        category: 'Software Development',
        tags: ['Go', 'PostgreSQL', 'OAuth'],
        links: [
            { label: 'GitHub', url: '#' }
        ],
        featured: false
    },
    {
        id: '6',
        title: 'Serverless Data Ingest',
        description: 'Infrastructure-as-Code implementation for an AWS Lambda-based data ingestion pipeline. Managed via Terraform.',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
        category: 'Infra',
        tags: ['AWS', 'Terraform', 'Lambda'],
        links: [
            { label: 'View Scripts', url: '#' }
        ],
        featured: false
    }
];
