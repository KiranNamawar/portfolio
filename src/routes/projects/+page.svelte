<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/date.js';
	import { ExternalLink, Github } from '$lib/utils/icons.js';
	import SEOHead from '$lib/components/ui/SEOHead.svelte';

	let { data }: { data: PageData } = $props();
</script>

<SEOHead
	data={{
		title: 'Projects',
		description:
			'Explore my latest work and creations. A showcase of web applications, tools, and experiments.',
		keywords: ['projects', 'portfolio', 'web development', 'applications', 'software'],
		url: '/projects',
		type: 'website'
	}}
	breadcrumbs={[
		{ name: 'Home', url: '/' },
		{ name: 'Projects', url: '/projects' }
	]}
/>

<div class="projects-page">
	<div class="container">
		<div class="page-header">
			<h1 class="page-title">Projects</h1>
			<p class="page-description">My latest work and creations in web development</p>
		</div>

		{#if data.projects && data.projects.length > 0}
			<div class="projects-grid">
				{#each data.projects as project}
					<article class="project-card">
						<div class="project-image">
							<img
								src={project.image || '/project-placeholder.svg'}
								alt={project.title}
								loading="lazy"
								onerror={(e) => {
									const target = e.target as HTMLImageElement;
									if (target?.src !== '/project-placeholder.svg') {
										target.src = '/project-placeholder.svg';
									}
								}}
							/>
							{#if project.featured}
								<div class="featured-badge">Featured</div>
							{/if}

							<!-- Hover overlay with actions -->
							<div class="project-overlay">
								<div class="overlay-content">
									<div class="overlay-actions">
										{#if project.demo}
											<a
												href={project.demo}
												target="_blank"
												rel="noopener noreferrer"
												class="action-btn demo-btn"
												aria-label="View demo of {project.title}"
											>
												<ExternalLink size={18} />
												<span>Live Demo</span>
											</a>
										{/if}
										{#if project.github}
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												class="action-btn code-btn"
												aria-label="View source code of {project.title}"
											>
												<Github size={18} />
												<span>Source Code</span>
											</a>
										{/if}
									</div>
								</div>
							</div>
						</div>

						<div class="project-content">
							<h2 class="project-title">
								<a href="/projects/{project.slug}" class="project-link">{project.title}</a>
							</h2>

							<div class="project-meta">
								<time class="project-date">{formatDate(project.date)}</time>
								{#if project.readingTime}
									<span class="reading-time">{project.readingTime} min read</span>
								{/if}
							</div>

							{#if project.description}
								<p class="project-description">{project.description}</p>
							{/if}

							{#if project.technologies && project.technologies.length > 0}
								<div class="project-technologies">
									{#each project.technologies as tech}
										<span class="tech-tag">{tech}</span>
									{/each}
								</div>
							{/if}

							<div class="project-actions">
								<a href="/projects/{project.slug}" class="read-more-btn"> Learn More → </a>
								<div class="quick-actions">
									{#if project.demo}
										<a
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											class="quick-btn demo-quick"
											title="View Demo"
										>
											<ExternalLink size={16} />
										</a>
									{/if}
									{#if project.github}
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											class="quick-btn code-quick"
											title="View Code"
										>
											<Github size={16} />
										</a>
									{/if}
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<p>No projects found.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.projects-page {
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

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: var(--space-10);
	}

	.project-card {
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
		position: relative;
	}

	.project-card:hover {
		transform: translateY(-16px) scale(1.02);
		box-shadow: 0 30px 60px -12px var(--glass-shadow);
		border-color: var(--primary-300);
	}

	.project-image {
		position: relative;
		width: 100%;
		aspect-ratio: 16/9;
		overflow: hidden;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}

	.project-card:hover .project-image img {
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
		z-index: 2;
	}

	.project-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.4s ease;
		backdrop-filter: blur(8px);
	}

	.project-card:hover .project-overlay {
		opacity: 1;
	}

	.overlay-content {
		text-align: center;
		transform: translateY(20px);
		transition: transform 0.4s ease;
	}

	.project-card:hover .overlay-content {
		transform: translateY(0);
	}

	.overlay-actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
	}

	.action-btn {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-6);
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-text-primary);
		text-decoration: none;
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-sm);
		transition: all 0.3s ease;
		transform: translateY(10px);
		opacity: 0.9;
	}

	.project-card:hover .action-btn {
		transform: translateY(0);
		opacity: 1;
	}

	.demo-btn:hover {
		background: var(--primary-600);
		color: white;
		transform: translateY(-4px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	}

	.code-btn:hover {
		background: #24292f;
		color: white;
		transform: translateY(-4px);
		box-shadow: 0 8px 20px rgba(36, 41, 47, 0.4);
	}

	.project-content {
		padding: var(--space-6);
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.project-title {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-tight);
		margin: 0;
	}

	.project-link {
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.project-link:hover {
		color: var(--primary-600);
	}

	.project-meta {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--color-text-tertiary);
	}

	.project-date {
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
	}

	.reading-time {
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
	}

	.project-description {
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin: 0;
		flex: 1;
	}

	.project-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tech-tag {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		color: var(--color-text-primary);
		font-weight: var(--font-weight-semibold);
		transition: all 0.3s ease;
	}

	.tech-tag:hover {
		background: var(--primary-100);
		border-color: var(--primary-300);
		transform: translateY(-2px);
	}

	:global([data-theme='dark']) .tech-tag:hover {
		background: var(--primary-900);
		border-color: var(--primary-700);
	}

	.project-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: auto;
		padding-top: var(--space-4);
		border-top: 1px solid var(--glass-border);
	}

	.read-more-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--primary-600);
		text-decoration: none;
		font-weight: var(--font-weight-bold);
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

	.quick-actions {
		display: flex;
		gap: var(--space-2);
	}

	.quick-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--radius-lg);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.demo-quick:hover {
		background: var(--primary-600);
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--primary-200);
	}

	.code-quick:hover {
		background: #24292f;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(36, 41, 47, 0.3);
	}

	:global([data-theme='dark']) .code-btn:hover {
		background: #f0f6fc;
		color: #24292f;
		box-shadow: 0 8px 20px rgba(240, 246, 252, 0.2);
	}

	:global([data-theme='dark']) .code-quick:hover {
		background: #f0f6fc;
		color: #24292f;
		box-shadow: 0 4px 12px rgba(240, 246, 252, 0.2);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16);
		color: var(--color-text-secondary);
		font-size: var(--font-size-lg);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.projects-page {
			padding: var(--space-6) 0;
		}

		.projects-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.page-title {
			font-size: var(--font-size-4xl);
		}

		.page-description {
			font-size: var(--font-size-lg);
		}

		.project-content {
			padding: var(--space-4);
		}

		.overlay-actions {
			flex-direction: column;
			gap: var(--space-3);
		}

		.action-btn {
			width: 100%;
			justify-content: center;
		}

		.project-card:hover {
			transform: translateY(-8px) scale(1.01);
		}

		.project-actions {
			flex-direction: row;
			gap: var(--space-3);
			align-items: center;
		}

		.quick-actions {
			justify-content: flex-end;
		}
	}

	@media (max-width: 480px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: var(--space-4);
		}

		.page-title {
			font-size: var(--font-size-3xl);
		}
	}
</style>
