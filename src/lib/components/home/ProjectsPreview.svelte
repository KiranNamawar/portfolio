<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, ExternalLink, Github, Folder } from '$lib/utils/icons.js';
	import { getFeaturedProjects } from '$lib/utils/project.js';
	import type { Project } from '$lib/types/project.js';

	let projectsRef: HTMLElement;
	let isVisible = false;
	let featuredProjects: Project[] = [];
	onMount(() => {
		// Load featured projects
		getFeaturedProjects().then((projects) => {
			featuredProjects = projects.slice(0, 3); // Show only top 3
		});

		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (projectsRef) {
			observer.observe(projectsRef);
		}

		return () => observer.disconnect();
	});
</script>

<section bind:this={projectsRef} class="projects-section" class:visible={isVisible} id="projects">
	<div class="container">
		<header class="section-header">
			<div class="header-icon">
				<Folder size={32} />
			</div>
			<h2 class="section-title">Featured Projects</h2>
			<p class="section-subtitle">A selection of recent work showcasing my skills and creativity</p>
		</header>
		<div class="projects-grid">
			{#each featuredProjects as project, index}
				<article
					class="project-card glass-card"
					class:reverse={index % 2 === 1}
					style="animation-delay: {index * 0.2}s"
				>
					<div class="project-image">
						<img
							src={project.image || '/project-placeholder.svg'}
							alt={project.title}
							loading="lazy"
						/>
						<div class="project-overlay">
							<div class="project-actions">
								{#if project.demo}
									<a
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										class="action-btn glass-control-btn"
										aria-label="View live demo"
									>
										<ExternalLink size={18} />
									</a>
								{/if}
								{#if project.github}
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										class="action-btn glass-control-btn"
										aria-label="View source code"
									>
										<Github size={18} />
									</a>
								{/if}
							</div>
						</div>
					</div>

					<div class="project-content">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>

						<div class="project-footer">
							<div class="tech-tags">
								{#if project.technologies && project.technologies.length > 0}
									{#each project.technologies.slice(0, 4) as tech}
										<span class="tech-tag">{tech}</span>
									{/each}
									{#if project.technologies.length > 4}
										<span class="tech-more">+{project.technologies.length - 4}</span>
									{/if}
								{/if}
							</div>
							<a href="/projects/{project.slug}" class="project-link">
								<span>View Project</span>
								<ArrowRight size={16} />
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="section-footer">
			<a href="/projects" class="view-all-btn glass-button">
				<Folder size={20} />
				<span>View All Projects</span>
				<ArrowRight size={18} />
			</a>
		</div>
	</div>
</section>

<style>
	.projects-section {
		padding: var(--space-20) 0;
		position: relative;
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

	.projects-section.visible .section-header {
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
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
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
	.projects-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		margin-bottom: var(--space-16);
	}
	.project-card {
		border-radius: var(--radius-xl);
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(50px);
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 360px; /* Reduced from 420px */
	}

	/* Tablet and Desktop: Horizontal layout */
	@media (min-width: 768px) {
		.project-card {
			flex-direction: row;
			min-height: 280px;
			align-items: stretch;
		}

		.project-card.reverse {
			flex-direction: row-reverse;
		}
	}

	.projects-section.visible .project-card {
		opacity: 1;
		transform: translateY(0);
	}

	.project-card:hover {
		transform: translateY(-8px);
	}
	.project-image {
		position: relative;
		aspect-ratio: 16 / 8; /* More compact than 16/9 */
		overflow: hidden;
		background: var(--color-surface-secondary);
	}

	/* Horizontal layout for tablet/desktop */
	@media (min-width: 768px) {
		.project-image {
			flex: 0 0 50%; /* Take up half the width */
			aspect-ratio: unset; /* Remove aspect ratio constraint */
			min-height: 280px;
		}
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.project-card:hover .project-image img {
		transform: scale(1.05);
	}

	.project-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgba(0, 0, 0, 0.1) 50%,
			rgba(0, 0, 0, 0.3) 100%
		);
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
		gap: var(--space-3);
	}
	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius-full);
		color: var(--color-text-primary);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		text-decoration: none;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.2);
	} /* Dark mode styling */
	:global([data-theme='dark']) .action-btn {
		color: var(--color-text-primary);
		background: rgba(0, 0, 0, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	/* Button hover states - both direct hover and when card is hovered */
	.action-btn:hover,
	.project-card:hover .action-btn {
		transform: scale(1.1);
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		color: #1f2937; /* Dark color for light background */
	}

	/* Dark mode hover - both direct hover and when card is hovered */
	:global([data-theme='dark']) .action-btn:hover,
	:global([data-theme='dark']) .project-card:hover .action-btn {
		background: rgba(0, 0, 0, 0.9);
		color: #f9fafb; /* Light color for dark background */
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
	}

	.project-content {
		padding: var(--space-4); /* Reduced from space-5 */
		display: flex;
		flex-direction: column;
		flex: 1; /* Take remaining space */
		min-height: 180px; /* Reduced from 220px */
	}

	/* Horizontal layout for tablet/desktop */
	@media (min-width: 768px) {
		.project-content {
			flex: 1; /* Take remaining 50% */
			padding: var(--space-6);
			justify-content: center;
			min-height: unset;
		}
	}
	.project-title {
		font-size: var(--font-size-xl); /* Increased from lg */
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2); /* Reduced from space-3 */
		line-height: 1.3;
	}

	/* Larger title on horizontal layout */
	@media (min-width: 768px) {
		.project-title {
			font-size: var(--font-size-2xl); /* Increased from xl */
			margin-bottom: var(--space-3);
		}
	}
	.project-description {
		font-size: var(--font-size-sm); /* Increased from xs */
		color: var(--color-text-secondary);
		line-height: 1.5; /* Increased from 1.4 */
		margin-bottom: var(--space-2); /* Reduced from space-3 */
		display: -webkit-box;
		-webkit-line-clamp: 2; /* Keep at 2 lines */
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Better description on horizontal layout */
	@media (min-width: 768px) {
		.project-description {
			font-size: var(--font-size-base); /* Increased from sm */
			line-height: 1.6;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			margin-bottom: var(--space-4);
		}
	}
	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		margin-bottom: var(--space-2); /* Reduced from space-3 */
	}

	.tech-tag {
		padding: 0.25rem 0.5rem; /* Smaller padding */
		background: rgba(var(--primary-500-rgb), 0.1);
		color: var(--primary-600);
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs); /* Reduced from sm */
		font-weight: 500;
		border: 1px solid rgba(var(--primary-500-rgb), 0.2);
	}

	.tech-more {
		padding: var(--space-1) var(--space-3);
		background: var(--color-surface-secondary);
		color: var(--color-text-secondary);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		font-weight: 500;
	}
	.project-footer {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-top: auto;
		padding-top: var(--space-2);
	}

	/* Horizontal layout on larger screens */
	@media (min-width: 768px) {
		.project-footer {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: var(--space-4);
			padding-top: var(--space-4);
		}
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-1); /* Reduced gap */
		background: var(--primary-500);
		color: white;
		text-decoration: none;
		font-weight: 600;
		font-size: var(--font-size-xs); /* Reduced from sm */
		padding: var(--space-2) var(--space-3); /* Smaller padding */
		border-radius: var(--radius-md); /* Smaller radius */
		transition: all 0.3s ease;
		border: 1px solid var(--primary-500);
		min-width: 100px; /* Reduced from 120px */
	}
	.project-link:hover {
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

	.projects-section.visible .section-footer {
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
		.projects-section {
			padding: var(--space-16) 0;
		}

		.container {
			padding: 0 var(--space-4);
		}
		.projects-grid {
			grid-template-columns: 1fr;
			gap: var(--space-4); /* Reduced gap on mobile */
		}

		.project-content {
			padding: var(--space-4); /* Consistent with reduced padding */
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

		.project-card {
			border-radius: var(--radius-xl);
		}

		.view-all-btn {
			padding: var(--space-3) var(--space-6);
			font-size: var(--font-size-base);
		}

		.tech-tags {
			gap: var(--space-1);
		}

		.tech-tag {
			font-size: var(--font-size-xs);
			padding: 0.25rem 0.5rem;
		}
	}
</style>
