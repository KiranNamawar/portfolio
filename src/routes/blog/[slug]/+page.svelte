<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/blog.js';

	let { data }: { data: PageData } = $props();
</script>

<article>
	<header>
		<h1>{data.post.title}</h1>
		<div class="meta">
			<time>{formatDate(data.post.date)}</time>
			{#if data.post.author}
				<span>by {data.post.author}</span>
			{/if}
		</div>
		{#if data.post.description}
			<p class="description">{data.post.description}</p>
		{/if}
		{#if data.post.tags && data.post.tags.length > 0}
			<div class="tags">
				{#each data.post.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</header>	<main class="content">
		{#if data.ContentComponent}
			<data.ContentComponent />
		{:else}
			<p>Content not available.</p>
		{/if}
	</main>

	<nav>
		<a href="/blog">← Back to Blog</a>
	</nav>
</article>

<style>
	article {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	header {
		margin-bottom: 2rem;
		text-align: center;
	}

	h1 {
		margin-bottom: 1rem;
	}

	.meta {
		color: #666;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.description {
		font-size: 1.1rem;
		color: #555;
		margin-bottom: 1rem;
	}

	.tags {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.tag {
		background: #f0f0f0;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
	}

	.content {
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.content :global(h2) {
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.content :global(h3) {
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.content :global(p) {
		margin-bottom: 1rem;
	}

	.content :global(pre) {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.content :global(code) {
		background: #f5f5f5;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Courier New', monospace;
	}

	nav {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid #ddd;
	}

	nav a {
		text-decoration: none;
		color: #0066cc;
	}

	nav a:hover {
		text-decoration: underline;
	}
</style>
