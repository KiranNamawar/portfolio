<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/date.js';
	import { ExternalLink, Github } from '@lucide/svelte';
	let { data }: { data: PageData } = $props();
</script>

<div class="container">
	<header class="text-center space-y-4">
		<h1 class="text-5xl font-bold">Projects</h1>
		<p class="text-xl text-secondary">My latest work and creations</p>
	</header>

	{#if data.projects.length > 0}
		<div class="projects-grid">
			{#each data.projects as project}
				<article class="project-card glass hover-lift transition">
					<div class="project-image">
						<img
							src={project.image || '/project-placeholder.svg'}
							alt={project.title}
							loading="lazy"
							onerror={(e) => {
								const target = e.target as HTMLImageElement;
								if (target && target.src !== window.location.origin + '/project-placeholder.svg') {
									target.src = '/project-placeholder.svg';
								}
							}}
						/>
						{#if project.featured}
							<div class="featured-badge-overlay">Featured</div>
						{/if}
						<div class="project-overlay">
							<div class="project-actions">
								{#if project.demo}
									<a
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										class="project-action-btn"
									>
										<ExternalLink size={20} />
										<span>Demo</span>
									</a>
								{/if}
								{#if project.github}
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										class="project-action-btn"
									>
										<Github size={20} />
										<span>Code</span>
									</a>
								{/if}
							</div>
						</div>
					</div>

					<div class="project-content">
						<h3 class="text-2xl">
							<a href="/projects/{project.slug}" class="text-primary hover:text-primary-700">
								{project.title}
							</a>
						</h3>
						<div class="project-meta">
							<time>{formatDate(project.date)}</time>
							{#if project.readingTime}
								<span class="reading-time">
									{project.readingTime} min read
								</span>
							{/if}
						</div>

						{#if project.description}
							<p class="description text-secondary">{project.description}</p>
						{/if}

						{#if project.technologies && project.technologies.length > 0}
							<div class="project-technologies">
								{#each project.technologies as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>
						{/if}

						<div class="project-links">
							<a href="/projects/{project.slug}" class="read-more-btn"> Read More → </a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="text-center space-y-4">
			<p class="text-lg text-secondary">No projects found.</p>
		</div>
	{/if}
</div>

<style>
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.project-card {
		border-radius: 1rem;
		overflow: hidden;
		transition: all 0.3s ease;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
	}
	.project-image {
		position: relative;
		aspect-ratio: 16/9;
		overflow: hidden;
	}
	.featured-badge-overlay {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		z-index: 2;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		padding: 0.375rem 0.875rem;
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		border: 1px solid var(--primary-600);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.project-card:hover .project-image img {
		transform: scale(1.05);
	}

	.project-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover .project-overlay {
		opacity: 1;
	}

	.project-actions {
		display: flex;
		gap: 1rem;
	}

	.project-action-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		border-radius: 0.5rem;
		color: var(--text-primary);
		text-decoration: none;
		transition: all 0.3s ease;
		font-weight: 500;
	}

	.project-action-btn:hover {
		background: var(--primary);
		color: white;
		transform: translateY(-2px);
	}

	.project-content {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.project-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}
	.reading-time {
		color: var(--text-secondary);
	}

	.description {
		line-height: 1.6;
	}

	.project-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-tag {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.85rem;
		color: var(--text-primary);
		font-weight: 500;
	}

	.project-links {
		margin-top: auto;
	}

	.read-more-btn {
		color: var(--primary);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s ease;
	}

	.read-more-btn:hover {
		color: var(--primary-700);
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.project-actions {
			flex-direction: column;
		}

		.project-action-btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
