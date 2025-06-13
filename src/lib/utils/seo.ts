/**
 * SEO utility functions for generating meta tags and structured data
 */

export interface SEOData {
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	imageAlt?: string;
	url?: string;
	type?: 'website' | 'article' | 'profile';
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	tags?: string[];
	readingTime?: string | number;
	canonical?: string;
}

export interface SiteConfig {
	name: string;
	url: string;
	description: string;
	author: {
		name: string;
		email: string;
		url: string;
		twitter?: string;
		github?: string;
		linkedin?: string;
	};
	defaultImage: string;
	locale: string;
	twitter?: {
		handle: string;
		site: string;
	};
}

export const siteConfig: SiteConfig = {
	name: "Kiran's Portfolio",
	url: 'https://keyrun.site',
	description:
		'Full Stack Developer creating digital solutions. Passionate about web development, technology, and open source.',
	author: {
		name: 'Kiran Namawar',
		email: 'kirannamawardev@gmail.com',
		url: 'https://keyrun.site',
		github: 'https://github.com/kirannamawar', // Update with your GitHub
		linkedin: 'https://linkedin.com/in/kirannamawardev' // Update with your LinkedIn
	},
	defaultImage: '/og-image.png',
	locale: 'en_US'
};

/**
 * Generate SEO meta tags for a page
 */
export function generateSEOTags(data: SEOData): Record<string, string> {
	const {
		title,
		description,
		keywords = [],
		image = siteConfig.defaultImage,
		imageAlt = description,
		url = siteConfig.url,
		type = 'website',
		publishedTime,
		modifiedTime,
		author = siteConfig.author.name,
		tags = [],
		readingTime,
		canonical
	} = data;

	// Ensure absolute URL for image
	const absoluteImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
	const absoluteUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;

	const metaTags: Record<string, string> = {
		// Basic Meta Tags
		title,
		description,
		author,

		// Keywords
		...(keywords.length > 0 && { keywords: keywords.join(', ') }),

		// Canonical URL
		canonical: canonical || absoluteUrl,

		// Open Graph
		'og:title': title,
		'og:description': description,
		'og:url': absoluteUrl,
		'og:image': absoluteImage,
		'og:image:alt': imageAlt,
		'og:type': type,
		'og:site_name': siteConfig.name,
		'og:locale': siteConfig.locale,

		// Twitter Card
		'twitter:card': 'summary_large_image',
		'twitter:title': title,
		'twitter:description': description,
		'twitter:image': absoluteImage,
		'twitter:image:alt': imageAlt,
		...(siteConfig.twitter && {
			'twitter:site': siteConfig.twitter.site,
			'twitter:creator': siteConfig.twitter.handle
		}),

		// Article specific (for blog posts)
		...(type === 'article' && {
			'article:author': author,
			...(publishedTime && { 'article:published_time': publishedTime }),
			...(modifiedTime && { 'article:modified_time': modifiedTime }),
			...(tags.length > 0 && { 'article:tag': tags.join(', ') })
		}),
		// Additional meta
		'theme-color': '#6366f1', // Update with your brand color
		'color-scheme': 'light dark',

		// Reading time for articles
		...(readingTime &&
			type === 'article' && {
				'reading-time': typeof readingTime === 'string' ? readingTime : `${readingTime} min read`
			})
	};

	return metaTags;
}

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(data: SEOData): string {
	const {
		title,
		description,
		image = siteConfig.defaultImage,
		url = siteConfig.url,
		type,
		publishedTime,
		modifiedTime,
		author = siteConfig.author.name,
		readingTime
	} = data;

	const absoluteImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
	const absoluteUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;
	// Base structured data
	let structuredData: Record<string, unknown> = {
		'@context': 'https://schema.org'
	};

	if (type === 'article') {
		// Blog post structured data
		structuredData = {
			...structuredData,
			'@type': 'BlogPosting',
			title,
			description,
			url: absoluteUrl,
			image: {
				'@type': 'ImageObject',
				url: absoluteImage,
				width: 1200,
				height: 630
			},
			author: {
				'@type': 'Person',
				name: author,
				url: siteConfig.author.url
			},
			publisher: {
				'@type': 'Organization',
				name: siteConfig.name,
				url: siteConfig.url,
				logo: {
					'@type': 'ImageObject',
					url: `${siteConfig.url}/favicon.png`
				}
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': absoluteUrl
			},
			...(publishedTime && { datePublished: publishedTime }),
			...(modifiedTime && { dateModified: modifiedTime }),
			...(readingTime && {
				timeRequired: `PT${typeof readingTime === 'string' ? readingTime.replace(' min read', '') : readingTime}M`
			})
		};
	} else if (type === 'profile') {
		// Person/Profile structured data
		structuredData = {
			...structuredData,
			'@type': 'Person',
			name: siteConfig.author.name,
			url: siteConfig.url,
			description,
			image: absoluteImage,
			email: siteConfig.author.email,
			jobTitle: 'Full Stack Developer',
			worksFor: {
				'@type': 'Organization',
				name: 'Freelance'
			},
			sameAs: [
				...(siteConfig.author.github ? [siteConfig.author.github] : []),
				...(siteConfig.author.linkedin ? [siteConfig.author.linkedin] : []),
				...(siteConfig.author.twitter
					? [`https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`]
					: [])
			]
		};
	} else {
		// Website structured data
		structuredData = {
			...structuredData,
			'@type': 'WebSite',
			name: siteConfig.name,
			description: siteConfig.description,
			url: siteConfig.url,
			author: {
				'@type': 'Person',
				name: siteConfig.author.name,
				url: siteConfig.author.url
			},
			potentialAction: {
				'@type': 'SearchAction',
				target: `${siteConfig.url}/search?q={search_term_string}`,
				'query-input': 'required name=search_term_string'
			}
		};
	}

	return JSON.stringify(structuredData, null, 2);
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbData(breadcrumbs: Array<{ name: string; url: string }>): string {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: crumb.url.startsWith('http') ? crumb.url : `${siteConfig.url}${crumb.url}`
		}))
	};

	return JSON.stringify(structuredData, null, 2);
}

/**
 * Create optimized page title
 */
export function createPageTitle(title: string, includeBaseName: boolean = true): string {
	if (!includeBaseName) return title;

	// Avoid duplicate site name
	if (title.includes(siteConfig.name)) return title;

	return `${title} | ${siteConfig.name}`;
}

/**
 * Generate sitemap data for pages
 */
export interface SitemapEntry {
	url: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

export function generateSitemapEntries(
	blogPosts: Array<{ slug: string; date: string }>,
	projects: Array<{ slug: string; date: string }>
): SitemapEntry[] {
	const entries: SitemapEntry[] = [
		{
			url: '/',
			changefreq: 'weekly',
			priority: 1.0
		},
		{
			url: '/blog',
			changefreq: 'weekly',
			priority: 0.8
		},
		{
			url: '/projects',
			changefreq: 'monthly',
			priority: 0.8
		}
	];

	// Add blog posts
	for (const post of blogPosts) {
		entries.push({
			url: `/blog/${post.slug}`,
			lastmod: post.date,
			changefreq: 'monthly',
			priority: 0.6
		});
	}

	// Add projects
	for (const project of projects) {
		entries.push({
			url: `/projects/${project.slug}`,
			lastmod: project.date,
			changefreq: 'monthly',
			priority: 0.7
		});
	}

	return entries;
}
