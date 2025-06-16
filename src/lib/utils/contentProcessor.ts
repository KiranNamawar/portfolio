/**
 * Shared content processing utilities for blog posts and projects
 * Eliminates code duplication and improves performance
 */

import { calculateReadingTime } from './readingTime.js';
import { extractHeadings } from './markdown.js';

/**
 * Generic content item interface
 */
export interface ContentItem {
	slug: string;
	headings?: Array<{ level: number; text: string; id: string }>;
	readingTime?: number;
	wordCount?: number;
	published: boolean;
	date: string;
	description?: string;
	[key: string]: unknown;
}

/**
 * Content processing options
 */
export interface ContentProcessingOptions {
	defaultReadingTime: number;
	defaultWordCount: number;
	contentPath: string;
}

/**
 * Process markdown content files from a directory
 * Consolidates file reading and eliminates duplication
 */
export async function processMarkdownContent<T extends ContentItem>(
	options: ContentProcessingOptions
): Promise<T[]> {
	// Two separate glob calls - one for metadata, one for raw content
	const modules = import.meta.glob('../../content/**/*.md', { eager: true });
	const rawModules = import.meta.glob('../../content/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	const items: T[] = [];
	const pathPattern = new RegExp(`.*/${options.contentPath}/.*\\.md$`);

	for (const path in modules) {
		// Only process files from the specified content path
		if (!pathPattern.test(path)) continue;
		const mod = modules[path] as { metadata?: T; default?: unknown };
		const rawContent = rawModules[path] as string;

		if (mod?.metadata && rawContent) {
			const slug = path.split('/').pop()?.replace('.md', '') || ''; // Extract headings from raw markdown content
			const headings = extractHeadings(rawContent);

			// Calculate reading time from full raw content (this is the correct approach)
			const readingTimeResult = calculateReadingTime(rawContent);

			const processedItem: T = {
				...mod.metadata,
				slug,
				headings,
				readingTime: readingTimeResult.minutes || options.defaultReadingTime,
				wordCount: readingTimeResult.words || options.defaultWordCount
			} as T;

			items.push(processedItem);
		}
	}

	return items
		.filter((item) => item.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single content item by slug
 * Returns an object with content and metadata for route compatibility
 */
export async function getContentItem<T extends ContentItem>(
	slug: string,
	contentPath: string,
	defaultReadingTime: number = 3
): Promise<{ content: unknown; metadata: T } | null> {
	try {
		// Validate slug format (only allow alphanumeric, hyphens, underscores)
		if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
			console.warn(`Invalid slug format: ${slug}`);
			return null;
		}

		// Single dynamic import to get both metadata and content
		const [mod, rawContent] = await Promise.all([
			import(`../../content/${contentPath}/${slug}.md`),
			import(`../../content/${contentPath}/${slug}.md?raw`).then((m) => m.default)
		]);

		if (!mod?.metadata) {
			return null;
		}
		// Extract headings from raw markdown content
		const headings = extractHeadings(rawContent);

		// Calculate reading time from full raw content (this is the correct approach)
		const readingTimeResult = calculateReadingTime(rawContent);

		const metadata = {
			...mod.metadata,
			slug,
			headings,
			readingTime: readingTimeResult.minutes || defaultReadingTime,
			wordCount: readingTimeResult.words || defaultReadingTime * 100
		} as T;

		return {
			content: mod.default,
			metadata
		};
	} catch (error) {
		console.error(`Error loading content item: ${slug}`, error);
		return null;
	}
}
