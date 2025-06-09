import type { BlogPost } from '$lib/types/blog.js';
import { extractReadingTime } from './string.js';

export async function getBlogPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob('../../content/blogs/*.md', { eager: true });
	const posts: BlogPost[] = [];

	for (const path in modules) {
		const mod = modules[path] as { metadata?: BlogPost; default?: unknown; __content?: string };
		if (mod?.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			posts.push({
				...mod.metadata,
				slug,
				readingTime: mod.__content ? extractReadingTime(mod.__content) : undefined
			});
		}
	}

	return posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string) {
	try {
		// Use relative import path to fix Vite dynamic import issue
		const module = await import(`../../content/blogs/${slug}.md`);

		return {
			content: module.default,
			metadata: module.metadata
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
