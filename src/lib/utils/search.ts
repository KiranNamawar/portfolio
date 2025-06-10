import type { BlogPost } from '$lib/types/blog.js';
import type { Project } from '$lib/types/project.js';

export interface SearchResult {
	type: 'blog' | 'project';
	item: BlogPost | Project;
	score: number;
	matchedFields: string[];
}

/**
 * Advanced search function with scoring and field matching
 * @param query - The search query
 * @param blogPosts - Array of blog posts to search
 * @param projects - Array of projects to search
 * @param maxResults - Maximum number of results to return
 * @returns Array of search results sorted by relevance
 */
export function searchContent(
	query: string,
	blogPosts: BlogPost[],
	projects: Project[],
	maxResults: number = 10
): SearchResult[] {
	if (!query.trim()) return [];

	const searchTerm = query.toLowerCase().trim();
	const searchWords = searchTerm.split(/\s+/);
	const results: SearchResult[] = [];

	// Search blog posts
	blogPosts.forEach((post) => {
		const { score, matchedFields } = calculateBlogScore(post, searchTerm, searchWords);
		if (score > 0) {
			results.push({
				type: 'blog',
				item: post,
				score,
				matchedFields
			});
		}
	});

	// Search projects
	projects.forEach((project) => {
		const { score, matchedFields } = calculateProjectScore(project, searchTerm, searchWords);
		if (score > 0) {
			results.push({
				type: 'project',
				item: project,
				score,
				matchedFields
			});
		}
	});

	// Sort by score (descending) and limit results
	return results.sort((a, b) => b.score - a.score).slice(0, maxResults);
}

/**
 * Calculate search score for blog posts
 */
function calculateBlogScore(
	post: BlogPost,
	searchTerm: string,
	searchWords: string[]
): { score: number; matchedFields: string[] } {
	let score = 0;
	const matchedFields: string[] = [];

	// Title match (highest priority)
	const titleMatch = getTextMatch(post.title, searchTerm, searchWords);
	if (titleMatch.score > 0) {
		score += titleMatch.score * 10; // Title gets 10x multiplier
		matchedFields.push('title');
	}

	// Description match
	const descMatch = getTextMatch(post.description, searchTerm, searchWords);
	if (descMatch.score > 0) {
		score += descMatch.score * 5; // Description gets 5x multiplier
		matchedFields.push('description');
	}
	// Tags match
	if (post.tags) {
		const tagsText = post.tags.join(' ');
		const tagsMatch = getTextMatch(tagsText, searchTerm, searchWords);
		if (tagsMatch.score > 0) {
			score += tagsMatch.score * 3; // Tags get 3x multiplier
			matchedFields.push('tags');
		}
	}

	// Boost for featured posts
	if (post.featured) {
		score *= 1.2;
	}

	// Recency boost (newer posts get slight preference)
	const daysSincePublished = (Date.now() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24);
	const recencyBoost = Math.max(0, ((365 - daysSincePublished) / 365) * 0.1);
	score *= 1 + recencyBoost;

	return { score, matchedFields };
}

/**
 * Calculate search score for projects
 */
function calculateProjectScore(
	project: Project,
	searchTerm: string,
	searchWords: string[]
): { score: number; matchedFields: string[] } {
	let score = 0;
	const matchedFields: string[] = [];

	// Title match (highest priority)
	const titleMatch = getTextMatch(project.title, searchTerm, searchWords);
	if (titleMatch.score > 0) {
		score += titleMatch.score * 10; // Title gets 10x multiplier
		matchedFields.push('title');
	}

	// Description match
	const descMatch = getTextMatch(project.description, searchTerm, searchWords);
	if (descMatch.score > 0) {
		score += descMatch.score * 5; // Description gets 5x multiplier
		matchedFields.push('description');
	}

	// Technologies match
	if (project.technologies) {
		const techText = project.technologies.join(' ');
		const techMatch = getTextMatch(techText, searchTerm, searchWords);
		if (techMatch.score > 0) {
			score += techMatch.score * 4; // Technologies get 4x multiplier
			matchedFields.push('technologies');
		}
	}

	// Boost for featured projects
	if (project.featured) {
		score *= 1.3;
	}

	// Recency boost (newer projects get slight preference)
	const daysSincePublished =
		(Date.now() - new Date(project.date).getTime()) / (1000 * 60 * 60 * 24);
	const recencyBoost = Math.max(0, ((365 - daysSincePublished) / 365) * 0.1);
	score *= 1 + recencyBoost;

	return { score, matchedFields };
}

/**
 * Calculate text match score for a given text field
 */
function getTextMatch(text: string, searchTerm: string, searchWords: string[]): { score: number } {
	const lowerText = text.toLowerCase();
	let score = 0;

	// Exact phrase match (highest score)
	if (lowerText.includes(searchTerm)) {
		if (lowerText.startsWith(searchTerm)) {
			score += 10; // Starts with query
		} else {
			score += 5; // Contains query
		}
	}

	// Individual word matches
	searchWords.forEach((word) => {
		if (word.length > 1 && lowerText.includes(word)) {
			if (lowerText.startsWith(word)) {
				score += 3; // Word at start
			} else {
				score += 1; // Word anywhere
			}
		}
	});

	// Fuzzy matching for typos (simple implementation)
	if (score === 0) {
		searchWords.forEach((word) => {
			if (word.length > 3) {
				const fuzzyScore = getFuzzyScore(lowerText, word);
				if (fuzzyScore > 0.7) {
					score += 0.5; // Small score for fuzzy matches
				}
			}
		});
	}

	return { score };
}

/**
 * Simple fuzzy matching using Levenshtein distance
 */
function getFuzzyScore(text: string, word: string): number {
	const words = text.split(/\s+/);
	let maxScore = 0;

	words.forEach((textWord) => {
		if (Math.abs(textWord.length - word.length) <= 2) {
			const distance = levenshteinDistance(textWord, word);
			const score = 1 - distance / Math.max(textWord.length, word.length);
			maxScore = Math.max(maxScore, score);
		}
	});

	return maxScore;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
	const matrix = [];

	for (let i = 0; i <= str2.length; i++) {
		matrix[i] = [i];
	}

	for (let j = 0; j <= str1.length; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= str2.length; i++) {
		for (let j = 1; j <= str1.length; j++) {
			if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					matrix[i][j - 1] + 1, // insertion
					matrix[i - 1][j] + 1 // deletion
				);
			}
		}
	}

	return matrix[str2.length][str1.length];
}

/**
 * Get search suggestions based on available content
 */
export function getSearchSuggestions(
	blogPosts: BlogPost[],
	projects: Project[],
	maxSuggestions: number = 5
): string[] {
	const suggestions = new Set<string>();

	// Add popular tags from blog posts
	blogPosts.forEach((post) => {
		post.tags?.forEach((tag) => {
			if (tag.length > 2) {
				suggestions.add(tag.toLowerCase());
			}
		});
	});

	// Add popular technologies from projects
	projects.forEach((project) => {
		project.technologies?.forEach((tech) => {
			if (tech.length > 2) {
				suggestions.add(tech.toLowerCase());
			}
		});
	});

	// Add common search terms
	suggestions.add('react');
	suggestions.add('typescript');
	suggestions.add('svelte');
	suggestions.add('tutorial');
	suggestions.add('guide');
	suggestions.add('project');

	return Array.from(suggestions).slice(0, maxSuggestions);
}

/**
 * Highlight search terms in text
 */
export function highlightSearchTerms(text: string, searchTerm: string): string {
	if (!searchTerm.trim()) return text;

	const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
	return text.replace(regex, '<mark>$1</mark>');
}
