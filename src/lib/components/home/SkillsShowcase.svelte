<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Award, Zap, Layers, Sparkles, ArrowRight } from '$lib/utils/icons.js';
	import { getHomepageSkills, getSkillLevels } from '$lib/utils/skills.js';
	import { getTechIcon } from '$lib/utils/techIcons.js';

	let skillsRef: HTMLElement;
	let isVisible = false;

	// Get skills data from JSON
	const skillCategories = getHomepageSkills();
	const skillLevels = getSkillLevels();

	// Icon mapping for categories
	const iconMap: Record<string, any> = {
		Layers,
		Code,
		Zap,
		Award
	};

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

	function renderTechIcon(techName: string, size: number = 20) {
		const techIcon = getTechIcon(techName);
		if (techIcon.type === 'devicon') {
			return `<i class="devicon-${techIcon.icon}-${techIcon.variant}" style="font-size: ${size}px;"></i>`;
		} else {
			// Fallback to emoji or default icon
			return '⚡';
		}
	}
</script>

<section bind:this={skillsRef} class="skills-section" class:visible={isVisible} id="skills">
	<div class="container">
		<!-- Header -->
		<header class="section-header">
			<div class="header-icon">
				<Code size={32} />
			</div>
			<h2 class="section-title">Skills & Expertise</h2>
			<p class="section-subtitle">Technologies I use to build amazing experiences</p>
		</header>

		<!-- Category Cards -->
		<div class="category-cards">
			{#each skillCategories as category, categoryIndex}
				<div class="category-card glass-card" style="animation-delay: {categoryIndex * 0.2}s">
					<!-- Category Header -->
					<div class="category-header">
						<div class="category-icon-wrapper">
							<div class="category-icon" style="background: {category.color}">
								<svelte:component this={iconMap[category.icon] || Code} size={24} />
							</div>
						</div>
						<div class="category-info">
							<h3 class="category-title">{category.title}</h3>
							<p class="category-description">{category.description}</p>
						</div>
					</div>

					<!-- Skills Grid -->
					<div class="skills-grid">
						{#each category.skills as skill, skillIndex}
							{@const levelInfo = skillLevels[skill.level] || skillLevels.learning}
							<div
								class="skill-item"
								style="animation-delay: {categoryIndex * 0.2 + skillIndex * 0.05}s"
								title="{skill.name} - {levelInfo.label}"
							>
								<div class="skill-icon">
									<span style="font-size: 20px;">{skill.icon}</span>
								</div>
								<div class="skill-details">
									<span class="skill-name">{skill.name}</span>
									<span
										class="skill-level"
										style="background: {levelInfo.bgColor}; color: {levelInfo.color}; border-color: {levelInfo.borderColor}"
									>
										{levelInfo.label}
									</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Action Button -->
		<div class="section-footer">
			<a href="/about" class="view-all-btn glass-button">
				<Code size={20} />
				<span>View All Skills</span>
				<ArrowRight size={18} />
			</a>
		</div>
	</div>
</section>

<style>
	/* Skills Section - Card-Based Grouping */
	.skills-section {
		padding: var(--space-20) 0;
		position: relative;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 var(--space-6);
		position: relative;
		z-index: 1;
	}

	/* Section Header */
	.section-header {
		text-align: center;
		margin-bottom: var(--space-16);
		opacity: 0;
		transform: translateY(40px);
		transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
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
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		border-radius: var(--radius-2xl);
		color: white;
		margin: 0 auto var(--space-6);
		box-shadow: 0 8px 32px rgba(var(--primary-500-rgb), 0.3);
		transition: transform 0.3s ease;
	}

	.skills-section.visible .header-icon {
		transform: scale(1.05);
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 900;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-4);
		line-height: 1.1;
	}

	.section-subtitle {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		max-width: 70ch;
		margin: 0 auto;
		line-height: 1.7;
	}

	/* Category Cards */
	.category-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: var(--space-8);
		margin-bottom: var(--space-16);
	}

	.category-card {
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(30px);
		position: relative;
		overflow: hidden;
	}

	.skills-section.visible .category-card {
		opacity: 1;
		transform: translateY(0);
	}

	.category-card:hover {
		transform: translateY(-8px);
	}

	/* Category Header */
	.category-header {
		display: flex;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
		align-items: flex-start;
	}

	.category-icon-wrapper {
		flex-shrink: 0;
	}

	.category-icon {
		width: 60px;
		height: 60px;
		border-radius: var(--radius-xl);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.category-card:hover .category-icon {
		transform: scale(1.1);
	}

	.category-info {
		flex: 1;
		min-width: 0;
	}

	.category-title {
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
		line-height: 1.3;
	}

	.category-description {
		font-size: var(--font-size-base);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-3);
		line-height: 1.6;
	}

	/* Skills Grid */
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--space-3);
	}

	.skill-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
		border-radius: var(--radius-lg);
		background: rgba(var(--color-surface-rgb), 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(15px);
		cursor: default;
	}

	.skills-section.visible .skill-item {
		opacity: 1;
		transform: translateY(0);
	}

	.skill-item:hover {
		transform: translateY(-3px);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
	}

	.skill-icon {
		width: 40px;
		height: 40px;
		background: rgba(var(--color-surface-rgb), 0.8);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: transform 0.3s ease;
	}

	.skill-item:hover .skill-icon {
		transform: scale(1.1);
	}

	.skill-details {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.skill-name {
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-text-primary);
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.skill-level {
		display: inline-block;
		padding: 2px var(--space-2);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		width: fit-content;
		border: 1px solid;
		line-height: 1.2;
	}

	/* Section Footer */
	.section-footer {
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
	}

	.skills-section.visible .section-footer {
		opacity: 1;
		transform: translateY(0);
	}

	.view-all-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-8);
		font-size: var(--font-size-base);
		font-weight: 600;
		color: var(--color-text-primary);
		text-decoration: none;
		border-radius: var(--radius-full);
		transition: all 0.3s ease;
	}

	.view-all-btn:hover {
		transform: translateY(-2px);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.skills-section {
			padding: var(--space-16) 0;
		}

		.section-title {
			font-size: clamp(2rem, 8vw, 3rem);
		}

		.category-cards {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.category-card {
			padding: var(--space-6);
		}

		.category-header {
			gap: var(--space-3);
		}

		.category-icon {
			width: 50px;
			height: 50px;
		}

		.category-title {
			font-size: var(--font-size-lg);
		}

		.category-description {
			font-size: var(--font-size-sm);
		}

		.skills-grid {
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
			gap: var(--space-2);
		}

		.skill-item {
			flex-direction: column;
			text-align: center;
			gap: var(--space-2);
			padding: var(--space-3);
		}

		.skill-icon {
			width: 36px;
			height: 36px;
		}
	}

	@media (max-width: 480px) {
		.category-cards {
			gap: var(--space-4);
		}

		.category-card {
			padding: var(--space-4);
		}

		.category-header {
			gap: var(--space-2-5);
		}

		.category-icon {
			width: 44px;
			height: 44px;
		}

		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	:global(.dark) .skill-item {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .skill-icon {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}
</style>
