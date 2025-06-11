// Analyze content to determine which languages are actually used
import { glob } from 'glob';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to detect languages used in markdown files
export function getUsedLanguages(): string[] {
	const usedLanguages = new Set<string>();

	// Default languages we always want
	usedLanguages.add('javascript');
	usedLanguages.add('typescript');
	usedLanguages.add('css');
	usedLanguages.add('json');

	try {
		// Find all markdown files
		const markdownFiles = glob.sync(join(__dirname, '../content/**/*.md'));

		markdownFiles.forEach((file: string) => {
			const content = readFileSync(file, 'utf8');

			// Extract code block languages using regex
			const codeBlockRegex = /```(\w+)/g;
			let match: RegExpExecArray | null;

			while ((match = codeBlockRegex.exec(content)) !== null) {
				const lang = match[1].toLowerCase();
				if (lang && lang !== 'text' && lang.length > 0) {
					usedLanguages.add(lang);
				}
			}
		});
	} catch (error) {
		console.warn('Could not analyze markdown files for language detection:', error);
	}

	return Array.from(usedLanguages);
}

// Language mapping for Shiki
export const languageAliases: Record<string, string> = {
	js: 'javascript',
	ts: 'typescript',
	bash: 'shell',
	sh: 'shell',
	md: 'markdown',
	yml: 'yaml',
	vue: 'vue',
	py: 'python'
};

export function normalizeLanguage(lang: string): string {
	const normalized = lang.toLowerCase();
	return languageAliases[normalized] || normalized;
}
