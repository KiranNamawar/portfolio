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
