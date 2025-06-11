import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Prism from 'prismjs';

// Import additional languages
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-sql.js';

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
	highlight: {
		highlighter: (code, lang) => {
			if (lang && Prism.languages[lang]) {
				const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
				return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
			}
			return `<pre><code>${code}</code></pre>`;
		}
	}
});

export default config;
