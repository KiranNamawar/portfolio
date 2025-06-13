<script lang="ts">
	import { Search, X, FileText, FolderOpen, Hash, Calendar, Clock } from '$lib/utils/icons.js';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { getBlogPosts } from '$lib/utils/blog.js';
	import { getProjects } from '$lib/utils/project.js';
	import { searchContent } from '$lib/utils/search';
	import { goto } from '$app/navigation';
	import type { BlogPost } from '$lib/types/blog.js';
	import type { Project } from '$lib/types/project.js';

	export let isOpen = false;
	export let onclose: (() => void) | undefined = undefined;

	let searchQuery = '';
	let searchInput: HTMLInputElement;
	let blogPosts: BlogPost[] = [];
	let projects: Project[] = [];
	let searchResults: SearchResult[] = [];
	let selectedIndex = 0;
	let dataLoaded = false;

	// Search result interface for better type safety
	interface SearchResult {
		type: 'blog' | 'project';
		item: BlogPost | Project;
		score: number;
	}

	// Lazy load data only when dialog is first opened
	$: if (isOpen && !dataLoaded) {
		loadData();
	}

	async function loadData() {
		if (dataLoaded) return;

		try {
			[blogPosts, projects] = await Promise.all([getBlogPosts(), getProjects()]);
			dataLoaded = true;
		} catch (error) {
			console.error('Error loading search data:', error);
		}
	}

	// Reactive search using the enhanced search utility
	$: {
		searchResults = searchContent(searchQuery, blogPosts, projects);
		selectedIndex = 0; // Reset selection when results change
	}
	// Handle keyboard navigation
	function handleKeyDown(event: KeyboardEvent) {
		if (!isOpen) return;
		switch (event.key) {
			case 'Escape':
				closeDialog();
				break;
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
				scrollToSelectedItem();
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				scrollToSelectedItem();
				break;
			case 'Enter':
				event.preventDefault();
				if (searchResults[selectedIndex]) {
					navigateToResult(searchResults[selectedIndex].item);
				}
				break;
		}
	}

	// Scroll the selected item into view
	function scrollToSelectedItem() {
		// Use a small delay to ensure the DOM has updated
		setTimeout(() => {
			const selectedElement = document.querySelector('.result-item.selected');
			if (selectedElement) {
				selectedElement.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'nearest'
				});
			}
		}, 0);
	}

	// Navigate to selected result
	function navigateToResult(item: BlogPost | Project) {
		const type = 'tags' in item ? 'blog' : 'project';
		const path = `/${type === 'blog' ? 'blog' : 'projects'}/${item.slug}`;
		goto(path);
		closeDialog();
	}
	// Close dialog
	function closeDialog() {
		isOpen = false;
		searchQuery = '';
		selectedIndex = 0;
		onclose?.();
	}
	// Handle backdrop click
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeDialog();
		}
	}

	// Handle backdrop keyboard events for accessibility
	function handleBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDialog();
		}
	}

	// Focus input when dialog opens
	$: if (isOpen && searchInput) {
		setTimeout(() => searchInput.focus(), 100);
	}
	// Get result type info
	function getResultTypeInfo(item: BlogPost | Project) {
		if ('tags' in item) {
			return {
				type: 'Blog Post',
				icon: FileText,
				href: `/blog/${item.slug}`,
				badge: item.tags?.slice(0, 2) || []
			};
		} else {
			return {
				type: 'Project',
				icon: FolderOpen,
				href: `/projects/${item.slug}`,
				badge: (item as Project).technologies?.slice(0, 2) || []
			};
		}
	}

	// Format date for display
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if isOpen}
	<!-- Backdrop -->
	<div
		class="search-backdrop"
		transition:fade={{ duration: 200 }}
		on:click={handleBackdropClick}
		on:keydown={handleBackdropKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="search-title"
		tabindex="-1"
	>
		<!-- Search Dialog -->
		<div class="search-dialog" transition:fly={{ y: -50, duration: 300 }}>
			<!-- Search Header -->
			<div class="search-header">
				<div class="search-input-container">
					<Search size={20} class="search-icon" />
					<input
						bind:this={searchInput}
						bind:value={searchQuery}
						type="text"
						placeholder="Search projects and blog posts..."
						class="search-input"
						id="search-input"
						autocomplete="off"
						spellcheck="false"
					/>
					<button class="close-button" on:click={closeDialog} aria-label="Close search">
						<X size={18} />
					</button>
				</div>
			</div>

			<!-- Search Results -->
			<div class="search-results">
				{#if searchQuery.trim() === ''}
					<div class="search-empty-state">
						<Search size={48} class="empty-icon" />
						<h3 id="search-title">Search Everything</h3>
						<p>Start typing to search through projects and blog posts</p>
						<div class="search-tips">
							<span class="tip">
								<kbd>↑</kbd><kbd>↓</kbd> Navigate
							</span>
							<span class="tip">
								<kbd>↵</kbd> Select
							</span>
							<span class="tip">
								<kbd>Esc</kbd> Close
							</span>
						</div>
					</div>
				{:else if searchResults.length === 0}
					<div class="search-no-results">
						<FileText size={48} class="empty-icon" />
						<h3>No results found</h3>
						<p>Try a different search term or browse our content directly</p>
					</div>
				{:else}
					<div class="results-list" role="listbox" aria-label="Search results">
						{#each searchResults as result, index}
							{@const item = result.item}
							{@const typeInfo = getResultTypeInfo(item)}
							<button
								class="result-item"
								class:selected={index === selectedIndex}
								on:click={() => navigateToResult(item)}
								role="option"
								aria-selected={index === selectedIndex}
							>
								<div class="result-icon">
									<svelte:component this={typeInfo.icon} size={20} />
								</div>

								<div class="result-content">
									<div class="result-header">
										<h4 class="result-title">{item.title}</h4>
										<span class="result-type">{typeInfo.type}</span>
									</div>

									<p class="result-description">{item.description}</p>

									<div class="result-meta">
										<div class="result-meta-item">
											<Calendar size={14} />
											<span>{formatDate(item.date)}</span>
										</div>

										{#if item.readingTime}
											<div class="result-meta-item">
												<Clock size={14} />
												<span>{item.readingTime} min read</span>
											</div>
										{/if}

										{#if typeInfo.badge.length > 0}
											<div class="result-badges">
												{#each typeInfo.badge as badge}
													<span class="result-badge">
														<Hash size={12} />
														{badge}
													</span>
												{/each}
											</div>
										{/if}
									</div>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<!-- Search Footer -->
			{#if searchQuery.trim() !== '' && searchResults.length > 0}
				<div class="search-footer">
					<span class="results-count">
						{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
					</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.search-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--glass-backdrop-overlay, rgba(0, 0, 0, 0.5));
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: var(--z-modal);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: var(--space-8) var(--space-4);
		overflow-y: auto;
	}

	.search-dialog {
		width: 100%;
		max-width: 600px;
		max-height: 80vh;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow:
			0 20px 60px var(--glass-shadow),
			0 1px 0 rgba(255, 255, 255, 0.1) inset;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.search-header {
		padding: var(--space-4);
		border-bottom: 1px solid var(--glass-border);
	}

	.search-input-container {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: var(--font-size-md);
		color: var(--color-text-primary);
		padding: var(--space-2) 0;
	}
	.search-input::placeholder {
		color: var(--color-text-tertiary);
	}

	:global(.search-icon) {
		color: var(--color-text-secondary);
		flex-shrink: 0;
	}

	.close-button {
		background: transparent;
		border: none;
		color: var(--color-text-secondary);
		cursor: pointer;
		padding: var(--space-1);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
	}

	.close-button:hover {
		color: var(--color-text-primary);
		background: var(--color-surface-hover);
	}

	.search-results {
		flex: 1;
		overflow-y: auto;
		min-height: 200px;
		max-height: 400px;
	}

	.search-empty-state,
	.search-no-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-8) var(--space-4);
		text-align: center;
		min-height: 200px;
	}
	:global(.empty-icon) {
		color: var(--color-text-tertiary);
		margin-bottom: var(--space-4);
	}

	.search-empty-state h3,
	.search-no-results h3 {
		margin: 0 0 var(--space-2) 0;
		color: var(--color-text-primary);
		font-size: var(--font-size-lg);
		font-weight: 600;
	}

	.search-empty-state p,
	.search-no-results p {
		margin: 0 0 var(--space-4) 0;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}

	.search-tips {
		display: flex;
		gap: var(--space-4);
		margin-top: var(--space-2);
	}

	.tip {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: var(--font-size-xs);
		color: var(--color-text-tertiary);
	}

	kbd {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: 2px 6px;
		font-size: var(--font-size-xs);
		font-family: var(--font-family-mono);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.results-list {
		padding: var(--space-2);
	}

	.result-item {
		width: 100%;
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-3);
		border: none;
		background: transparent;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.result-item:hover,
	.result-item.selected {
		background: var(--color-surface-hover);
	}
	.result-item.selected {
		background: var(--primary-500);
		color: white;
	}
	.result-item.selected .result-title,
	.result-item.selected .result-description,
	.result-item.selected .result-type,
	.result-item.selected .result-meta,
	.result-item.selected .result-meta-item,
	.result-item.selected .result-meta-item span {
		color: inherit;
	}

	.result-icon {
		color: var(--color-text-secondary);
		margin-top: 2px;
		flex-shrink: 0;
	}
	.result-item.selected .result-icon {
		color: rgba(255, 255, 255, 0.9);
	}

	.result-content {
		flex: 1;
		min-width: 0;
	}

	.result-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-1);
	}

	.result-title {
		margin: 0;
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-text-primary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.result-type {
		font-size: var(--font-size-xs);
		color: var(--color-text-tertiary);
		background: var(--color-surface);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		flex-shrink: 0;
		margin-left: var(--space-2);
	}
	.result-item.selected .result-type {
		background: rgba(255, 255, 255, 0.2);
		color: white;
	}
	.result-description {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.result-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.result-meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: var(--font-size-xs);
		color: var(--color-text-tertiary);
	}

	.result-badges {
		display: flex;
		gap: var(--space-1);
	}

	.result-badge {
		display: flex;
		align-items: center;
		gap: 2px;
		font-size: var(--font-size-xs);
		color: var(--color-text-tertiary);
		background: var(--color-surface);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}
	.result-item.selected .result-badge {
		background: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.search-footer {
		padding: var(--space-2) var(--space-4);
		border-top: 1px solid var(--glass-border);
		background: var(--color-surface-subtle);
	}

	.results-count {
		font-size: var(--font-size-xs);
		color: var(--color-text-tertiary);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.search-backdrop {
			padding: var(--space-4) var(--space-2);
		}

		.search-dialog {
			max-height: 90vh;
		}

		.search-tips {
			flex-direction: column;
			gap: var(--space-1);
		}

		.result-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-1);
		}

		.result-type {
			margin-left: 0;
		}

		.result-meta {
			gap: var(--space-2);
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.search-dialog,
		.search-backdrop {
			transition: none;
		}

		.result-item {
			transition: none;
		}
	}
</style>
