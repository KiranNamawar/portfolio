<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import BaseContentLayout from './BaseContentLayout.svelte';

	// All frontmatter values are available as props
	export let title: string;
	export let description: string;
	export let date: string;
	export let tags: string[] | undefined = undefined;
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
