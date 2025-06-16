import type { BlogPost } from '$lib/types/blog.js';
import { processMarkdownContent, getContentItem } from './contentProcessor.js';
import { READING_TIME_DEFAULTS, CONTENT_PATHS } from '$lib/constants.js';

export async function getBlogPosts(): Promise<BlogPost[]> {
	return processMarkdownContent<BlogPost>({
		defaultReadingTime: READING_TIME_DEFAULTS.BLOG_MINUTES,
		defaultWordCount: READING_TIME_DEFAULTS.BLOG_DEFAULT_WORDS,
		contentPath: CONTENT_PATHS.BLOGS
	});
}

export async function getBlogPost(slug: string) {
	return getContentItem<BlogPost>(slug, CONTENT_PATHS.BLOGS, READING_TIME_DEFAULTS.BLOG_MINUTES);
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
