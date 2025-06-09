<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/blog.js';

	let { data }: { data: PageData } = $props();
</script>

<h1>Blog</h1>

{#if data.posts && data.posts.length > 0}
	<div class="posts">
		{#each data.posts as post}
			<article class="post-card">
				<h2>
					<a href="/blog/{post.slug}">{post.title}</a>
				</h2>
				<p class="description">{post.description}</p>
				<div class="meta">
					<time>{formatDate(post.date)}</time>
					{#if post.author}
						<span>by {post.author}</span>
					{/if}
				</div>
				{#if post.tags && post.tags.length > 0}
					<div class="tags">
						{#each post.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</article>
		{/each}
	</div>
{:else}
	<p>No blog posts found.</p>
{/if}

<style>
	h1 {
		margin-bottom: 2rem;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-card {
		padding: 1.5rem;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	.post-card h2 {
		margin: 0 0 0.5rem 0;
	}

	.post-card h2 a {
		text-decoration: none;
		color: inherit;
	}

	.post-card h2 a:hover {
		text-decoration: underline;
	}

	.description {
		color: #666;
		margin-bottom: 1rem;
	}

	.meta {
		font-size: 0.9rem;
		color: #888;
		margin-bottom: 0.5rem;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		background: #f0f0f0;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
	}
</style>
