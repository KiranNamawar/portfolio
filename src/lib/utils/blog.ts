import type { BlogPost } from '$lib/types/blog.js';
import { calculateReadingTime } from './readingTime.js';
import { extractHeadings } from './markdown.js';

export async function getBlogPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob('../../content/blogs/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});
	const metadataModules = import.meta.glob('../../content/blogs/*.md', { eager: true });
	const posts: BlogPost[] = [];

	for (const path in modules) {
		const rawContent = modules[path] as string;
		const metadataPath = path;
		const mod = metadataModules[metadataPath] as { metadata?: BlogPost; default?: unknown };

		if (mod?.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';

			// Extract headings from raw markdown content
			const headings = extractHeadings(rawContent);

			// For reading time calculation, use description or fallback
			let content = '';
			if (mod.metadata.description) {
				content = mod.metadata.description;
			}

			const readingTimeResult = calculateReadingTime(content);

			posts.push({
				...mod.metadata,
				slug,
				headings,
				readingTime: readingTimeResult.minutes || 3, // Default to 3 minutes if no content
				wordCount: readingTimeResult.words || 300 // Default word count
			});
		}
	}
	return posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string) {
	try {
		// Validate slug format (only allow alphanumeric, hyphens, underscores)
		if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
			console.error(`Invalid blog post slug format: ${slug}`);
			return null;
		}

		// Get the module normally for content
		const module = await import(`../../content/blogs/${slug}.md`);

		// Get the calculated data from the list function
		const allPosts = await getBlogPosts();
		const postData = allPosts.find((post) => post.slug === slug);

		return {
			content: module.default,
			metadata: {
				...module.metadata,
				readingTime: postData?.readingTime || 1,
				wordCount: postData?.wordCount || 0
			}
		};
	} catch (error) {
		console.error(`Error loading blog post ${slug}:`, error);

		// Check if this is a common static file being requested as a blog post
		const staticFiles = [
			'manifest.json',
			'robots.txt',
			'sitemap.xml',
			'favicon.ico',
			'favicon.png'
		];
		if (staticFiles.includes(slug)) {
			console.warn(
				`Static file ${slug} was requested as a blog post. This should be handled by static file serving.`
			);
		}

		return null;
	}
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
	const posts = await getBlogPosts();
	return posts.filter((post) => post.featured).slice(0, 3);
}

export async function getRelatedBlogPosts(
	currentSlug: string,
	currentTags: string[] = []
): Promise<BlogPost[]> {
	const posts = await getBlogPosts();

	// Filter out current post
	const otherPosts = posts.filter((post) => post.slug !== currentSlug);

	if (currentTags.length === 0) {
		// If no tags, return most recent posts
		return otherPosts.slice(0, 4);
	}

	// Score posts based on tag matches
	const scoredPosts = otherPosts.map((post) => {
		const postTags = post.tags || [];
		const commonTags = postTags.filter((tag) => currentTags.includes(tag));
		const score = commonTags.length;

		return { post, score };
	});

	// Sort by score (descending) then by date (newest first)
	scoredPosts.sort((a, b) => {
		if (a.score !== b.score) {
			return b.score - a.score;
		}
		return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
	});

	return scoredPosts.slice(0, 4).map((item) => item.post);
}
