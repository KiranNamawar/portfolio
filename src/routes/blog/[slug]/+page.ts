import { getBlogPost } from '$lib/utils/blog.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
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
