import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Optimized language list - only load what we actually use
const SUPPORTED_LANGUAGES = [
	'javascript',
	'typescript',
	'css',
	'json',
	'bash',
	'svelte',
	'html',
	'markdown'
];

// Create Shiki highlighter with optimized config
const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: SUPPORTED_LANGUAGES
});

// Helper function to get icon HTML based on language
function getLanguageIconHTML(lang) {
	const langLower = lang.toLowerCase();

	// Devicon mapping for code languages
	const deviconMap = {
		javascript: 'devicon-javascript-plain',
		js: 'devicon-javascript-plain',
		typescript: 'devicon-typescript-plain',
		ts: 'devicon-typescript-plain',
		css: 'devicon-css3-plain',
		json: 'devicon-json-plain',
		bash: 'devicon-bash-plain',
		shell: 'devicon-bash-plain',
		svelte: 'devicon-svelte-plain',
		html: 'devicon-html5-plain',
		markdown: 'devicon-markdown-original',
		md: 'devicon-markdown-original',
		python: 'devicon-python-plain',
		text: 'devicon-code-plain'
	};

	if (deviconMap[langLower]) {
		return `<i class="${deviconMap[langLower]} code-block-lang-devicon"></i>`;
	}

	// Fallback to Lucide code icon
	return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="code-block-lang-lucide">
		<polyline points="16,18 22,12 16,6"></polyline>
		<polyline points="8,6 2,12 8,18"></polyline>
	</svg>`;
}

const config = defineConfig({
	extensions: ['.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	layout: {
		blog: join(__dirname, './src/lib/components/layouts/BlogLayout.svelte'),
		project: join(__dirname, './src/lib/components/layouts/ProjectLayout.svelte'),
		_: join(__dirname, './src/lib/components/layouts/BlogLayout.svelte')
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const displayLang = lang || 'text';
			const encodedCode = Buffer.from(code).toString('base64');
			const iconHTML = getLanguageIconHTML(displayLang);

			if (lang && lang !== 'text') {
				try {
					const htmlLight = highlighter.codeToHtml(code, {
						lang,
						theme: 'github-light',
						transformers: []
					});
					const htmlDark = highlighter.codeToHtml(code, {
						lang,
						theme: 'github-dark',
						transformers: []
					});

					const lightCode = escapeSvelte(htmlLight);
					const darkCode = escapeSvelte(htmlDark);
					return `{@html \`<div class="code-block-container" data-lang="${lang}">
						<div class="code-block-header">
							<div class="code-block-lang">
								${iconHTML}
								<span class="code-block-lang-title">${displayLang}</span>
							</div>
							<button class="code-block-copy-btn" data-code="${encodedCode}">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
									<path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
								</svg>
							</button>
						</div>
						<div class="code-block-content">
							<div class="light-theme">${lightCode}</div>
							<div class="dark-theme">${darkCode}</div>
						</div>
					</div>\`}`;
				} catch {
					// Fallback for unsupported languages
					const iconHTML = getLanguageIconHTML(displayLang);
					return `{@html \`<div class="code-block-container" data-lang="text">
						<div class="code-block-header">
							<div class="code-block-lang">
								${iconHTML}
								<span class="code-block-lang-title">${displayLang}</span>
							</div>
							<button class="code-block-copy-btn" data-code="${encodedCode}">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
									<path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
								</svg>
							</button>
						</div>
						<div class="code-block-content">
							<pre><code>${code}</code></pre>
						</div>
					</div>\`}`;
				}
			}
			return `{@html \`<div class="code-block-container" data-lang="text">
				<div class="code-block-header">
					<div class="code-block-lang">
						${getLanguageIconHTML('text')}
						<span class="code-block-lang-title">text</span>
					</div>
					<button class="code-block-copy-btn" data-code="${encodedCode}">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
							<path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
						</svg>
					</button>
				</div>
				<div class="code-block-content">
					<pre><code>${code}</code></pre>
				</div>
			</div>\`}`;
		}
	}
});

export default config;
