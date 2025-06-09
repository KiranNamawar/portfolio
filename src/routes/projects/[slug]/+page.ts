import { getProject } from '$lib/utils/project.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const project = await getProject(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		project: {
			...project.metadata,
			slug: params.slug
		},
		ContentComponent: project.content
	};
};
