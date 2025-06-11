import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import analyze from 'rollup-plugin-analyzer';

export default defineConfig({
	plugins: [
		sveltekit(),
		// Bundle analyzer (only in build mode with env var)
		...(process.env.ANALYZE_BUNDLE === 'true' ? [analyze({ summaryOnly: true })] : [])
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Only chunk external dependencies, not internal ones
					if (id.includes('node_modules')) {
						// Lucide icons chunk
						if (id.includes('@lucide/svelte')) {
							return 'icons';
						}
						// Date utilities
						if (id.includes('date-fns')) {
							return 'utils';
						}
						// Framework chunks
						if (id.includes('svelte') || id.includes('@sveltejs')) {
							return 'vendor';
						}
					}
					// Let SvelteKit handle the rest
					return null;
				}
			}
		},
		// Set chunk size warning limit
		chunkSizeWarningLimit: 400, // 400kB limit

		// Enable source maps for debugging (remove in production)
		sourcemap: false,

		// Minification options
		minify: 'esbuild',
		target: 'es2020'
	},

	// Optimize deps
	optimizeDeps: {
		include: ['@lucide/svelte', 'date-fns'],
		exclude: ['@sveltejs/kit', 'svelte']
	},

	// Server configuration for development
	server: {
		fs: {
			allow: ['..']
		}
	}
});
