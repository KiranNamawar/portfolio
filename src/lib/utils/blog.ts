import type { BlogPost } from '$lib/types/blog.js';
import { calculateReadingTime } from './readingTime.js';

export async function getBlogPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob('../../content/blogs/*.md', { eager: true });
	const posts: BlogPost[] = [];

	for (const path in modules) {
		const mod = modules[path] as { metadata?: BlogPost; default?: unknown };
		if (mod?.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';

			// Get content for reading time calculation
			const content = (mod.default as any)?.render?.()?.html || '';
			const readingTimeResult = calculateReadingTime(content);

			posts.push({
				...mod.metadata,
				slug,
				readingTime: readingTimeResult.minutes,
				wordCount: readingTimeResult.words
			});
		}
	}
	return posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string) {
	try {
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
		return null;
	}
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
	const posts = await getBlogPosts();
	return posts.filter((post) => post.featured).slice(0, 3);
}
