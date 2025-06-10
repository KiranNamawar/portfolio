<script lang="ts">
	import { onMount } from 'svelte';
	import { getTechIcon } from '$lib/utils/techIcons';
	import '../../../styles/code-blocks.css';

	let mounted = false;

	const getLanguageIconElement = (lang: string): string => {
		const techIcon = getTechIcon(lang);

		if (techIcon.type === 'devicon') {
			const variant = techIcon.variant || 'original';
			return `<i class="devicon-${techIcon.icon}-${variant}" style="font-size: 1rem;"></i>`;
		} else {
			// For Lucide icons, we'll use a simple SVG placeholder since we can't directly import the component here
			// This maintains compatibility with the existing DOM manipulation approach
			return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
				<polyline points="16,18 22,12 16,6"></polyline>
				<polyline points="8,6 2,12 8,18"></polyline>
			</svg>`;
		}
	};
	const copyToClipboard = async (text: string, button: HTMLElement) => {
		try {
			await navigator.clipboard.writeText(text);
			const copyContent = button.querySelector('.copy-content') as HTMLElement;
			const checkContent = button.querySelector('.check-content') as HTMLElement;

			if (copyContent && checkContent) {
				copyContent.style.display = 'none';
				checkContent.style.display = 'flex';

				setTimeout(() => {
					copyContent.style.display = 'flex';
					checkContent.style.display = 'none';
				}, 2000);
			}
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const enhanceCodeBlocks = () => {
		const codeBlocks = document.querySelectorAll('pre:not(.enhanced)');

		codeBlocks.forEach((pre) => {
			const codeElement = pre.querySelector('code');
			if (!codeElement) return;

			// Mark as enhanced to avoid double processing
			pre.classList.add('enhanced');

			// Extract language from class name
			const classes = Array.from(codeElement.classList);
			const languageClass = classes.find((cls) => cls.startsWith('language-'));
			const language = languageClass ? languageClass.replace('language-', '') : '';

			// Get the code content
			const codeText = codeElement.textContent || '';

			// Create enhanced wrapper
			const wrapper = document.createElement('div');
			wrapper.className = 'enhanced-code-block';

			// Create header if language is detected
			let header = '';
			if (language) {
				header = `
					<div class="code-block-header">
						<div class="code-block-info">
							<span class="language-icon">${getLanguageIconElement(language)}</span>
							<span class="language-name">${language}</span>
						</div>						<button class="copy-button" aria-label="Copy code to clipboard" title="Copy code">
							<span class="copy-content">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
									<path d="m4 16-2-2v-10c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2"/>
								</svg>
								<span class="copy-text">Copy</span>
							</span>
							<span class="check-content" style="display: none;">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="20,6 9,17 4,12"/>
								</svg>
								<span class="check-text">Copied!</span>
							</span>
						</button>
					</div>
				`;
			}

			// Create the enhanced structure
			wrapper.innerHTML = `
				${header}
				<div class="code-block-wrapper">
					${pre.outerHTML}
					${
						!language
							? `						<button class="copy-button copy-button-overlay" aria-label="Copy code to clipboard" title="Copy code">
							<span class="copy-content">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
									<path d="m4 16-2-2v-10c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2"/>
								</svg>
							</span>
							<span class="check-content" style="display: none;">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="20,6 9,17 4,12"/>
								</svg>
							</span>
						</button>
					`
							: ''
					}
				</div>
			`;

			// Replace original pre with enhanced version
			pre.parentNode?.replaceChild(wrapper, pre);

			// Add copy functionality
			const copyButtons = wrapper.querySelectorAll('.copy-button');
			copyButtons.forEach((button) => {
				button.addEventListener('click', () => {
					copyToClipboard(codeText, button as HTMLElement);
				});
			});
		});
	};

	onMount(() => {
		mounted = true;
		enhanceCodeBlocks();

		// Re-enhance if new content is added (e.g., through dynamic imports)
		const observer = new MutationObserver(() => {
			enhanceCodeBlocks();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => {
			observer.disconnect();
		};
	});
</script>

<!-- This component automatically enhances code blocks, no visible output -->
