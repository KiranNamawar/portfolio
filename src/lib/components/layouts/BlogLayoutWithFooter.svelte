<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import BaseContentLayout from './BaseContentLayout.svelte';
	import ContentFooter from '../ui/ContentFooter.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// All frontmatter values are available as props
	export let title: string;
	export let description: string;
	export let date: string;
	export let tags: string[] | undefined = undefined;

	// Extract slug from page store
	let slug = '';
	let relatedPosts: any[] = [];

	$: if ($page.data) {
		slug = $page.params.slug || '';
		relatedPosts = $page.data.relatedPosts || [];
	}

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

	<!-- Blog Footer -->
	<ContentFooter
		slot="footer"
		contentType="blog"
		{date}
		{tags}
		currentSlug={slug}
		relatedContent={relatedPosts}
	/>
</BaseContentLayout>

<style>
	.blog-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-6);
		justify-content: center;
	}
	.tag {
		display: inline-flex;
		align-items: center;
		padding: var(--space-1) var(--space-3);
		background: rgba(var(--primary-500-rgb, 99, 102, 241), 0.1);
		color: var(--color-text-secondary);
		border-left: 3px solid var(--primary-500);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
		font-size: var(--font-size-sm);
		font-weight: 500;
		text-decoration: none;
		position: relative;
	}

	.tag::before {
		content: '#';
		margin-right: var(--space-1);
		color: var(--primary-500);
		font-weight: 600;
		opacity: 0.8;
	}

	/* ===== TOAST NOTIFICATION ===== */
	:global(.heading-link-toast) {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: var(--color-surface-primary);
		color: var(--color-text-primary);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		font-size: var(--font-size-sm);
		z-index: 1000;
		animation: toast-slide-in 0.3s ease-out;
	}

	@keyframes toast-slide-in {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
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
