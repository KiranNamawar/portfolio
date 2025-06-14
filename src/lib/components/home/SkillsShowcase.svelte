<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Palette, Database, Globe, Smartphone, Zap } from '$lib/utils/icons.js';
	import { skills } from '../../data/personal.js';

	let skillsRef: HTMLElement;
	let isVisible = false;

	const skillCategories = [
		{
			id: 'frontend',
			title: 'Frontend',
			icon: Palette,
			description: 'Creating beautiful, responsive user interfaces',
			color: 'from-blue-500 to-cyan-500',
			skills: skills.filter((skill) =>
				[
					'React',
					'Vue',
					'Svelte',
					'TypeScript',
					'JavaScript',
					'HTML',
					'CSS',
					'Tailwind CSS',
					'SCSS'
				].includes(skill.name)
			)
		},
		{
			id: 'backend',
			title: 'Backend',
			icon: Database,
			description: 'Building robust server-side applications',
			color: 'from-green-500 to-emerald-500',
			skills: skills.filter((skill) =>
				['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'].includes(
					skill.name
				)
			)
		},
		{
			id: 'tools',
			title: 'Tools & DevOps',
			icon: Zap,
			description: 'Streamlining development and deployment',
			color: 'from-purple-500 to-violet-500',
			skills: skills.filter((skill) =>
				['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code'].includes(skill.name)
			)
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (skillsRef) {
			observer.observe(skillsRef);
		}

		return () => observer.disconnect();
	});
</script>

<section bind:this={skillsRef} class="skills-section" class:visible={isVisible} id="skills">
	<div class="container">
		<header class="section-header">
			<div class="header-icon">
				<Code size={32} />
			</div>
			<h2 class="section-title">Skills & Expertise</h2>
			<p class="section-subtitle">Technologies and tools I use to bring ideas to life</p>
		</header>

		<div class="skills-grid">
			{#each skillCategories as category, categoryIndex}
				<div class="skill-category glass-card" style="animation-delay: {categoryIndex * 0.2}s">
					<div class="category-header">
						<div class="category-icon bg-gradient-to-br {category.color}">
							<svelte:component this={category.icon} size={24} />
						</div>
						<div class="category-info">
							<h3 class="category-title">{category.title}</h3>
							<p class="category-description">{category.description}</p>
						</div>
					</div>

					<div class="skills-list">
						{#each category.skills as skill, skillIndex}
							<div
								class="skill-item"
								style="animation-delay: {categoryIndex * 0.2 + skillIndex * 0.1}s"
							>
								<div class="skill-info">
									<div class="skill-icon">{skill.icon}</div>
									<span class="skill-name">{skill.name}</span>
								</div>
								<div class="skill-progress-container">
									<div
										class="skill-progress"
										class:animate={isVisible}
										style="width: {isVisible ? skill.level : 0}%"
									></div>
									<span class="skill-level">{skill.level}%</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Additional Skills Cloud -->
		<div class="skills-cloud">
			<h3 class="cloud-title">Also experienced with</h3>
			<div class="cloud-tags">
				{#each ['GraphQL', 'Next.js', 'SvelteKit', 'Prisma', 'Stripe', 'Socket.io', 'Jest', 'Playwright'] as tech}
					<span class="cloud-tag glass-button">{tech}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skills-section {
		padding: var(--space-20) 0;
		position: relative;
		background: linear-gradient(
			135deg,
			rgba(var(--primary-500-rgb, 99, 102, 241), 0.02) 0%,
			transparent 50%,
			rgba(var(--primary-700-rgb, 67, 56, 202), 0.02) 100%
		);
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

	.skills-section.visible .section-header {
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
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-5px);
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

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--space-8);
		margin-bottom: var(--space-16);
	}

	.skill-category {
		padding: var(--space-8);
		border-radius: var(--radius-2xl);
		position: relative;
		overflow: hidden;
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.skills-section.visible .skill-category {
		opacity: 1;
		transform: translateY(0);
	}

	.skill-category:hover {
		transform: translateY(-5px);
	}

	.category-header {
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.category-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		border-radius: var(--radius-xl);
		flex-shrink: 0;
		color: white;
	}

	.category-info {
		flex: 1;
	}

	.category-title {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.category-description {
		font-size: var(--font-size-base);
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
	}

	.skills-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.skill-item {
		opacity: 0;
		transform: translateX(-20px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.skills-section.visible .skill-item {
		opacity: 1;
		transform: translateX(0);
	}

	.skill-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
	}

	.skill-icon {
		font-size: var(--font-size-lg);
		width: 24px;
		text-align: center;
	}

	.skill-name {
		font-size: var(--font-size-base);
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.skill-progress-container {
		position: relative;
		height: 8px;
		background: var(--color-surface-secondary);
		border-radius: var(--radius-full);
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.skill-progress {
		height: 100%;
		background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
		border-radius: var(--radius-full);
		transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.skill-progress::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.skill-level {
		position: absolute;
		right: var(--space-2);
		font-size: var(--font-size-xs);
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	.skills-cloud {
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
	}

	.skills-section.visible .skills-cloud {
		opacity: 1;
		transform: translateY(0);
	}

	.cloud-title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-6);
	}

	.cloud-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		justify-content: center;
	}

	.cloud-tag {
		padding: var(--space-2) var(--space-4);
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--color-text-secondary);
		border-radius: var(--radius-full);
		transition: all 0.3s ease;
		cursor: default;
	}

	.cloud-tag:hover {
		color: var(--primary-600);
		transform: translateY(-2px);
	}

	/* Gradient classes for category icons */
	.bg-gradient-to-br {
		background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
	}

	.from-blue-500 {
		--tw-gradient-from: #3b82f6;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-cyan-500 {
		--tw-gradient-to: #06b6d4;
	}

	.from-green-500 {
		--tw-gradient-from: #10b981;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-emerald-500 {
		--tw-gradient-to: #10b981;
	}

	.from-purple-500 {
		--tw-gradient-from: #8b5cf6;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-violet-500 {
		--tw-gradient-to: #8b5cf6;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.skills-section {
			padding: var(--space-16) 0;
		}

		.container {
			padding: 0 var(--space-4);
		}

		.skills-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.skill-category {
			padding: var(--space-6);
		}

		.category-header {
			flex-direction: column;
			text-align: center;
		}

		.category-icon {
			align-self: center;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}

		.skill-category {
			padding: var(--space-4);
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}

		.section-subtitle {
			font-size: var(--font-size-lg);
		}
	}
</style>
