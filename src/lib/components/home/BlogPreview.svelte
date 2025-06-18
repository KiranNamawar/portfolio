<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, BookOpen, Calendar, Clock } from '$lib/utils/icons.js';
	import { getFeaturedBlogPosts } from '$lib/utils/blog.js';
	import { formatDate } from '$lib/utils/date.js';
	import type { BlogPost } from '$lib/types/blog.js';
	import Badge from '$lib/components/ui/Badge.svelte';

	let blogRef: HTMLElement;
	let isVisible = false;
	let featuredPosts: BlogPost[] = [];

	onMount(() => {
		// Load featured blog posts
		getFeaturedBlogPosts().then((posts) => {
			featuredPosts = posts.slice(0, 3); // Show only top 3
		});

		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (blogRef) {
			observer.observe(blogRef);
		}

		return () => observer.disconnect();
	});
</script>

<section bind:this={blogRef} class="blog-section" class:visible={isVisible} id="blog">
	{#if featuredPosts.length > 0}
		<div class="container">
			<header class="section-header">
				<div class="header-icon">
					<BookOpen size={32} />
				</div>
				<h2 class="section-title">Latest Insights</h2>
				<p class="section-subtitle">
					Thoughts, tutorials, and insights from my development journey
				</p>
			</header>
			<div class="blog-grid">
				{#each featuredPosts as post, index}
					<article class="blog-card glass-card" style="animation-delay: {index * 0.2}s">
						<!-- Banner Image -->
						<div class="blog-image">
							<img src={post.image || '/blog-placeholder.svg'} alt={post.title} loading="lazy" />
							{#if post.badge}
								<div class="blog-badge">
									<Badge variant={post.badge} size="sm" text={post.badge} />
								</div>
							{/if}
							{#if post.category}
								<div class="blog-category-overlay">
									<span class="blog-category">{post.category}</span>
								</div>
							{/if}
						</div>

						<div class="blog-content">
							<h3 class="blog-title">
								<a href="/blog/{post.slug}">{post.title}</a>
							</h3>
							<p class="blog-description">{post.description}</p>

							<!-- Date and Reading Time moved below description -->
							<div class="blog-meta">
								<div class="meta-item">
									<Calendar size={14} />
									<span>{formatDate(post.date)}</span>
								</div>
								{#if post.readingTime}
									<div class="meta-item">
										<Clock size={14} />
										<span>{post.readingTime} min read</span>
									</div>
								{/if}
							</div>
							{#if post.tags && post.tags.length > 0}
								<div class="blog-tags">
									{#each post.tags.slice(0, 3) as tag}
										<span class="blog-tag">#{tag}</span>
									{/each}
									{#if post.tags.length > 3}
										<span class="tags-more">+{post.tags.length - 3}</span>
									{/if}
								</div>
							{/if}

							<div class="blog-footer">
								<a href="/blog/{post.slug}" class="read-more">
									<span>Read More</span>
									<ArrowRight size={16} />
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="section-footer">
				<a href="/blog" class="view-all-btn glass-button">
					<BookOpen size={20} />
					<span>View All Posts</span>
					<ArrowRight size={18} />
				</a>
			</div>
		</div>
	{/if}
</section>

<style>
	.blog-section {
		padding: var(--space-20) 0;
		position: relative;
		background: linear-gradient(
			135deg,
			transparent 0%,
			rgba(var(--primary-500-rgb, 99, 102, 241), 0.02) 50%,
			transparent 100%
		);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-16);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.blog-section.visible .section-header {
		opacity: 1;
		transform: translateY(0);
	}

	.header-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		margin: 0 auto var(--space-6);
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		border-radius: var(--radius-2xl);
		color: white;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-5px) rotate(2deg);
		}
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-4);
	}

	.section-subtitle {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		max-width: 60ch;
		margin: 0 auto;
		line-height: 1.6;
	}

	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--space-8);
		margin-bottom: var(--space-16);
	}
	.blog-card {
		border-radius: var(--radius-xl);
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(50px);
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.blog-section.visible .blog-card {
		opacity: 1;
		transform: translateY(0);
	}

	.blog-card:hover {
		transform: translateY(-8px);
	}

	.blog-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}
	.blog-card:hover::before {
		transform: scaleX(1);
	}
	.blog-image {
		position: relative;
		aspect-ratio: 16 / 8;
		overflow: hidden;
		background: var(--color-surface-secondary);
	}

	.blog-badge {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		z-index: 2;
	}

	.blog-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.blog-card:hover .blog-image img {
		transform: scale(1.05);
	}

	.blog-category-overlay {
		position: absolute;
		top: var(--space-3);
		left: var(--space-3);
	}

	.blog-category {
		padding: var(--space-1) var(--space-3);
		background: var(--primary-500);
		color: white;
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
	.blog-content {
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: var(--space-3);
	}

	.blog-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: auto;
		padding-top: var(--space-3);
	}

	.blog-title {
		margin: 0;
		line-height: 1.3;
	}

	.blog-title a {
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.blog-description {
		color: var(--color-text-secondary);
		line-height: 1.6;
		font-size: var(--font-size-sm);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.blog-meta {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
		padding: var(--space-2) 0;
		border-top: 1px solid var(--color-border-primary);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		font-weight: 500;
	}

	.blog-title a:hover {
		color: var(--primary-600);
	}
	.blog-description {
		font-size: var(--font-size-base);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.blog-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.blog-tag {
		padding: var(--space-1) var(--space-2);
		background: rgba(var(--primary-500-rgb, 99, 102, 241), 0.1);
		color: var(--primary-600);
		border-radius: var(--radius-md);
		font-size: var(--font-size-xs);
		font-weight: 500;
		border: 1px solid rgba(var(--primary-500-rgb, 99, 102, 241), 0.2);
	}

	.tags-more {
		padding: var(--space-1) var(--space-2);
		background: var(--color-surface-secondary);
		color: var(--color-text-secondary);
		border-radius: var(--radius-md);
		font-size: var(--font-size-xs);
		font-weight: 500;
	}
	.read-more {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-1);
		background: var(--primary-500);
		color: white;
		text-decoration: none;
		font-weight: 600;
		font-size: var(--font-size-xs);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		transition: all 0.3s ease;
		border: 1px solid var(--primary-500);
		min-width: 100px;
	}

	.read-more:hover {
		background: var(--primary-600);
		border-color: var(--primary-600);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(var(--primary-500-rgb), 0.3);
	}

	.section-footer {
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
	}

	.blog-section.visible .section-footer {
		opacity: 1;
		transform: translateY(0);
	}

	.view-all-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-8);
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--color-text-primary);
		text-decoration: none;
		border-radius: var(--radius-full);
		transition: all 0.3s ease;
		border: 1px solid var(--color-border-primary);
	}

	.view-all-btn:hover {
		transform: translateY(-2px);
		color: var(--primary-600);
		border-color: var(--primary-300);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.blog-section {
			padding: var(--space-16) 0;
		}

		.container {
			padding: 0 var(--space-4);
		}

		.blog-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.blog-card {
			padding: var(--space-4);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}

		.section-subtitle {
			font-size: var(--font-size-lg);
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}

		.blog-card {
			border-radius: var(--radius-xl);
			padding: var(--space-3);
		}

		.view-all-btn {
			padding: var(--space-3) var(--space-6);
			font-size: var(--font-size-base);
		}

		.blog-tags {
			gap: var(--space-1);
		}

		.blog-tag {
			font-size: 0.7rem;
			padding: 0.25rem 0.5rem;
		}

		.blog-meta {
			gap: var(--space-2);
		}

		.meta-item {
			font-size: 0.7rem;
		}
	}
</style>
