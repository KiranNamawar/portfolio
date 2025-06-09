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
	email: 'kiran@example.com',
	location: 'Your City, Country',
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
 * @typedef {Object} Stat
 * @property {string} number - The statistic number/value
 * @property {string} label - The statistic label/description
 */

/**
 * @type {Stat[]}
 */
export const stats = [
	{
		number: '50+',
		label: 'Projects Completed'
	},
	{
		number: '4+',
		label: 'Years Experience'
	},
	{
		number: '20+',
		label: 'Happy Clients'
	}
];

/**
 * @typedef {Object} Skill
 * @property {string} name - Skill name
 * @property {number} level - Proficiency level (0-100)
 * @property {string} icon - Emoji icon representing the skill
 */

/**
 * @type {Skill[]}
 */
export const skills = [
	{ name: 'JavaScript/TypeScript', level: 95, icon: '🟨' },
	{ name: 'Svelte/SvelteKit', level: 90, icon: '🧡' },
	{ name: 'React/Next.js', level: 85, icon: '⚛️' },
	{ name: 'Node.js', level: 88, icon: '💚' },
	{ name: 'CSS/Tailwind', level: 92, icon: '🎨' },
	{ name: 'Python', level: 80, icon: '🐍' },
	{ name: 'Database Design', level: 85, icon: '🗄️' },
	{ name: 'DevOps/Docker', level: 75, icon: '🐳' }
];

/**
 * @typedef {Object} Experience
 * @property {string} title - Job title
 * @property {string} company - Company name
 * @property {string} period - Employment period
 * @property {string} description - Job description
 * @property {string[]} technologies - Technologies used
 */

/**
 * @type {Experience[]}
 */
export const experience = [
	{
		title: 'Senior Full Stack Developer',
		company: 'Tech Corp',
		period: '2023 - Present',
		description:
			'Leading development of scalable web applications using modern frameworks and cloud technologies.',
		technologies: ['SvelteKit', 'TypeScript', 'AWS', 'PostgreSQL']
	},
	{
		title: 'Full Stack Developer',
		company: 'Digital Agency',
		period: '2021 - 2023',
		description:
			'Built responsive web applications and APIs for diverse clients across various industries.',
		technologies: ['React', 'Node.js', 'MongoDB', 'Docker']
	},
	{
		title: 'Frontend Developer',
		company: 'Startup Inc',
		period: '2020 - 2021',
		description: 'Developed user interfaces and improved user experience for SaaS platform.',
		technologies: ['Vue.js', 'JavaScript', 'SCSS', 'Figma']
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
		value: 'kiran@example.com',
		href: 'mailto:kiran@example.com',
		type: 'email'
	},
	{
		label: 'Phone',
		value: '+1 (555) 123-4567',
		href: 'tel:+15551234567',
		type: 'phone'
	},
	{
		label: 'Location',
		value: 'San Francisco, CA',
		href: 'https://maps.google.com',
		type: 'location'
	}
];

/**
 * @typedef {Object} SocialLink
 * @property {string} label - Social platform name
 * @property {string} href - Profile URL
 * @property {string} color - Brand color for the platform
 * @property {string} username - Username on the platform
 */

/**
 * @type {SocialLink[]}
 */
export const socialLinks = [
	{
		label: 'GitHub',
		href: 'https://github.com/yourusername',
		color: '#333',
		username: 'yourusername'
	},
	{
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/yourusername',
		color: '#0077b5',
		username: 'yourusername'
	},
	{
		label: 'Twitter',
		href: 'https://twitter.com/yourusername',
		color: '#1da1f2',
		username: 'yourusername'
	}
];
