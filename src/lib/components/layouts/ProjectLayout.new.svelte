<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import { ExternalLink, Github } from '$lib/utils/icons.js';
	import BaseContentLayout from './BaseContentLayout.svelte';
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

<BaseContentLayout {title} {description} {date} pageType="Projects">
	<!-- Featured badge in header actions -->
	{#if featured}
		<span slot="header-actions" class="featured-badge">Featured</span>
	{/if}

	<!-- Tech stack metadata -->
	{#if technologies && technologies.length > 0}
		<div slot="metadata" class="tech-stack">
			{#each technologies as tech}
				{@const techIcon = getTechIcon(tech)}
				<span class="tech-tag">
					{#if techIcon.type === 'devicon'}
						<i class="devicon-{techIcon.icon}-{techIcon.variant || 'original'} colored tech-icon"
						></i>
					{:else if techIcon.type === 'lucide' && techIcon.component}
						<svelte:component this={techIcon.component} size={14} class="tech-icon" />
					{/if}
					{tech}
				</span>
			{/each}
		</div>
	{/if}

	<!-- Project actions -->
	<div slot="actions" class="project-actions">
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

	<!-- Project Gallery before main content -->
	{#if gallery && gallery.length > 0}
		<ProjectGallery slot="pre-content" {gallery} layout="auto" enableLightbox={true} />
	{/if}

	<!-- Main project content -->
	<slot />
</BaseContentLayout>

<style>
	/* ===== PROJECT-SPECIFIC STYLES ===== */
	.featured-badge {
		background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
		color: white;
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		box-shadow: 0 2px 8px rgba(var(--primary-500-rgb), 0.3);
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.tech-tag {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--color-surface-secondary);
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.tech-tag:hover {
		background: var(--color-surface-tertiary);
		color: var(--color-text-primary);
		border-color: var(--color-border-secondary);
		transform: translateY(-1px);
	}

	:global(.tech-tag .tech-icon) {
		flex-shrink: 0;
	}

	.project-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-top: var(--space-6);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		font-weight: 600;
		text-decoration: none;
		transition: all var(--transition-fast);
		border: 1px solid transparent;
		cursor: pointer;
	}

	.btn-primary {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
	}

	.btn-primary:hover {
		background: var(--primary-600);
		border-color: var(--primary-600);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(var(--primary-500-rgb), 0.4);
	}

	.btn-secondary {
		background: var(--color-surface-secondary);
		color: var(--color-text-primary);
		border-color: var(--color-border-primary);
	}

	.btn-secondary:hover {
		background: var(--color-surface-tertiary);
		border-color: var(--color-border-secondary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		.project-actions {
			flex-direction: column;
		}

		.btn {
			justify-content: center;
		}

		.tech-stack {
			gap: var(--space-1);
		}

		.tech-tag {
			font-size: var(--font-size-xs);
			padding: var(--space-1) var(--space-2);
		}
	}

	@media (max-width: 480px) {
		.tech-tag {
			padding: 0.25rem 0.5rem;
		}

		.btn {
			padding: var(--space-2) var(--space-3);
			font-size: var(--font-size-xs);
		}
	}
</style>
