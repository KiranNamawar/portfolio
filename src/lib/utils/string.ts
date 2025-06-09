/**
 * String utility functions for text processing and formatting
 */

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - suffix.length) + suffix;
}

export function capitalize(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeWords(text: string): string {
	return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function kebabToTitle(kebabCase: string): string {
	return kebabCase
		.split('-')
		.map((word) => capitalize(word))
		.join(' ');
}

export function extractReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}
