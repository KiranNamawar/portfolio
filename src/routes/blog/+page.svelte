<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/date.js';
	import SEOHead from '$lib/components/ui/SEOHead.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEOHead
	data={{
		title: 'Blog',
		description:
			'Thoughts, tutorials, and insights on web development, technology, and software engineering. Stay updated with the latest trends and best practices.',
		keywords: [
			'blog',
			'web development',
			'tutorials',
			'programming',
			'technology',
			'software engineering',
			'javascript',
			'typescript',
			'svelte',
			'react'
		],
		url: '/blog',
		type: 'website'
	}}
	breadcrumbs={[
		{ name: 'Home', url: '/' },
		{ name: 'Blog', url: '/blog' }
	]}
/>

<div class="container">
	<header class="text-center space-y-4">
		<h1 class="text-5xl font-bold">Blog</h1>
		<p class="text-xl text-secondary">Thoughts, tutorials, and insights</p>
	</header>
	{#if data.posts.length > 0}
		<div class="blog-grid">
			{#each data.posts as post}
				<article class="blog-card hover-lift transition">
					<div class="blog-image">
						<img
							src={post.image || '/blog-placeholder.svg'}
							alt={post.title}
							onerror={(e) => {
								const target = e.target as HTMLImageElement;
								if (target && target.src !== window.location.origin + '/blog-placeholder.svg') {
									target.src = '/blog-placeholder.svg';
								}
							}}
						/>
						{#if post.featured}
							<span class="featured-badge-overlay">Featured</span>
						{/if}
					</div>

					<div class="blog-content">
						<h3 class="text-2xl">
							<a href="/blog/{post.slug}" class="text-primary hover:text-primary-700">
								{post.title}
							</a>
						</h3>
						<div class="blog-meta">
							<time>{formatDate(post.date)}</time>
							{#if post.readingTime}
								<span class="reading-time">
									{post.readingTime} min read
								</span>
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
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="text-center space-y-4">
			<p class="text-lg text-secondary">No blog posts found.</p>
		</div>
	{/if}
</div>
