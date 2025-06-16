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
	bio: `I'm a passionate fresher full-stack developer with a strong focus on backend technologies 
like Node.js and GraphQL. I enjoy building robust web applications with clean, maintainable code 
and love learning new technologies to solve real-world problems.`,
	description: `When I'm not coding, you'll find me exploring backend frameworks, building personal 
projects, and continuously learning about server-side technologies, APIs, and database design.`,
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
	'Backend Developer',
	'Node.js Developer', 
	'GraphQL Enthusiast'
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
