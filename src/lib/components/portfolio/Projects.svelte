<script lang="ts">
	import { Github, ExternalLink, Star, GitFork } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let projectsRef: HTMLElement;
	let isVisible = false;

	onMount(() => {
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

	const projects = [
		{
			id: 1,
			title: 'Portfolio Website',
			description: 'A modern, responsive portfolio built with SvelteKit, featuring glassmorphism design, dark/light themes, and smooth animations.',
			image: '/project-1.jpg',
			tech: ['SvelteKit', 'TypeScript', 'CSS3', 'Vercel'],
			github: 'https://github.com/username/portfolio',
			demo: 'https://portfolio-demo.vercel.app',
			stars: 42,
			forks: 12,
			featured: true
		},
		{
			id: 2,
			title: 'Task Management App',
			description: 'Full-stack task management application with real-time collaboration, drag-and-drop functionality, and team workspaces.',
			image: '/project-2.jpg',
			tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
			github: 'https://github.com/username/task-app',
			demo: 'https://task-app-demo.vercel.app',
			stars: 128,
			forks: 34,
			featured: true
		},
		{
			id: 3,
			title: 'E-commerce Platform',
			description: 'Modern e-commerce solution with payment integration, inventory management, and admin dashboard.',
			image: '/project-3.jpg',
			tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
			github: 'https://github.com/username/ecommerce',
			demo: 'https://ecommerce-demo.vercel.app',
			stars: 89,
			forks: 23,
			featured: false
		},
		{
			id: 4,
			title: 'Weather Dashboard',
			description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
			image: '/project-4.jpg',
			tech: ['Vue.js', 'D3.js', 'OpenWeather API', 'Netlify'],
			github: 'https://github.com/username/weather-dashboard',
			demo: 'https://weather-dashboard-demo.netlify.app',
			stars: 67,
			forks: 18,
			featured: false
		}
	];
	$: featuredProjects = projects.filter(project => project.featured);
</script>

<section 
	bind:this={projectsRef}
	class="projects-section" 
	class:visible={isVisible}
	id="projects"
>
	<div class="container">
		<div class="content-wrapper">
			<!-- Section Header -->
			<header class="section-header">
				<h2 class="section-title">Featured Projects</h2>
				<p class="section-subtitle">
					A showcase of my recent work and creative explorations
				</p>
			</header>

			<!-- Featured Projects -->
			<div class="featured-projects">
				{#each featuredProjects as project, index}
					<article 
						class="project-card featured"
						class:reverse={index % 2 === 1}
						style="animation-delay: {index * 0.2}s"
					>
						<div class="project-image">
							<img src={project.image} alt={project.title} />
							<div class="project-overlay">
								<div class="project-links">
									<a 
										href={project.github} 
										target="_blank" 
										rel="noopener noreferrer"
										class="project-link"
										aria-label="View on GitHub"
									>
										<Github size={20} />
									</a>
									<a 
										href={project.demo} 
										target="_blank" 
										rel="noopener noreferrer"
										class="project-link"
										aria-label="View live demo"
									>
										<ExternalLink size={20} />
									</a>
								</div>
							</div>
						</div>

						<div class="project-content">
							<div class="project-stats">
								<span class="stat">
									<Star size={16} />
									{project.stars}
								</span>
								<span class="stat">
									<GitFork size={16} />
									{project.forks}
								</span>
							</div>

							<h3 class="project-title">{project.title}</h3>
							<p class="project-description">{project.description}</p>

							<div class="project-tech">
								{#each project.tech as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>

							<div class="project-actions">
								<a 
									href={project.github} 
									target="_blank" 
									rel="noopener noreferrer"
									class="btn btn-outline"
								>
									<Github size={18} />
									Code
								</a>
								<a 
									href={project.demo} 
									target="_blank" 
									rel="noopener noreferrer"
									class="btn btn-primary"
								>
									<ExternalLink size={18} />
									Live Demo
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>			<!-- View All Projects Button -->
			<div class="view-all-projects">
				<a href="/projects" class="btn btn-primary btn-large">
					View All Projects
					<ExternalLink size={18} />
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.projects-section {
		padding: var(--space-20) 0;
		position: relative;
		overflow: hidden;
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
		box-sizing: border-box;
	}

	.content-wrapper {
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.projects-section.visible .content-wrapper {
		opacity: 1;
		transform: translateY(0);
	}

	/* Section Header */
	.section-header {
		text-align: center;
		margin-bottom: var(--space-16);
	}

	.section-title {
		font-family: var(--font-serif);
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		background: linear-gradient(135deg, var(--primary-600), var(--primary-400));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto;
		line-height: var(--line-height-relaxed);
	}

	.subsection-title {
		font-family: var(--font-serif);
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		text-align: center;
		margin-bottom: var(--space-12);
	}
	/* Featured Projects */
	.featured-projects {
		margin-bottom: var(--space-12);
	}

	.project-card.featured {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-12);
		align-items: center;
		margin-bottom: var(--space-16);
		opacity: 0;
		transform: translateY(50px);
	}

	.projects-section.visible .project-card.featured {
		opacity: 1;
		transform: translateY(0);
		animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.project-card.featured.reverse {
		direction: rtl;
	}

	.project-card.featured.reverse > * {
		direction: ltr;
	}

	.project-image {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-2xl);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		aspect-ratio: 16/10;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-slow);
	}

	.project-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		opacity: 0;
		transition: opacity var(--transition-normal);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.project-image:hover .project-overlay {
		opacity: 1;
	}

	.project-image:hover img {
		transform: scale(1.05);
	}

	.project-links {
		display: flex;
		gap: var(--space-4);
	}

	.project-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		color: var(--color-text-primary);
		transition: all var(--transition-fast);
		backdrop-filter: blur(10px);
	}

	.project-link:hover {
		background: var(--primary-500);
		color: white;
		transform: scale(1.1);
	}

	.project-content {
		padding: var(--space-6);
	}

	.project-stats {
		display: flex;
		gap: var(--space-4);
		margin-bottom: var(--space-4);
	}

	.stat {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.project-title {
		font-family: var(--font-serif);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}

	.project-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-6);
	}

	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-6);
	}

	.tech-tag {
		padding: var(--space-1) var(--space-3);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--primary-600);
		font-weight: var(--font-weight-medium);
	}

	.project-actions {
		display: flex;
		gap: var(--space-4);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-lg);
		font-weight: var(--font-weight-medium);
		text-decoration: none;
		transition: all var(--transition-fast);
		border: 1px solid;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--primary-600), var(--primary-500));
		color: white;
		border-color: var(--primary-600);
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, var(--primary-700), var(--primary-600));
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(var(--primary-500), 0.3);
	}

	.btn-outline {
		background: var(--glass-bg);
		color: var(--color-text-primary);
		border-color: var(--glass-border);
		backdrop-filter: blur(10px);
	}
	.btn-outline:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-2px);
	}

	.btn-large {
		padding: var(--space-4) var(--space-8);
		font-size: var(--font-size-lg);
	}
	.view-all-projects {
		text-align: center;
		margin-top: var(--space-8);
	}
	/* Responsive Design */
	@media (max-width: 768px) {
		.container {
			padding: 0 var(--space-4);
		}

		.projects-section {
			padding: var(--space-16) 0;
		}

		.project-card.featured {
			grid-template-columns: 1fr;
			gap: var(--space-8);
			margin-left: 0;
			margin-right: 0;
		}
		.project-card.featured.reverse {
			direction: ltr;
		}

		.project-actions {
			flex-direction: column;
		}

		.btn {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}
		.project-content {
			padding: var(--space-4);
		}
	}

	/* Animations */
	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
