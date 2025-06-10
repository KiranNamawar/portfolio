<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../blog/Callout.svelte';
	export { Callout };
</script>

<script lang="ts">
	import { formatDate } from '$lib/utils/date.js';
	import { ExternalLink, Github, ArrowLeft } from '@lucide/svelte';
	import ReadingProgress from '$lib/components/ui/ReadingProgress.svelte';
	import CodeBlockEnhancer from '$lib/components/ui/CodeBlockEnhancer.svelte';

	// All frontmatter values are available as props
	export let title: string;
	export let description: string;
	export let date: string;
	export let image: string | undefined = undefined;
	export let technologies: string[] | undefined = undefined;
	export let github: string | undefined = undefined;
	export let demo: string | undefined = undefined;
	export let featured: boolean | undefined = undefined;
	export let readingTime: number | undefined = undefined;
	export let wordCount: number | undefined = undefined;
</script>

<svelte:head>
	<title>{title} | Projects</title>
	<meta name="description" content={description} />
</svelte:head>

<!-- Reading Progress Indicator -->
<ReadingProgress />

<!-- Code Block Enhancer -->
<CodeBlockEnhancer />

<article class="project-detail">
	<header class="project-header">
		{#if image}
			<div class="project-hero-image">
				<img src={image} alt={title} />
				<div class="project-hero-overlay">
					<div class="project-hero-actions">
						{#if demo}
							<a href={demo} target="_blank" rel="noopener noreferrer" class="hero-action-btn">
								<ExternalLink size={24} />
								<span>Live Demo</span>
							</a>
						{/if}
						{#if github}
							<a href={github} target="_blank" rel="noopener noreferrer" class="hero-action-btn">
								<Github size={24} />
								<span>Source Code</span>
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<div class="project-header-content">
			<h1 class="project-title">{title}</h1>
			<div class="project-meta">
				<time class="project-date">{formatDate(date)}</time>
				{#if featured}
					<span class="featured-badge">Featured Project</span>
				{/if}
				{#if readingTime}
					<span class="reading-time">
						{readingTime} min read
						{#if wordCount}
							<span class="word-count">({wordCount} words)</span>
						{/if}
					</span>
				{/if}
			</div>

			{#if description}
				<p class="project-description">{description}</p>
			{/if}

			{#if technologies && technologies.length > 0}
				<div class="project-technologies">
					{#each technologies as tech}
						<span class="tech-badge">{tech}</span>
					{/each}
				</div>
			{/if}

			<div class="project-actions">
				{#if demo}
					<a
						href={demo}
						target="_blank"
						rel="noopener noreferrer"
						class="project-action-btn primary"
					>
						<ExternalLink size={20} />
						<span>Live Demo</span>
					</a>
				{/if}
				{#if github}
					<a
						href={github}
						target="_blank"
						rel="noopener noreferrer"
						class="project-action-btn secondary"
					>
						<Github size={20} />
						<span>Source Code</span>
					</a>
				{/if}
			</div>
		</div>
	</header>

	<main class="project-content">
		<!-- The mdsvex content will be slotted here -->
		<slot />
	</main>

	<nav class="project-nav">
		<a href="/projects" class="back-link">
			<ArrowLeft size={20} />
			<span>Back to Projects</span>
		</a>
	</nav>
</article>

<style>
	.project-detail {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.project-header {
		margin-bottom: 3rem;
	}

	.project-hero-image {
		position: relative;
		width: 100%;
		height: 400px;
		margin-bottom: 2rem;
		border-radius: var(--radius-2xl);
		overflow: hidden;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
	}

	.project-hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-slow);
	}

	.project-hero-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		opacity: 0;
		transition: opacity var(--transition-normal);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.project-hero-image:hover .project-hero-overlay {
		opacity: 1;
	}

	.project-hero-image:hover img {
		transform: scale(1.05);
	}

	.project-hero-actions {
		display: flex;
		gap: 1rem;
	}

	.hero-action-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		color: white;
		text-decoration: none;
		font-weight: 600;
		transition: all var(--transition-fast);
	}

	.hero-action-btn:hover {
		background: var(--primary-500);
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(var(--primary-500), 0.4);
	}

	.project-header-content {
		text-align: center;
	}

	.project-title {
		font-family: var(--font-serif);
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: 1rem;
		line-height: 1.1;
	}

	.project-meta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.project-date {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}
	.featured-badge {
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		border: 1px solid var(--primary-600);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.reading-time {
		color: var(--color-text-tertiary);
		font-size: var(--font-size-xs);
	}

	.project-description {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		margin-bottom: 2rem;
		line-height: var(--line-height-relaxed);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.project-technologies {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.tech-badge {
		padding: 0.5rem 1rem;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--primary-600);
		font-weight: 600;
	}

	.project-actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.project-action-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-full);
		text-decoration: none;
		font-weight: 600;
		transition: all var(--transition-fast);
		border: 1px solid;
	}

	.project-action-btn.primary {
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		border-color: var(--primary-500);
	}

	.project-action-btn.primary:hover {
		background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(var(--primary-500), 0.4);
	}

	.project-action-btn.secondary {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		color: var(--color-text-primary);
		border-color: var(--glass-border);
	}

	.project-action-btn.secondary:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(var(--primary-500), 0.3);
	}

	.project-content {
		line-height: var(--line-height-relaxed);
		margin-bottom: 3rem;
	}

	.project-nav {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border-primary);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		text-decoration: none;
		color: var(--color-text-primary);
		transition: all var(--transition-fast);
		font-weight: 600;
	}

	.back-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--glass-shadow);
		text-decoration: none;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.project-detail {
			padding: 1rem;
		}

		.project-hero-image {
			height: 250px;
		}

		.project-title {
			font-size: 2rem;
		}

		.project-meta {
			flex-direction: column;
			gap: 0.5rem;
		}

		.project-actions {
			flex-direction: column;
			align-items: center;
		}

		.project-action-btn {
			width: 100%;
			max-width: 250px;
			justify-content: center;
		}

		.hero-action-btn {
			padding: 0.75rem 1rem;
			font-size: var(--font-size-sm);
		}
	}

	@media (max-width: 480px) {
		.project-detail {
			padding: 0.5rem;
		}

		.project-hero-actions {
			flex-direction: column;
			gap: 0.5rem;
		}

		.tech-badge {
			font-size: var(--font-size-xs);
			padding: 0.25rem 0.75rem;
		}
	}
</style>
