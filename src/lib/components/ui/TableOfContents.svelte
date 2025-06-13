<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { List, X } from '@lucide/svelte';

	interface TocItem {
		id: string;
		text: string;
		level: number;
		element: HTMLElement;
	}
	export let isOpen = false;
	export let showToggle = true;
	export let minHeadings = 3; // Minimum number of headings to show TOC

	let tocItems: TocItem[] = [];
	let activeId = '';
	let observer: IntersectionObserver;
	let tocContainer: HTMLElement;
	let tocList: HTMLElement;
	let isVisible = false;

	// Set initial state based on screen size
	function setInitialState() {
		if (typeof window !== 'undefined') {
			isOpen = window.innerWidth >= 1024;
		}
	}

	// Generate slug from heading text
	function generateSlug(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/--+/g, '-')
			.trim();
	}
	// Extract headings from the document
	function extractHeadings() {
		if (typeof document === 'undefined') return;

		const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const items: TocItem[] = [];

		headings.forEach((heading) => {
			const level = parseInt(heading.tagName.charAt(1));
			const text = heading.textContent?.trim() || '';

			// Skip if heading is empty or is the main title (h1)
			if (!text || level === 1) return;

			let id = heading.id;
			if (!id) {
				id = generateSlug(text);
				heading.id = id;
			}

			items.push({
				id,
				text,
				level,
				element: heading as HTMLElement
			});
		});

		tocItems = items;
		isVisible = items.length >= minHeadings;
	}
	// Scroll active item into view in TOC
	function scrollActiveTocItemIntoView() {
		if (typeof document === 'undefined' || !tocList || !activeId) return;

		const activeLink = tocList.querySelector(`a[href="#${activeId}"]`);
		if (activeLink) {
			activeLink.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		}
	}

	// Setup intersection observer for active section tracking
	function setupObserver() {
		if (typeof window === 'undefined') return;

		const options = {
			rootMargin: '-20% 0px -60% 0px',
			threshold: 0
		};

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeId = entry.target.id;
					// Scroll the active TOC item into view
					setTimeout(() => scrollActiveTocItemIntoView(), 100);
				}
			});
		}, options);

		tocItems.forEach((item) => {
			observer.observe(item.element);
		});
	}
	// Smooth scroll to section
	function scrollToSection(id: string, event: Event) {
		event.preventDefault();
		if (typeof document === 'undefined') return;

		const element = document.getElementById(id);
		if (!element) return;

		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});

		// Update URL without triggering navigation
		if (typeof window !== 'undefined') {
			window.history.replaceState({}, '', `#${id}`);
		}

		// Close TOC on mobile after clicking
		if (window.innerWidth < 768) {
			isOpen = false;
		}
	}

	// Toggle TOC visibility
	function toggleToc() {
		isOpen = !isOpen;
	}
	// Handle escape key to close TOC
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}

	// Handle window resize
	function handleResize() {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) {
				isOpen = true;
			} else if (window.innerWidth < 768) {
				isOpen = false;
			}
		}
	}
	onMount(() => {
		// Set initial state based on screen size
		setInitialState();

		// Wait for content to render before extracting headings
		setTimeout(() => {
			extractHeadings();
			if (tocItems.length > 0) {
				setupObserver();
			}
		}, 100);

		// Add event listeners only in browser
		if (typeof document !== 'undefined') {
			document.addEventListener('keydown', handleKeydown);
		}
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
		}
		// Set initial active section from URL hash
		if (typeof window !== 'undefined' && window.location.hash) {
			activeId = window.location.hash.slice(1);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
		if (typeof document !== 'undefined') {
			document.removeEventListener('keydown', handleKeydown);
		}
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

{#if isVisible}
	<aside class="toc-sidebar {isOpen ? 'open' : 'closed'}" bind:this={tocContainer}>
		<div class="toc-content glass-card">
			<div class="toc-header">
				<h3 class="toc-title">Table of Contents</h3>
				{#if showToggle}
					<button
						class="toc-close glass-control-btn mobile-only"
						on:click={toggleToc}
						aria-label="Close Table of Contents"
					>
						<X size={20} />
					</button>
				{/if}
			</div>

			<nav class="toc-nav">
				<ul class="toc-list" bind:this={tocList}>
					{#each tocItems as item (item.id)}
						<li class="toc-item toc-level-{item.level}">
							<a
								href="#{item.id}"
								class="toc-link {activeId === item.id ? 'active' : ''}"
								on:click={(e) => scrollToSection(item.id, e)}
							>
								<span class="toc-text">{item.text}</span>
								{#if activeId === item.id}
									<div class="toc-active-indicator"></div>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</aside>
	<!-- Mobile Toggle Button -->
	{#if showToggle && !isOpen}
		<button
			class="toc-mobile-toggle glass-button"
			on:click={toggleToc}
			aria-label="Toggle Table of Contents"
			aria-expanded={isOpen}
		>
			<List size={18} />
			<span class="toc-toggle-text">Contents</span>
		</button>
	{/if}
{/if}

<style>
	.toc-sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 320px;
		height: 100vh;
		z-index: 50;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateX(-100%);
	}

	.toc-sidebar.open {
		transform: translateX(0);
	}
	.toc-content {
		height: 100%;
		background: var(--glass-bg);
		border-right: 1px solid var(--glass-border);
		backdrop-filter: var(--glass-backdrop);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 0; /* Remove rounded corners for sidebar */
	}
	.toc-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) var(--space-2) var(--space-1);
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.toc-title {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
	}
	.toc-close {
		padding: 0;
		background: transparent;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
		line-height: 1;
	}

	.toc-close :global(svg) {
		display: block;
		margin: auto;
	}
	.toc-close:hover {
		background: var(--glass-overlay-hover-bg);
		color: var(--color-text-primary);
	}

	/* Hide close button on desktop */
	.mobile-only {
		display: none;
	}

	.toc-nav {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.toc-list {
		list-style: none;
		margin: 0;
		padding: var(--space-3) 0;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.toc-list::-webkit-scrollbar {
		width: 6px;
	}

	.toc-list::-webkit-scrollbar-track {
		background: transparent;
	}

	.toc-list::-webkit-scrollbar-thumb {
		background: var(--color-border);
		border-radius: var(--radius-full);
	}

	.toc-list::-webkit-scrollbar-thumb:hover {
		background: var(--color-text-tertiary);
	}

	.toc-item {
		margin: 0;
		position: relative;
	}
	/* Indentation for different heading levels */
	.toc-level-2 {
		--indent: var(--space-2);
	}
	.toc-level-3 {
		--indent: var(--space-4);
	}
	.toc-level-4 {
		--indent: var(--space-6);
	}
	.toc-level-5 {
		--indent: var(--space-8);
	}
	.toc-level-6 {
		--indent: var(--space-10);
	}
	.toc-link {
		display: flex;
		align-items: center;
		padding: var(--space-2) var(--space-4);
		padding-left: calc(var(--space-4) + var(--indent, 0px));
		color: var(--color-text-secondary);
		text-decoration: none;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
		position: relative;
		transition: all 0.15s ease;
		border-radius: var(--radius-md);
		margin: var(--space-1) var(--space-3);
	}

	.toc-link:hover {
		color: var(--color-text-primary);
		background: var(--glass-overlay-bg);
	}
	.toc-link.active {
		color: var(--primary-600);
		background: var(--primary-50);
		font-weight: var(--font-weight-medium);
		border-left: 3px solid var(--primary-600);
		padding-left: calc(var(--space-4) + var(--indent, 0px) - 3px);
	}

	.toc-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.toc-active-indicator {
		width: 8px;
		height: 8px;
		background: var(--primary-600);
		border-radius: var(--radius-full);
		margin-left: var(--space-2);
		flex-shrink: 0;
	}

	/* Mobile Toggle Button */
	.toc-mobile-toggle {
		display: none;
		position: fixed;
		top: var(--space-4);
		left: var(--space-4);
		z-index: 60;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		color: var(--color-text-primary);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		backdrop-filter: var(--glass-backdrop);
		box-shadow: 0 4px 16px var(--glass-shadow);
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.toc-mobile-toggle:hover {
		background: var(--glass-overlay-hover-bg);
		transform: translateY(-1px);
		box-shadow: 0 6px 20px var(--glass-shadow);
	}
	/* Desktop Styles */
	@media (min-width: 1024px) {
		.toc-sidebar {
			transform: translateX(0);
		}
	} /* Tablet Styles */
	@media (max-width: 1023px) and (min-width: 769px) {
		.toc-mobile-toggle {
			display: flex;
		}

		.toc-sidebar {
			box-shadow:
				0 0 0 1px var(--glass-border),
				0 20px 60px rgba(0, 0, 0, 0.2);
		}

		.toc-content {
			border: 1px solid var(--glass-border);
			border-radius: var(--radius-xl);
		}

		.mobile-only {
			display: block;
		}
	} /* Mobile Styles */
	@media (max-width: 768px) {
		.toc-mobile-toggle {
			display: flex;
		}
		.toc-sidebar {
			width: 100%;
			max-width: 360px;
			box-shadow:
				0 0 0 1px var(--glass-border),
				0 20px 60px rgba(0, 0, 0, 0.2);
		}

		.toc-content {
			border: 1px solid var(--glass-border);
			border-radius: var(--radius-xl);
		}

		.toc-toggle-text {
			display: none;
		}

		.mobile-only {
			display: block;
		}
	}

	/* Very Small Screens */
	@media (max-width: 480px) {
		.toc-sidebar {
			width: 100%;
		}
	}

	/* Dark mode adjustments */
	:global([data-theme='dark']) .toc-content {
		background: var(--glass-bg);
		border-color: var(--glass-border);
	}

	:global([data-theme='dark']) .toc-link.active {
		color: var(--primary-400);
		background: rgba(56, 189, 248, 0.1);
		border-left-color: var(--primary-400);
	}

	:global([data-theme='dark']) .toc-active-indicator {
		background: var(--primary-400);
	}

	/* Reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.toc-sidebar,
		.toc-content-wrapper,
		.toc-mobile-toggle,
		.toc-link {
			transition: none;
		}
	}
	/* Print Styles */
	@media print {
		.toc-sidebar,
		.toc-mobile-toggle {
			display: none;
		}
	}
</style>
