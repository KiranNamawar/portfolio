/**
 * Personal information and static data for the portfolio
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {string} name - Full name
 * @property {string} title - Professional title
 * @property {string} bio - Short biography
 * @property {string} description - Extended description
 * @property {string} email - Contact email
 * @property {string} location - Current location
 * @property {string} resumeUrl - URL to resume/CV
 */

/**
 * @type {PersonalInfo}
 */
export const personalInfo = {
	name: 'Kiran',
	title: 'Full Stack Developer',
	bio: `I'm a passionate full-stack developer with over 4 years of experience creating 
digital solutions that make a difference. I love turning complex problems into 
simple, beautiful, and intuitive designs.`,
	description: `When I'm not coding, you'll find me exploring new technologies, contributing to 
open-source projects, or mentoring aspiring developers in the community.`,
	email: 'kirannamawardev@gmail.com',
	location: 'Mumbai, India',
	resumeUrl: '/resume.pdf'
};

/**
 * @typedef {string[]} HeroTypingPhrases
 */

/**
 * @type {HeroTypingPhrases}
 */
export const heroTypingPhrases = [
	'Full Stack Developer',
	'Creative Problem Solver',
	'Technology Enthusiast',
	'Digital Innovator'
];

/**
 * @typedef {Object} Skill
 * @property {string} name - Skill name
 * @property {string} level - Skill level (foundational, developing, proficient, expert, master)
 * @property {string} icon - Emoji icon representing the skill
 * @property {string} category - Skill category (frontend, backend, database, devops, etc.)
 * @property {string[]} achievements - Key achievements or examples at this level
 * @property {string} description - Brief description of current capability
 */

/**
 * Skill level definitions
 */
export const skillLevels = {
	foundational: { order: 1, label: 'Foundational', color: 'from-gray-400 to-gray-500' },
	developing: { order: 2, label: 'Developing', color: 'from-blue-400 to-blue-500' },
	proficient: { order: 3, label: 'Proficient', color: 'from-green-400 to-green-500' },
	expert: { order: 4, label: 'Expert', color: 'from-purple-400 to-purple-500' },
	master: { order: 5, label: 'Master', color: 'from-gold-400 to-gold-500' }
};

/**
 * @type {Skill[]}
 */
export const skills = [
	{
		name: 'JavaScript',
		level: 'proficient',
		icon: '🟨',
		category: 'frontend',
		achievements: [
			'Advanced patterns (closures, currying, composition)',
			'Async programming mastery',
			'Performance optimization',
			'Complex application architecture'
		],
		description:
			'Deep understanding of modern JavaScript including ES6+, async patterns, and performance optimization'
	},
	{
		name: 'TypeScript',
		level: 'proficient',
		icon: '�',
		category: 'frontend',
		achievements: [
			'Advanced type systems',
			'Generic programming',
			'Complex interface design',
			'Type-safe architecture'
		],
		description:
			'Expertise in TypeScript type system, generics, and building type-safe applications'
	},
	{
		name: 'Svelte',
		level: 'expert',
		icon: '🧡',
		category: 'frontend',
		achievements: [
			'SvelteKit application architecture',
			'Custom store patterns',
			'Performance optimization',
			'Component library development'
		],
		description:
			'Advanced Svelte development with custom patterns, performance optimization, and architectural design'
	},
	{
		name: 'React',
		level: 'proficient',
		icon: '⚛️',
		category: 'frontend',
		achievements: [
			'Complex state management',
			'Custom hooks development',
			'Performance optimization',
			'Component architecture'
		],
		description: 'Solid React development with advanced patterns, hooks, and state management'
	},
	{
		name: 'Vue',
		level: 'developing',
		icon: '💚',
		category: 'frontend',
		achievements: [
			'Component-based development',
			'Vuex state management',
			'Vue Router implementation',
			'Basic animations'
		],
		description: 'Working knowledge of Vue.js with component architecture and state management'
	},
	{
		name: 'HTML',
		level: 'expert',
		icon: '🏗️',
		category: 'frontend',
		achievements: [
			'Semantic HTML mastery',
			'Accessibility best practices',
			'SEO optimization',
			'Performance considerations'
		],
		description: 'Expert-level semantic HTML with accessibility, SEO, and performance optimization'
	},
	{
		name: 'CSS',
		level: 'proficient',
		icon: '🎨',
		category: 'frontend',
		achievements: [
			'Advanced layout systems',
			'CSS architecture (BEM, CSS-in-JS)',
			'Animation and transitions',
			'Responsive design mastery'
		],
		description: 'Advanced CSS with modern layout systems, animations, and responsive design'
	},
	{
		name: 'Tailwind CSS',
		level: 'proficient',
		icon: '�',
		category: 'frontend',
		achievements: [
			'Custom design systems',
			'Component abstraction',
			'Advanced utility patterns',
			'Plugin development'
		],
		description:
			'Proficient in Tailwind CSS with custom design systems and utility-first architecture'
	},
	{
		name: 'SCSS',
		level: 'proficient',
		icon: '🎯',
		category: 'frontend',
		achievements: [
			'Advanced mixins and functions',
			'Modular architecture',
			'Variable management',
			'Build optimization'
		],
		description: 'Advanced SCSS with modular architecture and build optimization'
	},
	{
		name: 'Node.js',
		level: 'proficient',
		icon: '💚',
		category: 'backend',
		achievements: [
			'RESTful API development',
			'Microservices architecture',
			'Database integration',
			'Performance optimization'
		],
		description:
			'Proficient Node.js development with API design, microservices, and performance optimization'
	},
	{
		name: 'Python',
		level: 'developing',
		icon: '🐍',
		category: 'backend',
		achievements: [
			'FastAPI development',
			'Data processing scripts',
			'Basic web scraping',
			'API integration'
		],
		description: 'Solid Python skills with web development and data processing capabilities'
	},
	{
		name: 'Express',
		level: 'proficient',
		icon: '🚀',
		category: 'backend',
		achievements: [
			'Advanced middleware development',
			'API architecture design',
			'Security implementation',
			'Performance optimization'
		],
		description: 'Advanced Express.js development with custom middleware and API architecture'
	},
	{
		name: 'FastAPI',
		level: 'developing',
		icon: '⚡',
		category: 'backend',
		achievements: [
			'API development with automatic docs',
			'Pydantic model validation',
			'Async endpoint creation',
			'Database integration'
		],
		description: 'FastAPI development with automatic documentation and async capabilities'
	},
	{
		name: 'PostgreSQL',
		level: 'proficient',
		icon: '�',
		category: 'database',
		achievements: [
			'Complex query optimization',
			'Database design and normalization',
			'Index optimization',
			'Performance tuning'
		],
		description:
			'Advanced PostgreSQL with query optimization, database design, and performance tuning'
	},
	{
		name: 'MongoDB',
		level: 'developing',
		icon: '🍃',
		category: 'database',
		achievements: [
			'Document-based data modeling',
			'Aggregation pipelines',
			'Basic indexing strategies',
			'CRUD operations'
		],
		description: 'MongoDB development with document modeling and aggregation pipelines'
	},
	{
		name: 'Redis',
		level: 'developing',
		icon: '🔴',
		category: 'database',
		achievements: [
			'Caching strategies',
			'Session management',
			'Pub/Sub messaging',
			'Performance optimization'
		],
		description: 'Redis implementation for caching, sessions, and performance optimization'
	},
	{
		name: 'Git',
		level: 'proficient',
		icon: '🌿',
		category: 'tools',
		achievements: [
			'Advanced branching strategies',
			'Conflict resolution',
			'Repository management',
			'Collaborative workflows'
		],
		description: 'Advanced Git workflows with branching strategies and team collaboration'
	},
	{
		name: 'Docker',
		level: 'developing',
		icon: '�',
		category: 'devops',
		achievements: [
			'Multi-stage builds',
			'Container orchestration',
			'Docker Compose',
			'Production deployment'
		],
		description: 'Docker containerization with multi-stage builds and orchestration'
	},
	{
		name: 'AWS',
		level: 'developing',
		icon: '🌩️',
		category: 'devops',
		achievements: [
			'EC2 and S3 management',
			'Lambda functions',
			'CloudFormation basics',
			'Cost optimization'
		],
		description: 'AWS cloud services with compute, storage, and serverless capabilities'
	},
	{
		name: 'Vercel',
		level: 'proficient',
		icon: '▲',
		category: 'devops',
		achievements: [
			'Advanced deployment strategies',
			'Edge functions',
			'Domain management',
			'Analytics integration'
		],
		description: 'Expert Vercel deployment with edge functions and performance optimization'
	},
	{
		name: 'Figma',
		level: 'developing',
		icon: '🎨',
		category: 'design',
		achievements: [
			'Component system design',
			'Prototyping workflows',
			'Design system creation',
			'Collaborative design'
		],
		description: 'Design system creation and prototyping with collaborative workflows'
	},
	{
		name: 'VS Code',
		level: 'expert',
		icon: '�',
		category: 'tools',
		achievements: [
			'Advanced configuration',
			'Extension development',
			'Workflow optimization',
			'Team settings management'
		],
		description: 'Expert VS Code usage with advanced configuration and workflow optimization'
	}
];

/**
 * @typedef {Object} ContactInfo
 * @property {string} label - Contact method label
 * @property {string} value - Contact value (display text)
 * @property {string} href - Contact link/href
 * @property {string} type - Type of contact (email, phone, location)
 */

/**
 * @type {ContactInfo[]}
 */
export const contactInfo = [
	{
		label: 'Email',
		value: 'kirannamawardev@gmail.com',
		href: 'mailto:kirannamawardev@gmail.com',
		type: 'email'
	},
	{
		label: 'Location',
		value: 'Mumbai, India',
		href: 'https://maps.google.com',
		type: 'location'
	}
];

/**
 * @typedef {Object} SocialLink
 * @property {string} platform - Social platform name
 * @property {string} url - Profile URL
 * @property {string} color - Brand color for the platform
 * @property {string} username - Username on the platform
 */

/**
 * @type {SocialLink[]}
 */
export const socialLinks = [
	{
		platform: 'GitHub',
		url: 'https://github.com/kirannamawar',
		color: '#333',
		username: 'kirannamawar'
	},
	{
		platform: 'LinkedIn',
		url: 'https://linkedin.com/in/kirannamawardev',
		color: '#0077b5',
		username: 'kirannamawardev'
	}
];
