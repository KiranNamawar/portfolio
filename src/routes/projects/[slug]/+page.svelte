<script lang="ts">
	import type { PageData } from './$types';
	import SEOHead from '$lib/components/ui/SEOHead.svelte';
	import ContentFooter from '$lib/components/ui/ContentFooter.svelte';

	let { data }: { data: PageData } = $props();
</script>

{#if data.project}
	<SEOHead
		data={{
			title: data.project.title,
			description: data.project.description || data.project.title,
			keywords: [...(data.project.tech || []), 'project', 'web development', 'portfolio'],
			url: `/projects/${data.project.slug}`,
			type: 'article',
			publishedTime: new Date(data.project.date).toISOString(),
			image: data.project.image || '/project-placeholder.svg',
			tags: data.project.tech || []
		}}
		breadcrumbs={[
			{ name: 'Home', url: '/' },
			{ name: 'Projects', url: '/projects' },
			{ name: data.project.title, url: `/projects/${data.project.slug}` }
		]}
	/>
{/if}

<!-- The ProjectLayout component is automatically applied by mdsvex -->
{#if data.ContentComponent}
	<data.ContentComponent />

	<!-- Project Footer - Added after the mdsvex content -->
	{#if data.project}
		<ContentFooter
			contentType="project"
			currentSlug={data.project.slug}
			relatedContent={data.relatedProjects}
		/>
	{/if}
{:else}
	<div class="error-message">
		<h1>Content not available</h1>
		<p>Sorry, the project content could not be loaded.</p>
		<a href="/projects" class="back-link">← Back to Projects</a>
	</div>
{/if}

<style>
	.error-message {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--space-8);
		text-align: center;
	}

	.error-message h1 {
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
	}

	.error-message p {
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		text-decoration: none;
		color: var(--color-text-primary);
		transition: all var(--transition-fast);
		font-weight: var(--font-weight-medium);
	}
	.back-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--glass-shadow);
	}
</style>
