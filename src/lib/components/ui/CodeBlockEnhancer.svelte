<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	const getLanguageIcon = (lang: string) => {
		const langLower = lang.toLowerCase();
		const iconMap: Record<string, string> = {
			javascript: '🟨',
			js: '🟨',
			typescript: '🔷',
			ts: '🔷',
			svelte: '🧡',
			html: '🌐',
			css: '🎨',
			scss: '💜',
			sass: '💜',
			json: '📋',
			markdown: '📝',
			md: '📝',
			bash: '💻',
			shell: '💻',
			sh: '💻',
			terminal: '💻',
			python: '🐍',
			py: '🐍',
			react: '⚛️',
			jsx: '⚛️',
			vue: '💚',
			sql: '🗄️',
			yaml: '📄',
			yml: '📄',
			xml: '📄',
			php: '🐘',
			java: '☕',
			c: '🔧',
			cpp: '🔧',
			rust: '🦀',
			go: '🐹',
			dart: '🎯'
		};
		return iconMap[langLower] || '📄';
	};	const copyToClipboard = async (text: string, button: HTMLElement) => {
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
			const languageClass = classes.find(cls => cls.startsWith('language-'));
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
							<span class="language-icon">${getLanguageIcon(language)}</span>
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
					${!language ? `						<button class="copy-button copy-button-overlay" aria-label="Copy code to clipboard" title="Copy code">
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
					` : ''}
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

<style>	:global(.enhanced-code-block) {
		margin: var(--space-6) 0;
		border-radius: var(--radius-xl);
		overflow: hidden;
		background: var(--code-glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--code-glass-border);
		box-shadow: 0 8px 32px var(--code-glass-shadow);
		transition: all var(--transition-normal);
	}

	:global(.enhanced-code-block:hover) {
		transform: translateY(-2px);
		box-shadow: 0 12px 40px var(--code-glass-shadow);
		border-color: var(--primary-400);
	}
	:global(.enhanced-code-block .code-block-header) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-3) var(--space-4);
		background: var(--color-bg-tertiary);
		border-bottom: 1px solid var(--code-glass-border);
		backdrop-filter: blur(10px);
	}

	:global(.enhanced-code-block .code-block-info) {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
	}

	:global(.enhanced-code-block .language-icon) {
		font-size: var(--font-size-base);
	}

	:global(.enhanced-code-block .language-name) {
		text-transform: capitalize;
	}	:global(.enhanced-code-block .copy-button) {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2) var(--space-3);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		backdrop-filter: blur(10px);
		min-height: 32px;
		opacity: 1;
		visibility: visible;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
	}

	:global(.enhanced-code-block .copy-content),
	:global(.enhanced-code-block .check-content) {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	:global(.enhanced-code-block .copy-text),
	:global(.enhanced-code-block .check-text) {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}
	:global(.enhanced-code-block .copy-button:hover) {
		background: var(--primary-500);
		color: white;
		transform: scale(1.05);
		border-color: var(--primary-600);
	}
	:global(.enhanced-code-block .copy-button:active) {
		transform: scale(0.95);
	}
	/* Header copy button specific styles */
	:global(.enhanced-code-block .code-block-header .copy-button) {
		background: var(--primary-100);
		border-color: var(--primary-300);
		color: var(--primary-700);
		padding: var(--space-2) var(--space-3);
		font-weight: var(--font-weight-semibold);
	}

	:global(.enhanced-code-block .code-block-header .copy-button:hover) {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-600);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px var(--primary-500/25);
	}

	/* Overlay copy button (for code blocks without language) */
	:global(.enhanced-code-block .copy-button-overlay) {
		padding: var(--space-2);
	}

	:global(.enhanced-code-block .copy-button-overlay .copy-text),
	:global(.enhanced-code-block .copy-button-overlay .check-text) {
		display: none;
	}

	:global(.enhanced-code-block .copy-button-overlay) {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	:global(.enhanced-code-block .code-block-wrapper) {
		position: relative;
	}

	:global(.enhanced-code-block .code-block-wrapper:hover .copy-button-overlay) {
		opacity: 1;
	}
	:global(.enhanced-code-block pre) {
		margin: 0;
		padding: var(--space-5);
		background: transparent;
		border: none;
		border-radius: 0;
		font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
		font-size: var(--font-size-sm);
		line-height: 1.6;
		overflow-x: auto;
		/* Custom scrollbar styling */
		scrollbar-width: thin;
		scrollbar-color: var(--primary-400) transparent;
	}

	/* Webkit scrollbar styling for better browsers */
	:global(.enhanced-code-block pre::-webkit-scrollbar) {
		height: 6px;
		width: 6px;
	}

	:global(.enhanced-code-block pre::-webkit-scrollbar-track) {
		background: transparent;
		border-radius: var(--radius-full);
	}

	:global(.enhanced-code-block pre::-webkit-scrollbar-thumb) {
		background: var(--primary-400);
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
	}

	:global(.enhanced-code-block pre::-webkit-scrollbar-thumb:hover) {
		background: var(--primary-500);
		transform: scaleY(1.2);
	}

	:global(.enhanced-code-block pre::-webkit-scrollbar-corner) {
		background: transparent;
	}

	:global(.enhanced-code-block pre code) {
		background: transparent;
		padding: 0;
		border: none;
		border-radius: 0;
		font-size: inherit;
	}	/* Dark mode specific adjustments */
	:global([data-theme="dark"] .enhanced-code-block pre) {
		background: rgba(0, 0, 0, 0.2);
		scrollbar-color: var(--primary-500) rgba(255, 255, 255, 0.1);
	}

	:global([data-theme="dark"] .enhanced-code-block pre::-webkit-scrollbar-thumb) {
		background: var(--primary-500);
	}

	:global([data-theme="dark"] .enhanced-code-block pre::-webkit-scrollbar-thumb:hover) {
		background: var(--primary-400);
	}

	:global([data-theme="dark"] .enhanced-code-block .code-block-header) {
		background: rgba(0, 0, 0, 0.3);
		border-bottom-color: rgba(255, 255, 255, 0.1);
	}
	:global([data-theme="dark"] .enhanced-code-block .code-block-header .copy-button) {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.9);
		font-weight: var(--font-weight-semibold);
	}

	:global([data-theme="dark"] .enhanced-code-block .code-block-header .copy-button:hover) {
		background: var(--primary-600);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px var(--primary-600/25);
	}	/* Light mode specific adjustments */
	:global([data-theme="light"] .enhanced-code-block pre) {
		background: rgba(255, 255, 255, 0.3);
		scrollbar-color: var(--primary-600) rgba(0, 0, 0, 0.1);
	}

	:global([data-theme="light"] .enhanced-code-block pre::-webkit-scrollbar-thumb) {
		background: var(--primary-600);
	}

	:global([data-theme="light"] .enhanced-code-block pre::-webkit-scrollbar-thumb:hover) {
		background: var(--primary-700);
	}

	:global([data-theme="light"] .enhanced-code-block .code-block-header) {
		background: rgba(255, 255, 255, 0.5);
		border-bottom-color: rgba(0, 0, 0, 0.1);
	}
	:global([data-theme="light"] .enhanced-code-block .code-block-header .copy-button) {
		background: var(--primary-100);
		border-color: var(--primary-300);
		color: var(--primary-700);
		font-weight: var(--font-weight-semibold);
	}

	:global([data-theme="light"] .enhanced-code-block .code-block-header .copy-button:hover) {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-600);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px var(--primary-500/25);
	}	/* Responsive design */
	@media (max-width: 768px) {
		:global(.enhanced-code-block) {
			margin: var(--space-4) -var(--space-2);
			border-radius: var(--radius-lg);
		}

		:global(.enhanced-code-block pre) {
			padding: var(--space-4);
			font-size: var(--font-size-xs);
		}

		:global(.enhanced-code-block .code-block-header) {
			padding: var(--space-2) var(--space-3);
			min-height: 40px;
		}

		:global(.enhanced-code-block .code-block-info) {
			font-size: var(--font-size-xs);
		}

		:global(.enhanced-code-block .code-block-header .copy-button) {
			padding: var(--space-1) var(--space-2);
			font-size: var(--font-size-xs);
			min-height: 24px;
			margin: 0;
		}
		:global(.enhanced-code-block .copy-text),
		:global(.enhanced-code-block .check-text) {
			font-size: var(--font-size-xs);
		}

		/* Mobile scrollbar adjustments */
		:global(.enhanced-code-block pre::-webkit-scrollbar) {
			height: 4px;
			width: 4px;
		}

		:global(.enhanced-code-block pre::-webkit-scrollbar-thumb) {
			background: var(--primary-500);
		}
	}
</style>
