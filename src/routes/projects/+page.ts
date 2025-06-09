import { getProjects } from '$lib/utils/project.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const projects = await getProjects();

	return {
		projects
	};
};
