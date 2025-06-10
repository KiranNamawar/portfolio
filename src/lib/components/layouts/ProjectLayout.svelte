<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import { formatDate } from '$lib/utils/date.js';
	import { ExternalLink, Github, ArrowLeft, Calendar } from '@lucide/svelte';
	import ReadingProgress from '$lib/components/ui/ReadingProgress.svelte';
	import CodeBlockEnhancer from '$lib/components/ui/CodeBlockEnhancer.svelte';
	import ProjectGallery from '$lib/components/ui/ProjectGallery.svelte';
	import { getTechIcon } from '$lib/utils/techIcons';

	// All frontmatter values are available as props
	export let title: string;
	export let description: string;
	export let date: string;
	export let technologies: string[] | undefined = undefined;
	export let github: string | undefined = undefined;
	export let demo: string | undefined = undefined;
	export let featured: boolean | undefined = undefined;
	export let gallery: Array<{ src: string; alt: string; caption?: string }> | undefined = undefined;
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
	<!-- Project Header -->
	<header class="project-header">
		<div class="container">
			<div class="project-meta-row">
				<a href="/projects" class="back-link">
					<ArrowLeft size={18} />
					Projects
				</a>

				<div class="project-badges">
					<time class="project-date">
						<Calendar size={16} />
						{formatDate(date)}
					</time>
					{#if featured}
						<span class="featured-badge">Featured</span>
					{/if}
				</div>
			</div>

			<h1 class="project-title">{title}</h1>

			{#if description}
				<p class="project-description">{description}</p>
			{/if}

			{#if technologies && technologies.length > 0}
				<div class="tech-stack">
					{#each technologies as tech}
						{@const techIcon = getTechIcon(tech)}
						<span class="tech-tag">
							{#if techIcon.type === 'devicon'}
								<i
									class="devicon-{techIcon.icon}-{techIcon.variant || 'original'} colored tech-icon"
								></i>
							{:else if techIcon.type === 'lucide' && techIcon.component}
								<svelte:component this={techIcon.component} size={14} class="tech-icon" />
							{/if}
							{tech}
						</span>
					{/each}
				</div>
			{/if}

			<div class="project-actions">
				{#if demo}
					<a href={demo} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
						<ExternalLink size={16} />
						Live Demo
					</a>
				{/if}
				{#if github}
					<a href={github} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
						<Github size={16} />
						Source Code
					</a>
				{/if}
			</div>
		</div>
	</header>

	<!-- Project Gallery -->
	{#if gallery && gallery.length > 0}
		<ProjectGallery {gallery} layout="auto" enableLightbox={true} />
	{/if}

	<!-- Main Content -->
	<main class="project-content">
		<div class="container">
			<div class="markdown-content">
				<slot />
			</div>
		</div>
	</main>
</article>

<style>
	/* ===== CORE LAYOUT ===== */
	.project-detail {
		min-height: 100vh;
		background: var(--color-bg-primary);
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	/* ===== PROJECT HEADER ===== */
	.project-header {
		padding: var(--space-8) 0 var(--space-6);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.project-meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-6);
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		text-decoration: none;
		color: var(--color-text-secondary);
		font-weight: 600;
		font-size: var(--font-size-sm);
		transition: all var(--transition-fast);
	}

	.back-link:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-1px);
	}

	.project-badges {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.project-date {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		font-weight: 500;
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
		box-shadow: 0 2px 8px var(--color-surface-hover);
	}

	.project-title {
		font-family: var(--font-serif);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		line-height: 1.2;
		text-align: center;
	}

	.project-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
		line-height: var(--line-height-relaxed);
		text-align: center;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
	}

	.tech-stack {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-6);
	}

	.tech-tag {
		padding: 0.375rem 0.75rem;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--primary-600);
		font-weight: 600;
		transition: all var(--transition-fast);
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
	}

	.tech-tag:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-1px);
	}

	.tech-icon {
		flex-shrink: 0;
		width: 14px;
		height: 14px;
		color: inherit;
	}

	.project-actions {
		display: flex;
		justify-content: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-full);
		text-decoration: none;
		font-weight: 600;
		font-size: var(--font-size-sm);
		transition: all var(--transition-fast);
		border: 1px solid;
		min-width: 140px;
		justify-content: center;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		border-color: var(--primary-500);
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
		transform: translateY(-2px);
		box-shadow: 0 8px 20px var(--color-surface-hover);
	}

	.btn-secondary {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		color: var(--color-text-primary);
		border-color: var(--glass-border);
	}

	.btn-secondary:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--color-surface-hover);
	}

	/* ===== MAIN CONTENT ===== */
	.project-content {
		padding: var(--space-8) 0;
	}

	.markdown-content {
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--color-text-primary);
		max-width: 800px;
		margin: 0 auto;
	}

	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		.container {
			padding: 0 var(--space-3);
		}

		.project-header {
			padding: var(--space-6) 0 var(--space-4);
		}

		.project-meta-row {
			flex-direction: column;
			align-items: stretch;
			gap: var(--space-3);
		}

		.project-badges {
			justify-content: center;
		}

		.project-actions {
			flex-direction: column;
			align-items: center;
		}

		.btn {
			width: 100%;
			max-width: 250px;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}

		.project-title {
			font-size: clamp(1.5rem, 6vw, 2.25rem);
		}

		.tech-stack {
			gap: var(--space-1);
		}

		.tech-tag {
			font-size: var(--font-size-xs);
			padding: 0.25rem 0.5rem;
			gap: 0.25rem;
		}

		.tech-icon {
			width: 12px;
			height: 12px;
		}
	}

	/* ===== REDUCED MOTION ===== */
	@media (prefers-reduced-motion: reduce) {
		.btn,
		.back-link,
		.tech-tag {
			transition: none;
		}
	}
</style>
