<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/date.js';
	import SEOHead from '$lib/components/ui/SEOHead.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEOHead
	data={{
		title: 'Blog',
		description:
			'Thoughts, tutorials, and insights on web development, technology, and software engineering.',
		keywords: ['blog', 'web development', 'tutorials', 'programming', 'technology'],
		url: '/blog',
		type: 'website'
	}}
	breadcrumbs={[
		{ name: 'Home', url: '/' },
		{ name: 'Blog', url: '/blog' }
	]}
/>

<main id="main-content" class="blog-page">
	<div class="container">
		<div class="page-header">
			<h1 class="page-title">Blog</h1>
			<p class="page-description">Thoughts, tutorials, and insights on web development</p>
		</div>

		{#if data.posts && data.posts.length > 0}
			<div class="posts-grid">
				{#each data.posts as post}
					<article class="post-card">
						<div class="post-image">
							<img
								src={post.image || '/blog-placeholder.svg'}
								alt={post.title}
								loading="lazy"
								onerror={(e) => {
									const target = e.target as HTMLImageElement;
									if (target?.src !== '/blog-placeholder.svg') {
										target.src = '/blog-placeholder.svg';
									}
								}}
							/>
							{#if post.featured}
								<div class="featured-badge">Featured</div>
							{/if}
							{#if post.badge}
								<div class="content-badge">
									<Badge variant={post.badge} size="sm" text={post.badge} />
								</div>
							{/if}
						</div>

						<div class="post-content">
							<h2 class="post-title">
								<a href="/blog/{post.slug}" class="post-link">{post.title}</a>
							</h2>

							<div class="post-meta">
								<time class="post-date">{formatDate(post.date)}</time>
								{#if post.readingTime}
									<span class="reading-time">{post.readingTime} min read</span>
								{/if}
							</div>

							{#if post.description}
								<p class="post-description">{post.description}</p>
							{/if}

							{#if post.tags && post.tags.length > 0}
								<div class="post-tags">
									{#each post.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							{/if}

							<div class="post-actions">
								<a href="/blog/{post.slug}" class="read-more-btn">Read More →</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<p>No blog posts found.</p>
			</div>
		{/if}
	</div>
</main>

<style>
	.blog-page {
		min-height: 100vh;
		padding: var(--space-8) 0;
		background: var(--color-background);
	}

	.page-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.page-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: var(--font-weight-bold);
		background: linear-gradient(135deg, var(--primary-600), var(--primary-400));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-4);
		line-height: 1.2;
	}

	.page-description {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto;
		line-height: var(--line-height-relaxed);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--space-8);
	}

	.post-card {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-2xl);
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 6px -1px var(--glass-shadow);
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.post-card:hover {
		transform: translateY(-12px) scale(1.02);
		box-shadow: 0 25px 50px -12px var(--glass-shadow);
		border-color: var(--primary-300);
	}

	.post-image {
		position: relative;
		width: 100%;
		height: 220px;
		overflow: hidden;
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}

	.post-card:hover .post-image img {
		transform: scale(1.1);
	}
	.featured-badge {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		z-index: 1;
	}

	.content-badge {
		position: absolute;
		top: var(--space-4);
		left: var(--space-4);
		z-index: 1;
	}

	.post-content {
		padding: var(--space-6);
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.post-title {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		margin: 0;
	}

	.post-link {
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.post-link:hover {
		color: var(--primary-600);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--color-text-tertiary);
	}

	.post-date {
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
	}

	.reading-time {
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
	}

	.post-description {
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin: 0;
		flex: 1;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}
	.tag {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		color: var(--color-text-primary);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		transition: all 0.3s ease;
	}

	.tag:hover {
		background: var(--primary-100);
		border-color: var(--primary-300);
		transform: translateY(-2px);
	}

	:global([data-theme='dark']) .tag:hover {
		background: var(--primary-900);
		border-color: var(--primary-700);
	}

	.post-actions {
		margin-top: auto;
		padding-top: var(--space-2);
	}

	.read-more-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--primary-600);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-sm);
		transition: all 0.3s ease;
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-lg);
		background: var(--primary-50);
		border: 1px solid var(--primary-200);
	}

	.read-more-btn:hover {
		background: var(--primary-600);
		color: white;
		transform: translateX(4px);
		box-shadow: 0 4px 12px var(--primary-200);
	}

	:global([data-theme='dark']) .read-more-btn {
		background: var(--primary-900);
		border-color: var(--primary-800);
		color: var(--primary-100);
	}

	:global([data-theme='dark']) .read-more-btn:hover {
		background: var(--primary-600);
		color: white;
		box-shadow: 0 4px 12px var(--primary-900);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16);
		color: var(--color-text-secondary);
		font-size: var(--font-size-lg);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.blog-page {
			padding: var(--space-6) 0;
		}

		.posts-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.page-title {
			font-size: var(--font-size-4xl);
		}

		.page-description {
			font-size: var(--font-size-lg);
		}

		.post-content {
			padding: var(--space-4);
		}

		.post-image {
			height: 180px;
		}

		.post-card:hover {
			transform: translateY(-6px) scale(1.01);
		}
	}

	@media (max-width: 480px) {
		.posts-grid {
			grid-template-columns: 1fr;
			gap: var(--space-4);
		}

		.page-title {
			font-size: var(--font-size-3xl);
		}
	}
</style>
