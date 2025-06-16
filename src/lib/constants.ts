/**
 * Application constants and configuration values
 * Centralizes magic numbers and default values
 */

/**
 * Reading time and content defaults
 */
export const READING_TIME_DEFAULTS = {
	BLOG_MINUTES: 3,
	PROJECT_MINUTES: 5,
	WORDS_PER_MINUTE: 200,
	BLOG_DEFAULT_WORDS: 300,
	PROJECT_DEFAULT_WORDS: 500
} as const;

/**
 * Content processing constants
 */
export const CONTENT_PATHS = {
	BLOGS: 'blogs',
	PROJECTS: 'projects'
} as const;

/**
 * SEO and metadata constants
 */
export const SEO_DEFAULTS = {
	MAX_DESCRIPTION_LENGTH: 160,
	MAX_TITLE_LENGTH: 60,
	DEFAULT_IMAGE: '/og-image.svg'
} as const;

/**
 * Performance and optimization constants
 */
export const PERFORMANCE = {
	FEATURED_ITEMS_LIMIT: 3,
	SEARCH_RESULTS_LIMIT: 10,
	PAGINATION_SIZE: 9
} as const;

/**
 * Security constants
 */
export const SECURITY = {
	ALLOWED_SLUG_PATTERN: /^[a-zA-Z0-9_-]+$/,
	MAX_SLUG_LENGTH: 100,
	RATE_LIMIT_WINDOW: 60000, // 1 minute
	RATE_LIMIT_MAX_REQUESTS: 100
} as const;
