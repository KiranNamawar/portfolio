import type { Project } from '$lib/types/project.js';

export async function getProjects(): Promise<Project[]> {
	const modules = import.meta.glob('../../content/projects/*.md', { eager: true });
	const projects: Project[] = [];

	for (const path in modules) {
		const mod = modules[path] as { metadata?: Project; default?: unknown };
		if (mod?.metadata) {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			projects.push({
				...mod.metadata,
				slug
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

export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
