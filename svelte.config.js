import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import mdsvexConfig from './mdsvex.config.js';

const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md', '.svx']
};

export default config;
