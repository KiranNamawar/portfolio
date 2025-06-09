<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/blog.js';

	let { data }: { data: PageData } = $props();
</script>

<div class="container">
	<header class="text-center space-y-4">
		<h1 class="text-5xl font-bold">Blog</h1>
		<p class="text-xl text-secondary">Thoughts, tutorials, and insights</p>
	</header>

	{#if data.posts.length > 0}
		<div class="blog-grid">
			{#each data.posts as post}
				<article class="blog-card hover-lift transition">
					<h3 class="text-2xl">
						<a href="/blog/{post.slug}" class="text-primary hover:text-primary-700">
							{post.title}
						</a>
					</h3>
					
					<div class="blog-meta">
						<time>{formatDate(post.date)}</time>
						{#if post.author}
							<span>by {post.author}</span>
						{/if}
					</div>
					
					{#if post.description}
						<p class="description text-secondary">{post.description}</p>
					{/if}
					
					{#if post.tags && post.tags.length > 0}
						<div class="blog-tags">
							{#each post.tags as tag}
								<span class="blog-tag">{tag}</span>
							{/each}
						</div>
					{/if}
				</article>
			{/each}
		</div>
	{:else}
		<div class="text-center space-y-4">
			<p class="text-lg text-secondary">No blog posts found.</p>
		</div>
	{/if}
</div>


