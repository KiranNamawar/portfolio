<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { List, X, ChevronRight, ChevronDown } from '@lucide/svelte';

	// Type definitions based on the robust plan
	interface TocHeading {
		id: string;
		text: string;
		level: number;
		element: HTMLElement;
		depth: number;
	}

	interface TocNode {
		heading: TocHeading;
		children: TocNode[];
		parent: TocNode | null;
		isExpanded: boolean;
		isActive: boolean;
		hasActiveDescendant: boolean;
		manuallyToggled: boolean;
	}

	// Props
	export let isOpen = false;
	export let showToggle = true;
	export let minHeadings = 3;
	// State
	let tocTree: TocNode[] = [];
	let activeId = '';
	let observer: IntersectionObserver;
	let isVisible = false;
	let manualOverrides = new Map<string, boolean>();
	let userHasScrolled = false;
	let lastScrollTime = 0;
	let hashScrollTime = 0;
	// Utility functions
	function extractHeadings(): TocHeading[] {
		const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
		return Array.from(headings)
			.filter((el) => {
				// Filter out empty headings
				if (!el.textContent?.trim()) return false;

				// Filter out headings that are inside the TOC component itself
				const tocContainer = el.closest('.toc-sidebar, .toc-content');
				if (tocContainer) return false;

				return true;
			})
			.map((el, index) => {
				// Generate ID if missing
				if (!el.id) {
					const text = el.textContent?.trim() || '';
					const id = text
						.toLowerCase()
						.replace(/[^\w\s-]/g, '')
						.replace(/\s+/g, '-')
						.replace(/-+/g, '-')
						.trim();
					el.id = id || `heading-${index}`;
				}

				return {
					id: el.id,
					text: el.textContent?.trim() || '',
					level: parseInt(el.tagName.charAt(1)),
					element: el as HTMLElement,
					depth: 0
				};
			});
	}

	function buildTree(headings: TocHeading[]): TocNode[] {
		const root: TocNode[] = [];
		const stack: TocNode[] = [];

		headings.forEach((heading) => {
			const node: TocNode = {
				heading: { ...heading, depth: 0 },
				children: [],
				parent: null,
				isExpanded: false,
				isActive: false,
				hasActiveDescendant: false,
				manuallyToggled: false
			};

			// Find correct parent level
			while (stack.length > 0 && stack[stack.length - 1].heading.level >= heading.level) {
				stack.pop();
			}

			if (stack.length === 0) {
				// Top-level heading
				node.heading.depth = 0;
				root.push(node);
			} else {
				// Child heading
				const parent = stack[stack.length - 1];
				node.parent = parent;
				node.heading.depth = parent.heading.depth + 1;
				parent.children.push(node);
			}

			stack.push(node);
		});

		return root;
	}

	function findNode(tree: TocNode[], id: string): TocNode | null {
		for (const node of tree) {
			if (node.heading.id === id) return node;
			const found = findNode(node.children, id);
			if (found) return found;
		}
		return null;
	}

	function walkTree(tree: TocNode[], callback: (node: TocNode) => void): void {
		tree.forEach((node) => {
			callback(node);
			walkTree(node.children, callback);
		});
	}

	function updateActiveStates(tree: TocNode[], activeId: string): void {
		// Reset all states
		walkTree(tree, (node) => {
			node.isActive = false;
			node.hasActiveDescendant = false;
		});

		// Set active states
		const activeNode = findNode(tree, activeId);
		if (activeNode) {
			activeNode.isActive = true;

			// Mark ancestors as having active descendants
			let parent = activeNode.parent;
			while (parent) {
				parent.hasActiveDescendant = true;
				parent = parent.parent;
			}
		}
	}

	function updateExpansion(tree: TocNode[], activeId: string): void {
		const activeNode = findNode(tree, activeId);
		if (!activeNode) return;

		// Collapse non-essential sections
		walkTree(tree, (node) => {
			if (!node.manuallyToggled && !node.hasActiveDescendant && !node.isActive) {
				node.isExpanded = false;
			}
		});

		// Expand path to active heading
		let current = activeNode.parent;
		while (current) {
			const manualState = manualOverrides.get(current.heading.id);
			if (manualState === undefined || manualState === true) {
				current.isExpanded = true;
			}
			current = current.parent;
		}

		// Expand active section if it has children
		if (activeNode.children.length > 0) {
			const manualState = manualOverrides.get(activeNode.heading.id);
			if (manualState === undefined || manualState === true) {
				activeNode.isExpanded = true;
			}
		}
	}

	function setupObserver(): void {
		if (observer) observer.disconnect();

		const headings = tocTree
			.flatMap((node) => [node, ...getAllDescendants(node)])
			.map((node) => node.heading.element);

		observer = new IntersectionObserver(
			(entries) => {
				const visibleEntries = entries.filter((entry) => entry.isIntersecting);

				if (visibleEntries.length > 0) {
					// Find the topmost visible heading
					let topEntry = visibleEntries[0];
					for (const entry of visibleEntries) {
						if (entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
							topEntry = entry;
						}
					}

					const targetId = topEntry.target.id;

					if (targetId && targetId !== activeId) {
						activeId = targetId;
						updateActiveStates(tocTree, activeId);
						updateExpansion(tocTree, activeId);
						tocTree = [...tocTree]; // Trigger reactivity
					}
				}
			},
			{
				rootMargin: '-20% 0px -70% 0px',
				threshold: [0, 0.1, 0.5]
			}
		);

		headings.forEach((heading) => {
			if (heading.id) {
				observer.observe(heading);
			}
		});
	}
	function getAllDescendants(node: TocNode): TocNode[] {
		const descendants: TocNode[] = [];
		node.children.forEach((child) => {
			descendants.push(child);
			descendants.push(...getAllDescendants(child));
		});
		return descendants;
	}
	// Enhanced scroll-to-hash function that waits for content
	function scrollToHashWhenReady(id: string, maxAttempts = 20): void {
		let attempts = 0;

		const attemptScroll = () => {
			const element = document.getElementById(id);

			if (element && element.offsetHeight > 0) {
				// Element is rendered and has dimensions
				hashScrollTime = Date.now(); // Mark this as a programmatic scroll
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				return;
			}

			attempts++;
			if (attempts < maxAttempts) {
				// Try again in 100ms
				setTimeout(attemptScroll, 100);
			}
		};

		attemptScroll();
	}

	// Track user scroll behavior
	function handleScroll(): void {
		const now = Date.now();
		// Only consider it user scrolling if it's not immediately after a hash scroll
		if (now - hashScrollTime > 1000) {
			userHasScrolled = true;
			lastScrollTime = now;
		}
	}
	function handleNavigate(id: string): void {
		// Update active state immediately
		activeId = id;
		updateActiveStates(tocTree, activeId);
		updateExpansion(tocTree, activeId);
		tocTree = [...tocTree];

		// Use history.replaceState for smooth back button behavior
		const currentUrl = new URL(window.location.href);
		currentUrl.hash = id;
		history.replaceState(null, '', currentUrl.toString());

		// Reset user scroll tracking since this is intentional navigation
		userHasScrolled = false;

		// Use robust scroll function
		scrollToHashWhenReady(id);

		// Close TOC on mobile after clicking
		if (typeof window !== 'undefined' && window.innerWidth < 768) {
			isOpen = false;
		}
	}

	function handleToggle(node: TocNode): void {
		node.manuallyToggled = true;
		node.isExpanded = !node.isExpanded;
		manualOverrides.set(node.heading.id, node.isExpanded);
		tocTree = [...tocTree]; // Trigger reactivity
	}

	function toggleToc(): void {
		isOpen = !isOpen;
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}

	function setInitialState(): void {
		if (typeof window !== 'undefined') {
			isOpen = window.innerWidth >= 1024;
		}
	}

	function handleResize(): void {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) {
				isOpen = true;
			} else if (window.innerWidth < 768) {
				isOpen = false;
			}
		}
	} // Enhanced initialization with better content loading detection
	function initializeTOC(attempt = 0): void {
		const headings = extractHeadings();

		if (headings.length >= minHeadings) {
			tocTree = buildTree(headings);
			isVisible = true;

			// Handle initial hash navigation
			if (window.location.hash) {
				const hashId = window.location.hash.slice(1);

				// Set up TOC state
				activeId = hashId;
				updateActiveStates(tocTree, activeId);
				updateExpansion(tocTree, activeId);
				tocTree = [...tocTree];
				// Use robust scroll function that waits for content
				scrollToHashWhenReady(hashId);
			}

			// Setup observer after tree is built
			setTimeout(() => setupObserver(), 150);
		} else if (attempt < 10) {
			// Retry if content isn't loaded yet (max 10 attempts over 3 seconds)
			setTimeout(() => initializeTOC(attempt + 1), 300);
		}
	}

	// Lifecycle
	onMount(() => {
		setInitialState();

		// Use multiple strategies to ensure content is loaded
		// 1. Initial attempt after DOM
		setTimeout(() => initializeTOC(), 100);

		// 2. Listen for content changes (images, dynamic content)
		const observer = new MutationObserver(() => {
			if (!isVisible) {
				initializeTOC();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		// 3. Listen for load events
		const handleLoad = () => {
			if (!isVisible) {
				setTimeout(() => initializeTOC(), 100);
			}
		};

		window.addEventListener('load', handleLoad); // 4. Listen for hashchange events (browser navigation)
		const handleHashChange = () => {
			if (window.location.hash && tocTree.length > 0) {
				const hashId = window.location.hash.slice(1);
				userHasScrolled = false; // Reset scroll tracking for browser navigation
				handleNavigate(hashId);
			}
		};

		window.addEventListener('hashchange', handleHashChange);

		// 5. Handle page visibility changes (tab switching)
		const handleVisibilityChange = () => {
			if (!document.hidden && window.location.hash && tocTree.length > 0) {
				const hashId = window.location.hash.slice(1);
				const now = Date.now();

				// Only auto-scroll if:
				// 1. User hasn't manually scrolled, OR
				// 2. It's been less than 5 seconds since page load (initial navigation), OR
				// 3. User scrolled more than 30 seconds ago (probably forgot their position)
				const timeSinceScroll = now - lastScrollTime;
				const shouldAutoScroll =
					!userHasScrolled || timeSinceScroll > 30000 || lastScrollTime === 0;

				if (shouldAutoScroll) {
					setTimeout(() => scrollToHashWhenReady(hashId), 100);
				}
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		// 6. Track user scrolling behavior
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Event listeners
		if (typeof document !== 'undefined') {
			document.addEventListener('keydown', handleKeydown);
		}
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
		} // Cleanup
		return () => {
			observer.disconnect();
			window.removeEventListener('load', handleLoad);
			window.removeEventListener('hashchange', handleHashChange);
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
		if (typeof document !== 'undefined') {
			document.removeEventListener('keydown', handleKeydown);
		}
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

{#if isVisible}
	<aside class="toc-sidebar" class:open={isOpen}>
		<div class="toc-content glass-card">
			<header class="toc-header">
				<h3 class="toc-title">Table of Contents</h3>
				{#if showToggle}
					<button
						class="toc-close glass-control-btn"
						on:click={toggleToc}
						aria-label="Close Table of Contents"
					>
						<X size={20} />
					</button>
				{/if}
			</header>

			<nav class="toc-nav">
				<div class="toc-tree">
					{#each tocTree as node (node.heading.id)}
						{@render nodeTemplate(node)}
					{/each}
				</div>
			</nav>
		</div>
	</aside>

	<!-- Mobile Toggle Button -->
	{#if showToggle && !isOpen}
		<button
			class="toc-mobile-toggle glass-button"
			on:click={toggleToc}
			aria-label="Toggle Table of Contents"
		>
			<List size={18} />
			<span class="toc-toggle-text">Contents</span>
		</button>
	{/if}
{/if}

{#snippet nodeTemplate(node: TocNode)}
	<div class="toc-node" data-depth={node.heading.depth}>
		<div class="toc-node-content toc-item" data-depth={node.heading.depth}>
			{#if node.children.length > 0}
				<button
					class="toc-expand-btn"
					on:click={() => handleToggle(node)}
					aria-label="{node.isExpanded ? 'Collapse' : 'Expand'} {node.heading.text}"
					aria-expanded={node.isExpanded}
				>
					{#if node.isExpanded}
						<ChevronDown size={16} />
					{:else}
						<ChevronRight size={16} />
					{/if}
				</button>
			{:else}
				<div class="toc-expand-spacer"></div>
			{/if}

			<a
				href="#{node.heading.id}"
				class="toc-link"
				class:active={node.isActive}
				class:has-active-descendant={node.hasActiveDescendant}
				on:click|preventDefault={() => handleNavigate(node.heading.id)}
			>
				{node.heading.text}
			</a>
		</div>

		{#if node.children.length > 0}
			<div class="toc-children" class:expanded={node.isExpanded}>
				{#each node.children as child (child.heading.id)}
					{@render nodeTemplate(child)}
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

<style>
	/* Base TOC Sidebar */
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
		border-radius: 0;
		padding: 10px;
	}

	/* Header */
	.toc-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-4) var(--space-3);
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
		display: none;
		flex-shrink: 0;
		color: var(--color-text-primary);
	}

	.toc-close :global(svg) {
		flex-shrink: 0;
	}

	/* Navigation */
	.toc-nav {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.toc-tree {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding: var(--space-2) 0;
	}

	.toc-tree::-webkit-scrollbar {
		width: 6px;
	}

	.toc-tree::-webkit-scrollbar-track {
		background: transparent;
	}

	.toc-tree::-webkit-scrollbar-thumb {
		background: var(--color-border);
		border-radius: var(--radius-full);
	}

	.toc-tree::-webkit-scrollbar-thumb:hover {
		background: var(--color-text-tertiary);
	}

	/* Node Structure - Absolute Indentation System */
	.toc-node {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.toc-node-content {
		display: flex;
		align-items: center;
		min-height: 2.5rem;
		position: relative;
		margin: var(--space-1) 0;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Absolute Indentation - No Cumulative Padding */
	.toc-item[data-depth='0'] {
		--indent: var(--space-4);
	}
	.toc-item[data-depth='1'] {
		--indent: calc(var(--space-4) + var(--space-6));
	}
	.toc-item[data-depth='2'] {
		--indent: calc(var(--space-4) + var(--space-8));
	}
	.toc-item[data-depth='3'] {
		--indent: calc(var(--space-4) + var(--space-10));
	}
	.toc-item[data-depth='4'] {
		--indent: calc(var(--space-4) + var(--space-12));
	}

	.toc-node-content {
		padding-left: var(--indent, var(--space-4));
	}

	/* Expand Button */
	.toc-expand-btn {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-text-tertiary);
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		margin-right: var(--space-2);
	}

	.toc-expand-btn:hover {
		background: var(--glass-overlay-bg);
		color: var(--color-text-secondary);
	}

	.toc-expand-btn:focus {
		outline: 2px solid var(--primary-500);
		outline-offset: 1px;
	}

	.toc-expand-spacer {
		width: 20px;
		height: 20px;
		margin-right: var(--space-2);
		flex-shrink: 0;
	}

	/* TOC Links */
	.toc-link {
		flex: 1;
		display: block;
		padding: var(--space-2) var(--space-3);
		color: var(--color-text-secondary);
		text-decoration: none;
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
		border-radius: var(--radius-md);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		padding-left: calc(var(--space-3) - 3px);
	}

	.toc-link.has-active-descendant {
		color: var(--color-text-primary);
		font-weight: var(--font-weight-medium);
	}

	.toc-link:focus {
		outline: 2px solid var(--primary-500);
		outline-offset: 1px;
	}

	/* Children Container - Smooth Animations */
	.toc-children {
		overflow: hidden;
		transition:
			max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		max-height: 0;
		opacity: 0;
	}

	.toc-children.expanded {
		max-height: 1000px; /* Large enough for any content */
		opacity: 1;
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
	}

	/* Tablet Styles */
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

		.toc-close {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	/* Mobile Styles */
	@media (max-width: 768px) {
		.toc-mobile-toggle {
			display: flex;
			left: auto;
			right: var(--space-4);
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
		.toc-close {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.toc-toggle-text {
			display: none;
		}
	}

	/* Very Small Screens */
	@media (max-width: 480px) {
		.toc-sidebar {
			width: 100%;
		}
	}

	/* Dark Mode */
	:global([data-theme='dark']) .toc-content {
		background: var(--glass-bg);
		border-color: var(--glass-border);
	}

	:global([data-theme='dark']) .toc-link.active {
		color: var(--primary-400);
		background: rgba(56, 189, 248, 0.1);
		border-left-color: var(--primary-400);
	}

	:global([data-theme='dark']) .toc-expand-btn:hover {
		background: var(--glass-overlay-hover-bg);
	}

	/* Reduced Motion */
	@media (prefers-reduced-motion: reduce) {
		.toc-sidebar,
		.toc-content,
		.toc-mobile-toggle,
		.toc-link,
		.toc-expand-btn,
		.toc-children,
		.toc-node,
		.toc-node-content {
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
