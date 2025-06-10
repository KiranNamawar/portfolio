import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = defineConfig({
	extensions: ['.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	// Add layout for blog posts and projects
	layout: {
		blog: join(__dirname, './src/lib/components/layouts/BlogLayout.svelte'),
		project: join(__dirname, './src/lib/components/layouts/ProjectLayout.svelte'),
		_: join(__dirname, './src/lib/components/layouts/BlogLayout.svelte') // fallback
	},
	rehypePlugins: []
});

export default config;
