<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/project.js';
	import { ExternalLink, Github, ArrowLeft } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.project.title} | Projects</title>
	<meta name="description" content={data.project.description} />
</svelte:head>

<article class="project-detail">
	<header class="project-header">
		{#if data.project.image}
			<div class="project-hero-image">
				<img src={data.project.image} alt={data.project.title} />
				<div class="project-hero-overlay">
					<div class="project-hero-actions">
						{#if data.project.demo}
							<a href={data.project.demo} target="_blank" rel="noopener noreferrer" class="hero-action-btn">
								<ExternalLink size={24} />
								<span>Live Demo</span>
							</a>
						{/if}
						{#if data.project.github}
							<a href={data.project.github} target="_blank" rel="noopener noreferrer" class="hero-action-btn">
								<Github size={24} />
								<span>Source Code</span>
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<div class="project-header-content">
			<h1 class="project-title">{data.project.title}</h1>
			
			<div class="project-meta">
				<time class="project-date">{formatDate(data.project.date)}</time>
				{#if data.project.featured}
					<span class="featured-badge">Featured Project</span>
				{/if}
			</div>
			
			{#if data.project.description}
				<p class="project-description">{data.project.description}</p>
			{/if}
			
			{#if data.project.technologies && data.project.technologies.length > 0}
				<div class="project-technologies">
					{#each data.project.technologies as tech}
						<span class="tech-badge">{tech}</span>
					{/each}
				</div>
			{/if}

			<div class="project-actions">
				{#if data.project.demo}
					<a href={data.project.demo} target="_blank" rel="noopener noreferrer" class="project-action-btn primary">
						<ExternalLink size={20} />
						<span>Live Demo</span>
					</a>
				{/if}
				{#if data.project.github}
					<a href={data.project.github} target="_blank" rel="noopener noreferrer" class="project-action-btn secondary">
						<Github size={20} />
						<span>Source Code</span>
					</a>
				{/if}
			</div>
		</div>
	</header>

	<main class="project-content">
		{#if data.ContentComponent}
			<data.ContentComponent />
		{:else}
			<p>Content not available.</p>
		{/if}
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
		aspect-ratio: 16/9;
		border-radius: 1rem;
		overflow: hidden;
		margin-bottom: 2rem;
	}

	.project-hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.project-hero-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-hero-image:hover .project-hero-overlay {
		opacity: 1;
	}

	.project-hero-actions {
		display: flex;
		gap: 1rem;
	}

	.hero-action-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 2rem;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		border-radius: 0.75rem;
		color: var(--text-primary);
		text-decoration: none;
		transition: all 0.3s ease;
		font-weight: 600;
		font-size: 1.1rem;
	}

	.hero-action-btn:hover {
		background: var(--primary);
		color: white;
		transform: translateY(-3px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.project-header-content {
		text-align: center;
		space-y: 1.5rem;
	}

	.project-title {
		font-size: 3.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, var(--primary), var(--primary-700));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 1.2;
	}

	.project-meta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
		color: var(--text-secondary);
	}

	.featured-badge {
		background: var(--primary);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 1.5rem;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.project-description {
		font-size: 1.25rem;
		line-height: 1.6;
		color: var(--text-secondary);
		max-width: 800px;
		margin: 0 auto 2rem;
	}

	.project-technologies {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.tech-badge {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		padding: 0.5rem 1rem;
		border-radius: 1.5rem;
		font-size: 0.9rem;
		color: var(--text-primary);
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
		gap: 0.75rem;
		padding: 1rem 2rem;
		border-radius: 0.75rem;
		text-decoration: none;
		transition: all 0.3s ease;
		font-weight: 600;
		font-size: 1.1rem;
		min-width: 150px;
		justify-content: center;
	}

	.project-action-btn.primary {
		background: var(--primary);
		color: white;
	}

	.project-action-btn.primary:hover {
		background: var(--primary-700);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.4);
	}

	.project-action-btn.secondary {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		color: var(--text-primary);
	}

	.project-action-btn.secondary:hover {
		background: var(--text-primary);
		color: var(--bg-primary);
		transform: translateY(-2px);
	}

	.project-content {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		border-radius: 1rem;
		padding: 3rem;
		margin-bottom: 3rem;
		line-height: 1.8;
	}

	.project-nav {
		text-align: center;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--primary);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
		transition: all 0.3s ease;
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
	}

	.back-link:hover {
		background: var(--primary);
		color: white;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.project-detail {
			padding: 1rem;
		}

		.project-title {
			font-size: 2.5rem;
		}

		.project-meta {
			flex-direction: column;
			gap: 1rem;
		}

		.project-actions {
			flex-direction: column;
			align-items: center;
		}

		.project-action-btn {
			width: 100%;
			max-width: 300px;
		}

		.hero-action-btn {
			width: 100%;
			max-width: 200px;
		}

		.project-hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.project-content {
			padding: 2rem;
		}
	}
</style>
