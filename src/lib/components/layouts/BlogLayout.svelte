<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import ReadingProgress from '$lib/components/ui/ReadingProgress.svelte';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';
	import { formatDate } from '$lib/utils/date.js';
	// All frontmatter values are available as props
	export let title: string;
	export let description: string;
	export let date: string;
	export let tags: string[] | undefined = undefined;
	export let featured: boolean | undefined = undefined;
</script>

<!-- Reading Progress -->
<ReadingProgress />

<!-- Table of Contents -->
<TableOfContents />

<div class="blog-layout">
	<article class="blog-post">
		<header class="blog-post-header">
			<h1 class="blog-post-title">{title}</h1>
			<div class="blog-post-meta">
				<time class="blog-post-date">{formatDate(date)}</time>
				{#if featured}
					<span class="featured-badge">Featured Post</span>
				{/if}
			</div>

			{#if description}
				<p class="blog-post-description">{description}</p>
			{/if}

			{#if tags && tags.length > 0}
				<div class="blog-post-tags">
					{#each tags as tag}
						<span class="blog-tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</header>

		<main class="blog-post-content">
			<!-- The mdsvex content will be slotted here -->
			<slot />
		</main>
		<nav class="blog-post-nav">
			<a href="/blog" class="blog-back-link">← Back to Blog</a>
		</nav>
	</article>
</div>

<style>
	.blog-layout {
		margin-left: 0;
		transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Desktop: Account for sidebar */
	@media (min-width: 1024px) {
		.blog-layout {
			margin-left: 320px;
		}
	}

	/* Tablet and Mobile: Full width */
	@media (max-width: 1023px) {
		.blog-layout {
			margin-left: 0;
		}
	}
</style>
