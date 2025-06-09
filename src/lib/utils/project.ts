import type { Project } from '$lib/types/project.js';
import { extractReadingTime } from './string.js';

export async function getProjects(): Promise<Project[]> {
	const modules = import.meta.glob('../../content/projects/*.md', { eager: true });
	const projects: Project[] = [];

	for (const path in modules) {
		const mod = modules[path] as { metadata?: Project; default?: unknown; __content?: string };
		if (mod?.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			projects.push({
				...mod.metadata,
				slug,
				readingTime: mod.__content ? extractReadingTime(mod.__content) : undefined
			});
		}
	}

	return projects
		.filter((project) => project.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProject(slug: string) {
	try {
		// Use relative import path to fix Vite dynamic import issue
		const module = await import(`../../content/projects/${slug}.md`);

		return {
			content: module.default,
			metadata: module.metadata
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
