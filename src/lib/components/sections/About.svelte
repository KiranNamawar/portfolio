<script lang="ts">
	import { onMount } from 'svelte';

	let skillsVisible = false;
	let aboutRef: HTMLElement;

	const skills = [
		{ name: 'JavaScript/TypeScript', level: 95, icon: '🟨' },
		{ name: 'Svelte/SvelteKit', level: 90, icon: '🧡' },
		{ name: 'React/Next.js', level: 85, icon: '⚛️' },
		{ name: 'Node.js', level: 88, icon: '💚' },
		{ name: 'CSS/Tailwind', level: 92, icon: '🎨' },
		{ name: 'Python', level: 80, icon: '🐍' },
		{ name: 'Database Design', level: 85, icon: '🗄️' },
		{ name: 'DevOps/Docker', level: 75, icon: '🐳' }
	];

	const experience = [
		{
			title: 'Senior Full Stack Developer',
			company: 'Tech Corp',
			period: '2023 - Present',
			description: 'Leading development of scalable web applications using modern frameworks and cloud technologies.',
			technologies: ['SvelteKit', 'TypeScript', 'AWS', 'PostgreSQL']
		},
		{
			title: 'Full Stack Developer',
			company: 'Digital Agency',
			period: '2021 - 2023',
			description: 'Built responsive web applications and APIs for diverse clients across various industries.',
			technologies: ['React', 'Node.js', 'MongoDB', 'Docker']
		},
		{
			title: 'Frontend Developer',
			company: 'Startup Inc',
			period: '2020 - 2021',
			description: 'Developed user interfaces and improved user experience for SaaS platform.',
			technologies: ['Vue.js', 'JavaScript', 'SCSS', 'Figma']
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					skillsVisible = true;
				}
			},
			{ threshold: 0.5 }
		);

		if (aboutRef) {
			observer.observe(aboutRef);
		}

		return () => observer.disconnect();
	});
</script>

<section class="about-section" bind:this={aboutRef}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">About Me</h2>
			<p class="section-subtitle">
				Passionate developer with a love for creating exceptional digital experiences
			</p>
		</div>

		<div class="about-content">
			<div class="about-text">
				<div class="text-card glass-card">
					<h3>My Story</h3>
					<p>
						I'm a passionate full-stack developer with over 4 years of experience creating 
						digital solutions that make a difference. I love turning complex problems into 
						simple, beautiful, and intuitive designs.
					</p>
					<p>
						When I'm not coding, you'll find me exploring new technologies, contributing to 
						open-source projects, or mentoring aspiring developers in the community.
					</p>
					
					<div class="stats">
						<div class="stat-item">
							<span class="stat-number">50+</span>
							<span class="stat-label">Projects Completed</span>
						</div>
						<div class="stat-item">
							<span class="stat-number">4+</span>
							<span class="stat-label">Years Experience</span>
						</div>
						<div class="stat-item">
							<span class="stat-number">20+</span>
							<span class="stat-label">Happy Clients</span>
						</div>
					</div>

					<a href="/resume.pdf" class="resume-btn glass-button" download>
						<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
							<polyline points="7,10 12,15 17,10"/>
							<line x1="12" y1="15" x2="12" y2="3"/>
						</svg>
						Download Resume
					</a>
				</div>
			</div>

			<div class="skills-section">
				<div class="skills-card glass-card">
					<h3>Technical Skills</h3>
					<div class="skills-grid">
						{#each skills as skill, index}
							<div class="skill-item" style="animation-delay: {index * 0.1}s">
								<div class="skill-header">
									<span class="skill-icon">{skill.icon}</span>
									<span class="skill-name">{skill.name}</span>
									<span class="skill-percentage">{skill.level}%</span>
								</div>
								<div class="skill-bar">
									<div 
										class="skill-progress" 
										class:animate={skillsVisible}
										style="width: {skillsVisible ? skill.level : 0}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="experience-section">
			<h3>Professional Experience</h3>
			<div class="timeline">
				{#each experience as exp, index}
					<div class="timeline-item" style="animation-delay: {index * 0.2}s">
						<div class="timeline-marker"></div>
						<div class="timeline-content glass-card">
							<div class="exp-header">
								<h4 class="exp-title">{exp.title}</h4>
								<span class="exp-period">{exp.period}</span>
							</div>
							<p class="exp-company">{exp.company}</p>
							<p class="exp-description">{exp.description}</p>
							<div class="exp-technologies">
								{#each exp.technologies as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about-section {
		padding: 5rem 0;
		background: linear-gradient(135deg, 
			var(--color-bg-primary) 0%, 
			var(--color-bg-secondary) 50%, 
			var(--color-bg-primary) 100%);
		position: relative;
		overflow: hidden;
	}

	.about-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 30% 30%, rgba(var(--primary-500), 0.05) 0%, transparent 50%);
		pointer-events: none;
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		position: relative;
		z-index: 1;
		box-sizing: border-box;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: 3rem;
		font-weight: 700;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}

	.section-subtitle {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}
	.about-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		margin-bottom: 4rem;
		width: 100%;
		box-sizing: border-box;
	}
	.glass-card {
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 8px 32px var(--glass-shadow);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.glass-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 40px var(--glass-shadow);
	}

	.text-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 1.5rem;
	}

	.text-card p {
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin: 2rem 0;
		padding: 1.5rem 0;
		border-top: 1px solid var(--color-border-primary);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.stat-item {
		text-align: center;
	}

	.stat-number {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary-500);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.resume-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 2rem;
		color: var(--color-text-primary);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
		margin-top: 1rem;
	}

	.resume-btn:hover {
		background: var(--primary-500);
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(var(--primary-500), 0.3);
	}

	.icon {
		width: 1.25rem;
		height: 1.25rem;
		stroke-width: 2;
	}

	.skills-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 2rem;
	}

	.skills-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.skill-item {
		opacity: 0;
		animation: slideUp 0.6s ease forwards;
	}

	.skill-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.skill-icon {
		font-size: 1.25rem;
	}

	.skill-name {
		flex: 1;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.skill-percentage {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-weight: 600;
	}

	.skill-bar {
		height: 6px;
		background: var(--color-border-primary);
		border-radius: 3px;
		overflow: hidden;
	}

	.skill-progress {
		height: 100%;
		background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
		border-radius: 3px;
		transition: width 1.5s ease;
		transform-origin: left;
	}

	.skill-progress.animate {
		animation: fillBar 1.5s ease forwards;
	}

	.experience-section h3 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-align: center;
		margin-bottom: 3rem;
	}

	.timeline {
		position: relative;
		padding-left: 2rem;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 1rem;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(to bottom, var(--primary-500), var(--primary-700));
	}

	.timeline-item {
		position: relative;
		margin-bottom: 3rem;
		opacity: 0;
		animation: slideUp 0.6s ease forwards;
	}

	.timeline-marker {
		position: absolute;
		left: -2rem;
		top: 1.5rem;
		width: 12px;
		height: 12px;
		background: var(--primary-500);
		border-radius: 50%;
		border: 3px solid var(--color-bg-primary);
		z-index: 2;
	}

	.timeline-content {
		margin-left: 1rem;
	}

	.exp-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.exp-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.exp-period {
		font-size: 0.875rem;
		color: var(--primary-500);
		font-weight: 600;
		white-space: nowrap;
	}

	.exp-company {
		color: var(--color-text-secondary);
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.exp-description {
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.exp-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-tag {
		background: var(--color-bg-tertiary);
		color: var(--color-text-primary);
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 500;
		border: 1px solid var(--color-border-primary);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fillBar {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}	/* Responsive Design */
	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.container {
			padding: 0 var(--space-4);
		}

		.glass-card {
			margin: 0;
			padding: 1.5rem;
		}

		.section-title {
			font-size: 2.5rem;
		}

		.stats {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.exp-header {
			flex-direction: column;
			gap: 0.5rem;
		}

		.timeline {
			padding-left: 1.5rem;
		}

		.timeline-marker {
			left: -1.5rem;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}

		.glass-card {
			padding: 1rem;
			margin: 0;
		}

		.section-title {
			font-size: 2rem;
		}

		.skills-grid {
			gap: 1rem;
		}

		.skill-item {
			padding: 0.75rem;
		}
	}
</style>
