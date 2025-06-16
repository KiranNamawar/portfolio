import { getBlogPost, getRelatedBlogPosts } from '$lib/utils/blog.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	// Check if this is a static file being requested as a blog post
	const staticFiles = [
		'manifest.json',
		'robots.txt',
		'sitemap.xml',
		'favicon.ico',
		'favicon.png',
		'og-image.png',
		'og-image.svg'
	];
	if (staticFiles.includes(params.slug)) {
		throw redirect(301, `/${params.slug}`);
	}

	const post = await getBlogPost(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	// Get related posts based on tags
	const relatedPosts = await getRelatedBlogPosts(params.slug, post.metadata.tags);
	return {
		post: {
			...post.metadata,
			slug: params.slug
		},
		relatedPosts,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ContentComponent: post.content as any
	};
};
