<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import BaseContentLayout from './BaseContentLayout.svelte';
	import { onMount } from 'svelte';

	// All frontmatter values are available as props
	export let title: string;
	export let description: string;
	export let date: string;
	export let tags: string[] | undefined = undefined;

	// Handle heading link clicks for copy-to-clipboard
	onMount(() => {
		const handleHeadingLinkClick = (event: Event) => {
			event.preventDefault();
			const target = event.currentTarget as HTMLAnchorElement;
			const href = target.getAttribute('href');

			if (href) {
				const fullUrl = `${window.location.origin}${window.location.pathname}${href}`;

				// Copy to clipboard
				navigator.clipboard
					.writeText(fullUrl)
					.then(() => {
						// Show toast notification
						showCopyToast();
					})
					.catch(() => {
						// Fallback for older browsers
						const textArea = document.createElement('textarea');
						textArea.value = fullUrl;
						document.body.appendChild(textArea);
						textArea.select();
						document.execCommand('copy');
						document.body.removeChild(textArea);
						showCopyToast();
					});
			}
		};

		const showCopyToast = () => {
			// Remove any existing toast
			const existingToast = document.querySelector('.heading-link-toast');
			if (existingToast) {
				existingToast.remove();
			}

			// Create and show new toast
			const toast = document.createElement('div');
			toast.className = 'heading-link-toast';
			toast.textContent = 'Link copied to clipboard!';
			document.body.appendChild(toast);

			// Remove toast after animation
			setTimeout(() => {
				if (toast.parentNode) {
					toast.parentNode.removeChild(toast);
				}
			}, 2000);
		};

		// Add event listeners to all heading links
		const headingLinks = document.querySelectorAll('.heading-link');
		headingLinks.forEach((link) => {
			link.addEventListener('click', handleHeadingLinkClick);
		});

		// Cleanup
		return () => {
			headingLinks.forEach((link) => {
				link.removeEventListener('click', handleHeadingLinkClick);
			});
		};
	});
</script>

<BaseContentLayout {title} {description} {date} pageType="Blog">
	<div class="blog-tags" slot="metadata">
		{#if tags && tags.length > 0}
			{#each tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		{/if}
	</div>

	<!-- Main blog content -->
	<slot />
</BaseContentLayout>

<style>
	.blog-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-4);
		justify-content: center;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		padding: var(--space-1) var(--space-3);
		background: var(--color-surface-secondary);
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.tag:hover {
		background: var(--color-surface-tertiary);
		color: var(--color-text-primary);
		border-color: var(--color-border-secondary);
	}
	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 480px) {
		.blog-tags {
			gap: var(--space-1);
		}

		.tag {
			font-size: var(--font-size-xs);
			padding: var(--space-1) var(--space-2);
		}
	}
</style>
