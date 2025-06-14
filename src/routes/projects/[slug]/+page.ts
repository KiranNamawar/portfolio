import { getProject, getRelatedProjects } from '$lib/utils/project.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	// Check if this is a static file being requested as a project
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
	const project = await getProject(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	// Get related projects based on technologies
	const relatedProjects = await getRelatedProjects(params.slug, project.metadata.technologies);

	return {
		project: {
			...project.metadata,
			slug: params.slug
		},
		relatedProjects,
		ContentComponent: project.content
	};
};
