import { getBlogPost } from '$lib/utils/blog.js';
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

	return {
		post: {
			...post.metadata,
			slug: params.slug
		},
		ContentComponent: post.content
	};
};
