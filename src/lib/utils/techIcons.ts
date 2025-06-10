import { Code, Zap, Database, Globe, Smartphone, Monitor } from '@lucide/svelte';
import type { Component } from 'svelte';

export interface TechIcon {
	type: 'devicon' | 'lucide';
	icon: string;
	variant?: 'original' | 'plain' | 'colored';
	component?: Component;
}

/**
 * Maps technology names to their corresponding icons
 * Supports both Devicon and Lucide icons as fallbacks
 *
 * @param tech - The technology name (case-insensitive)
 * @returns TechIcon object with type, icon name, variant, and component (for Lucide icons)
 */
export function getTechIcon(tech: string): TechIcon {
	// Normalize tech name: lowercase and remove dots, spaces, and special chars
	const techLower = tech.toLowerCase().replace(/[.\s-_]/g, '');

	// Devicon mapping with preferred variants
	const deviconMap: Record<
		string,
		{ icon: string; preferredVariant: 'original' | 'plain' | 'colored' }
	> = {
		javascript: { icon: 'javascript', preferredVariant: 'plain' },
		js: { icon: 'javascript', preferredVariant: 'plain' },
		typescript: { icon: 'typescript', preferredVariant: 'plain' },
		ts: { icon: 'typescript', preferredVariant: 'plain' },
		json: { icon: 'json', preferredVariant: 'plain' },
		react: { icon: 'react', preferredVariant: 'original' },
		reactjs: { icon: 'react', preferredVariant: 'original' },
		vue: { icon: 'vuejs', preferredVariant: 'plain' },
		vuejs: { icon: 'vuejs', preferredVariant: 'plain' },
		angular: { icon: 'angularjs', preferredVariant: 'original' },
		svelte: { icon: 'svelte', preferredVariant: 'plain' },
		sveltekit: { icon: 'svelte', preferredVariant: 'plain' },
		node: { icon: 'nodejs', preferredVariant: 'original' },
		nodejs: { icon: 'nodejs', preferredVariant: 'plain' },
		python: { icon: 'python', preferredVariant: 'plain' },
		java: { icon: 'java', preferredVariant: 'original' },
		csharp: { icon: 'csharp', preferredVariant: 'original' },
		'c#': { icon: 'csharp', preferredVariant: 'original' },
		php: { icon: 'php', preferredVariant: 'original' },
		html: { icon: 'html5', preferredVariant: 'original' },
		html5: { icon: 'html5', preferredVariant: 'original' },
		css: { icon: 'css3', preferredVariant: 'plain' },
		css3: { icon: 'css3', preferredVariant: 'plain' },
		sass: { icon: 'sass', preferredVariant: 'original' },
		scss: { icon: 'sass', preferredVariant: 'original' },
		tailwind: { icon: 'tailwindcss', preferredVariant: 'original' },
		tailwindcss: { icon: 'tailwindcss', preferredVariant: 'original' },
		bootstrap: { icon: 'bootstrap', preferredVariant: 'original' },
		mongodb: { icon: 'mongodb', preferredVariant: 'plain' },
		mysql: { icon: 'mysql', preferredVariant: 'original' },
		postgresql: { icon: 'postgresql', preferredVariant: 'plain' },
		postgres: { icon: 'postgresql', preferredVariant: 'plain' },
		redis: { icon: 'redis', preferredVariant: 'original' },
		docker: { icon: 'docker', preferredVariant: 'original' },
		git: { icon: 'git', preferredVariant: 'original' },
		github: { icon: 'github', preferredVariant: 'original' },
		gitlab: { icon: 'gitlab', preferredVariant: 'original' },
		vscode: { icon: 'vscode', preferredVariant: 'original' },
		figma: { icon: 'figma', preferredVariant: 'original' },
		nextjs: { icon: 'nextjs', preferredVariant: 'plain' },
		next: { icon: 'nextjs', preferredVariant: 'plain' },
		nuxtjs: { icon: 'nuxtjs', preferredVariant: 'original' },
		nuxt: { icon: 'nuxtjs', preferredVariant: 'original' },
		express: { icon: 'express', preferredVariant: 'original' },
		fastapi: { icon: 'fastapi', preferredVariant: 'original' },
		flask: { icon: 'flask', preferredVariant: 'original' },
		django: { icon: 'django', preferredVariant: 'plain' },
		laravel: { icon: 'laravel', preferredVariant: 'original' },
		firebase: { icon: 'firebase', preferredVariant: 'original' },
		aws: { icon: 'amazonwebservices', preferredVariant: 'original' },
		amazonwebservices: { icon: 'amazonwebservices', preferredVariant: 'original' },
		vercel: { icon: 'vercel', preferredVariant: 'original' },
		webpack: { icon: 'webpack', preferredVariant: 'original' },
		vite: { icon: 'vitejs', preferredVariant: 'original' },
		vitejs: { icon: 'vitejs', preferredVariant: 'original' },
		rollup: { icon: 'rollup', preferredVariant: 'original' },
		eslint: { icon: 'eslint', preferredVariant: 'original' },
		prettier: { icon: 'prettier', preferredVariant: 'original' },
		jest: { icon: 'jest', preferredVariant: 'plain' },
		cypress: { icon: 'cypressio', preferredVariant: 'original' },
		cypressio: { icon: 'cypressio', preferredVariant: 'original' },
		storybook: { icon: 'storybook', preferredVariant: 'original' },
		graphql: { icon: 'graphql', preferredVariant: 'plain' },
		apollo: { icon: 'apollographql', preferredVariant: 'original' },
		apollographql: { icon: 'apollographql', preferredVariant: 'original' },
		prisma: { icon: 'prisma', preferredVariant: 'original' },
		supabase: { icon: 'supabase', preferredVariant: 'original' },
		planetscale: { icon: 'planetscale', preferredVariant: 'original' },
		npm: { icon: 'npm', preferredVariant: 'original' },
		yarn: { icon: 'yarn', preferredVariant: 'original' },
		pnpm: { icon: 'pnpm', preferredVariant: 'plain' },
		bash: { icon: 'bash', preferredVariant: 'plain' },
		bun: { icon: 'bun', preferredVariant: 'plain' },
		linux: { icon: 'linux', preferredVariant: 'original' },
		ubuntu: { icon: 'ubuntu', preferredVariant: 'original' },
		windows: { icon: 'windows11', preferredVariant: 'original' },
		macos: { icon: 'apple', preferredVariant: 'original' },
		apple: { icon: 'apple', preferredVariant: 'original' }
	};

	if (deviconMap[techLower]) {
		const { icon, preferredVariant } = deviconMap[techLower];
		return { type: 'devicon', icon, variant: preferredVariant };
	}

	// Lucide fallbacks for common categories
	const lucideMap: Record<string, Component> = {
		api: Globe,
		rest: Globe,
		graphql: Database,
		database: Database,
		db: Database,
		mobile: Smartphone,
		ios: Smartphone,
		android: Smartphone,
		frontend: Monitor,
		backend: Database,
		fullstack: Code,
		framework: Code,
		library: Code,
		tool: Code,
		performance: Zap,
		testing: Code,
		deployment: Code,
		devops: Code,
		cloud: Globe,
		serverless: Zap,
		microservices: Database,
		container: Code,
		orchestration: Code
	};

	if (lucideMap[techLower]) {
		return { type: 'lucide', icon: techLower, component: lucideMap[techLower] };
	}

	// Default fallback
	return { type: 'lucide', icon: 'code', component: Code };
}

/**
 * Gets the best available Devicon variant for an icon
 * Tries variants in order: original → plain → colored
 *
 * @param iconName - The Devicon icon name
 * @param preferredVariant - The preferred variant to try first
 * @returns The best available variant
 */
export function getBestDeviconVariant(
	iconName: string,
	preferredVariant: 'original' | 'plain' | 'colored' = 'original'
): 'original' | 'plain' | 'colored' {
	// In a real implementation, we could check if the icon exists in the DOM
	// For now, we'll use the preferred variant and fall back to 'original'
	const variantPriority: ('original' | 'plain' | 'colored')[] = [
		preferredVariant,
		'original',
		'plain',
		'colored'
	];

	// Remove duplicates while preserving order
	const uniqueVariants = variantPriority.filter(
		(variant, index) => variantPriority.indexOf(variant) === index
	);

	// For now, return the first variant (preferred)
	// In the future, this could include actual DOM checking
	return uniqueVariants[0];
}

/**
 * Gets all supported Devicon technology names
 * Useful for validation or autocomplete features
 */
export function getSupportedDeviconTechnologies(): string[] {
	return [
		'javascript',
		'typescript',
		'react',
		'vue',
		'angular',
		'svelte',
		'nodejs',
		'python',
		'java',
		'csharp',
		'php',
		'html5',
		'css3',
		'sass',
		'tailwindcss',
		'bootstrap',
		'mongodb',
		'mysql',
		'postgresql',
		'redis',
		'docker',
		'git',
		'github',
		'gitlab',
		'vscode',
		'figma',
		'nextjs',
		'nuxtjs',
		'express',
		'fastapi',
		'flask',
		'django',
		'laravel',
		'firebase',
		'aws',
		'vercel',
		'webpack',
		'vite',
		'rollup',
		'eslint',
		'prettier',
		'jest',
		'cypress',
		'storybook',
		'graphql',
		'apollo',
		'prisma',
		'supabase',
		'planetscale',
		'npm',
		'yarn',
		'pnpm',
		'bun',
		'linux',
		'ubuntu',
		'windows',
		'macos'
	];
}

/**
 * Gets all supported Lucide fallback categories
 * Useful for validation or autocomplete features
 */
export function getSupportedLucideCategories(): string[] {
	return [
		'api',
		'rest',
		'database',
		'mobile',
		'ios',
		'android',
		'frontend',
		'backend',
		'fullstack',
		'framework',
		'library',
		'tool',
		'performance',
		'testing',
		'deployment',
		'devops',
		'cloud',
		'serverless',
		'microservices',
		'container',
		'orchestration'
	];
}
