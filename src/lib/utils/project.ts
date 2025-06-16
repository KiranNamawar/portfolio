import type { Project } from '$lib/types/project.js';
import { processMarkdownContent, getContentItem } from './contentProcessor.js';
import { READING_TIME_DEFAULTS, CONTENT_PATHS } from '$lib/constants.js';

export async function getProjects(): Promise<Project[]> {
	return processMarkdownContent<Project>({
		defaultReadingTime: READING_TIME_DEFAULTS.PROJECT_MINUTES,
		defaultWordCount: READING_TIME_DEFAULTS.PROJECT_DEFAULT_WORDS,
		contentPath: CONTENT_PATHS.PROJECTS
	});
}

export async function getProject(slug: string) {
	return getContentItem<Project>(
		slug,
		CONTENT_PATHS.PROJECTS,
		READING_TIME_DEFAULTS.PROJECT_MINUTES
	);
}

export async function getFeaturedProjects(): Promise<Project[]> {
	const projects = await getProjects();
	return projects.filter((project) => project.featured);
}

export async function getRelatedProjects(
	currentSlug: string,
	currentTechnologies: string[] = []
): Promise<Project[]> {
	const projects = await getProjects();

	// Filter out current project
	const otherProjects = projects.filter((project) => project.slug !== currentSlug);

	if (currentTechnologies.length === 0) {
		// If no technologies, return most recent projects
		return otherProjects.slice(0, 4);
	}

	// Score projects based on technology matches
	const scoredProjects = otherProjects.map((project) => {
		const projectTechs = project.technologies || [];
		const commonTechs = projectTechs.filter((tech) => currentTechnologies.includes(tech));
		const score = commonTechs.length;

		return { project, score };
	});

	// Sort by score (descending) then by date (newest first)
	scoredProjects.sort((a, b) => {
		if (a.score !== b.score) {
			return b.score - a.score;
		}
		return new Date(b.project.date).getTime() - new Date(a.project.date).getTime();
	});

	return scoredProjects.slice(0, 4).map((item) => item.project);
}
