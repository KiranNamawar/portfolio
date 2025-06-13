import type { BlogHeading } from '$lib/types/blog.js';
import type { ProjectHeading } from '$lib/types/project.js';

/**
 * Extract headings from markdown content
 * @param content - Raw markdown content
 * @returns Array of heading objects with id, text, and level
 */
export function extractHeadings(content: string): (BlogHeading | ProjectHeading)[] {
	const headings: BlogHeading[] = [];
	const headingRegex = /^(#{1,6})\s+(.+)$/gm;
	let match;

	while ((match = headingRegex.exec(content)) !== null) {
		const level = match[1].length;
		const text = match[2].trim();
		const id = generateHeadingId(text);

		headings.push({
			id,
			text,
			level
		});
	}

	return headings;
}

/**
 * Generate a URL-friendly ID from heading text
 * This should match the same logic used in your markdown renderer
 */
export function generateHeadingId(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Find heading in content by approximate text match
 * Useful for fuzzy matching when searching
 */
export function findHeadingByText(
	headings: (BlogHeading | ProjectHeading)[],
	searchText: string
): BlogHeading | ProjectHeading | null {
	const lowerSearchText = searchText.toLowerCase();

	// First try exact match
	let found = headings.find((h) => h.text.toLowerCase() === lowerSearchText);
	if (found) return found;

	// Then try partial match
	found = headings.find((h) => h.text.toLowerCase().includes(lowerSearchText));
	if (found) return found;

	// Finally try if search text is contained in heading
	found = headings.find((h) => lowerSearchText.includes(h.text.toLowerCase()));
	return found || null;
}

/**
 * Type alias for project headings (same structure as blog headings)
 */
export type { ProjectHeading } from '$lib/types/project.js';
