import type { Project } from '$lib/types/project.js';
import { calculateReadingTime } from './readingTime.js';

export async function getProjects(): Promise<Project[]> {
	const modules = import.meta.glob('../../content/projects/*.md', { eager: true });
	const projects: Project[] = [];

	for (const path in modules) {
		const mod = modules[path] as {
			metadata?: Project;
			default?: unknown;
		};

		if (mod?.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';

			// For reading time calculation, we'll use a placeholder or extract from metadata
			// Since we can't use .render() in Svelte 5, we'll estimate based on content length
			let content = '';
			if (mod.metadata.description) {
				content = mod.metadata.description;
			}

			const readingTimeResult = calculateReadingTime(content);

			projects.push({
				...mod.metadata,
				slug,
				readingTime: readingTimeResult.minutes || 5, // Default to 5 minutes if no content
				wordCount: readingTimeResult.words || 500 // Default word count
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
		const projectData = allProjects.find((project) => project.slug === slug);

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
