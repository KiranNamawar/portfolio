import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const mdsvexConfig = defineConfig({
	extensions: ['.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [],
	rehypePlugins: []
});

const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md', '.svx']
};

export default config;
