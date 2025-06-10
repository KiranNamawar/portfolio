import type { Project } from '$lib/types/project.js';
import { calculateReadingTime } from './readingTime.js';

export async function getProjects(): Promise<Project[]> {
	const modules = import.meta.glob('../../content/projects/*.md', { eager: true });
	const rawModules = import.meta.glob('../../content/projects/*.md', { eager: true, as: 'raw' });
	const projects: Project[] = [];

	for (const path in modules) {
		const mod = modules[path] as { metadata?: Project; default?: unknown };
		const rawContent = rawModules[path] as string;

		if (mod?.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';

			// Always calculate reading time from actual content
			let readingTime = 1;
			let wordCount = 0;

			if (rawContent) {
				const readingTimeResult = calculateReadingTime(rawContent);
				readingTime = readingTimeResult.minutes;
				wordCount = readingTimeResult.words;
			}

			projects.push({
				...mod.metadata,
				slug,
				readingTime,
				wordCount
			});
		}
	}

	return projects
		.filter((project) => project.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProject(slug: string) {
	try {
		// Get the module normally for content
		const module = await import(`../../content/projects/${slug}.md`);
		
		// Get the calculated data from the list function
		const allProjects = await getProjects();
		const projectData = allProjects.find(project => project.slug === slug);

		return {
			content: module.default,
			metadata: {
				...module.metadata,
				readingTime: projectData?.readingTime || 1,
				wordCount: projectData?.wordCount || 0
			}
		};
	} catch (error) {
		console.error(`Error loading project ${slug}:`, error);
		return null;
	}
}

export async function getFeaturedProjects(): Promise<Project[]> {
	const projects = await getProjects();
	return projects.filter((project) => project.featured);
}
