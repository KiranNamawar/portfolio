/**
 * Structured data (JSON-LD) utilities for SEO optimization
 * Implements schema.org markup for better search engine understanding
 */

import type { BlogPost } from '$lib/types/blog.js';
import type { Project } from '$lib/types/project.js';
import { personalInfo } from '$lib/data/personal.js';

/**
 * Generate structured data for a blog post
 */
export function generateBlogPostStructuredData(post: BlogPost, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.description,
		author: {
			'@type': 'Person',
			name: personalInfo.name,
			url: 'https://yourportfolio.com/about' // Replace with your actual domain
		},
		datePublished: post.date,
		dateModified: post.date,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url
		},
		publisher: {
			'@type': 'Person',
			name: personalInfo.name
		},
		image: post.image || '/og-image.svg',
		articleSection: post.category || 'Development',
		keywords: post.tags?.join(', ') || '',
		wordCount: post.wordCount || 0,
		timeRequired: `PT${post.readingTime || 3}M`,
		inLanguage: 'en-US',
		url: url
	};
}

/**
 * Generate structured data for a project
 */
export function generateProjectStructuredData(project: Project, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		'@id': url,
		name: project.title,
		description: project.description,
		author: {
			'@type': 'Person',
			name: personalInfo.name,
			url: 'https://yourportfolio.com/about' // Replace with your actual domain
		},
		dateCreated: project.date,
		datePublished: project.date,
		image: project.image || '/project-placeholder.svg',
		url: url,
		keywords: project.technologies?.join(', ') || '',
		...(project.github && {
			codeRepository: project.github
		}),
		...(project.demo && {
			workExample: {
				'@type': 'WebSite',
				url: project.demo
			}
		}),
		programmingLanguage: project.technologies || []
	};
}

/**
 * Generate structured data for the website/portfolio
 */
export function generateWebsiteStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'PersonalSite',
		'@id': 'https://yourportfolio.com/', // Replace with your actual domain
		name: `${personalInfo.name} - Portfolio`,
		description: personalInfo.bio,
		url: 'https://yourportfolio.com/', // Replace with your actual domain
		author: {
			'@type': 'Person',
			'@id': 'https://yourportfolio.com/about', // Replace with your actual domain
			name: personalInfo.name,
			jobTitle: personalInfo.title,
			description: personalInfo.description,
			email: personalInfo.email,
			address: {
				'@type': 'PostalAddress',
				addressLocality: personalInfo.location
			}
		},
		mainEntity: {
			'@type': 'Person',
			name: personalInfo.name,
			jobTitle: personalInfo.title,
			description: personalInfo.bio
		},
		inLanguage: 'en-US'
	};
}

/**
 * Generate structured data for the blog listing page
 */
export function generateBlogListingStructuredData(posts: BlogPost[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		'@id': 'https://yourportfolio.com/blog', // Replace with your actual domain
		name: `${personalInfo.name}'s Blog`,
		description: 'Thoughts, tutorials, and insights from my development journey',
		url: 'https://yourportfolio.com/blog', // Replace with your actual domain
		author: {
			'@type': 'Person',
			name: personalInfo.name
		},
		blogPost: posts.slice(0, 10).map((post) => ({
			'@type': 'BlogPosting',
			'@id': `https://yourportfolio.com/blog/${post.slug}`, // Replace with your actual domain
			headline: post.title,
			description: post.description,
			datePublished: post.date,
			author: {
				'@type': 'Person',
				name: personalInfo.name
			}
		}))
	};
}

/**
 * Generate structured data for the projects listing page
 */
export function generateProjectListingStructuredData(projects: Project[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		'@id': 'https://yourportfolio.com/projects', // Replace with your actual domain
		name: `${personalInfo.name}'s Projects`,
		description: 'A collection of development projects and case studies',
		url: 'https://yourportfolio.com/projects', // Replace with your actual domain
		numberOfItems: projects.length,
		itemListElement: projects.map((project, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'CreativeWork',
				'@id': `https://yourportfolio.com/projects/${project.slug}`, // Replace with your actual domain
				name: project.title,
				description: project.description,
				dateCreated: project.date,
				author: {
					'@type': 'Person',
					name: personalInfo.name
				}
			}
		}))
	};
}
