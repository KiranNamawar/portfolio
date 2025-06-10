/**
 * Reading Time Estimation Utility
 * Calculates estimated reading time based on content analysis
 */

export interface ReadingTimeResult {
	minutes: number;
	words: number;
	text: string;
}

/**
 * Calculate reading time for given text content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns ReadingTimeResult with minutes, word count, and formatted text
 */
export function calculateReadingTime(
	content: string,
	wordsPerMinute: number = 200
): ReadingTimeResult {
	// Remove HTML tags and markdown syntax
	const cleanText = content
		.replace(/<[^>]*>/g, '') // Remove HTML tags
		.replace(/```[\s\S]*?```/g, '') // Remove code blocks
		.replace(/`[^`]*`/g, '') // Remove inline code
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert links to text
		.replace(/[#*_~`]/g, '') // Remove markdown formatting
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim();

	// Count words (split by whitespace and filter empty strings)
	const words = cleanText.split(/\s+/).filter((word) => word.length > 0).length;

	// Calculate reading time in minutes
	const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

	// Generate human-readable text
	const text = minutes === 1 ? '1 min read' : `${minutes} min read`;

	return {
		minutes,
		words,
		text
	};
}

/**
 * Calculate reading time for markdown content with frontmatter
 * @param markdownContent - Full markdown content including frontmatter
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns ReadingTimeResult
 */
export function calculateMarkdownReadingTime(
	markdownContent: string,
	wordsPerMinute: number = 200
): ReadingTimeResult {
	// Remove frontmatter (everything between --- at the beginning)
	const contentWithoutFrontmatter = markdownContent.replace(/^---[\s\S]*?---\n?/, '');

	return calculateReadingTime(contentWithoutFrontmatter, wordsPerMinute);
}

/**
 * Get reading time estimation for different reading speeds
 * @param content - The text content to analyze
 * @returns Object with estimations for slow, average, and fast readers
 */
export function getReadingTimeEstimates(content: string) {
	return {
		slow: calculateReadingTime(content, 150), // Slow reader
		average: calculateReadingTime(content, 200), // Average reader
		fast: calculateReadingTime(content, 250) // Fast reader
	};
}
