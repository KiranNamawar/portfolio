<script lang="ts">	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/date.js';

	let { data }: { data: PageData } = $props();
</script>

<article class="blog-post">
	<header class="blog-post-header">
		<h1 class="blog-post-title">{data.post.title}</h1>
		<div class="blog-post-meta">
			<time class="blog-post-date">{formatDate(data.post.date)}</time>
			{#if data.post.author}
				<span class="blog-post-author">by {data.post.author}</span>
			{/if}
		</div>
		{#if data.post.description}
			<p class="blog-post-description">{data.post.description}</p>
		{/if}
		{#if data.post.tags && data.post.tags.length > 0}
			<div class="blog-post-tags">
				{#each data.post.tags as tag}
					<span class="blog-tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</header>

	<main class="blog-post-content">
		{#if data.ContentComponent}
			<data.ContentComponent />
		{:else}
			<p>Content not available.</p>
		{/if}
	</main>

	<nav class="blog-post-nav">
		<a href="/blog" class="blog-back-link">← Back to Blog</a>
	</nav>
</article>


