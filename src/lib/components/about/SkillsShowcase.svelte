<script lang="ts">
	import { getAllSkills, getSkillCategories, getSkillLevels } from '$lib/utils/skills.js';
	import { getTechIcon } from '$lib/utils/techIcons.js';
	import { Code, Zap, Database, Layers, Settings, Palette } from '$lib/utils/icons.js';
	import type { Skill, SkillCategory, SkillLevel } from '$lib/types/skills.js';

	// Load skills data
	const skills = getAllSkills();
	const categories = getSkillCategories();
	const skillLevels = getSkillLevels();

	// Group skills by category
	$: skillsByCategory = Object.entries(categories)
		.map(([id, category]: [string, SkillCategory]) => ({
			id,
			...category,
			skills: skills.filter((skill: Skill) => skill.category === id)
		}))
		.filter((category) => category.skills.length > 0);

	function getSkillLevelInfo(level: string): SkillLevel {
		return skillLevels[level] || skillLevels.learning;
	}

	function getCategoryIcon(categoryId: string) {
		const icons: Record<string, any> = {
			frontend: Layers,
			backend: Code,
			database: Database,
			devops: Zap,
			tools: Settings,
			design: Palette
		};
		return icons[categoryId] || Code;
	}
</script>

<div class="container">
	<header class="section-header">
		<div class="header-icon">
			<Code size={32} />
		</div>
		<h2 class="section-title">Technical Skills</h2>
		<p class="section-subtitle">
			Technologies and tools I work with, organized by expertise level and category
		</p>
	</header>

	<div class="skills-categories">
		{#each skillsByCategory as category, index}
			<div class="category-section" style="animation-delay: {index * 0.1}s">
				<div class="category-header">
					<div class="category-icon" style="color: {category.color}">
						<svelte:component this={getCategoryIcon(category.id)} size={24} />
					</div>
					<div class="category-info">
						<h3 class="category-title">{category.label}</h3>
						<p class="category-description">{category.description}</p>
					</div>
				</div>
				<div class="skills-grid">
					{#each category.skills as skill, skillIndex}
						{@const levelInfo = getSkillLevelInfo(skill.level)}
						{@const iconInfo = getTechIcon(skill.id)}
						<div
							class="skill-card glass-card"
							style="animation-delay: {index * 0.1 + skillIndex * 0.05}s"
						>
							<div class="skill-header">
								<div class="skill-icon">
									{#if iconInfo.type === 'devicon'}
										<i class="devicon-{iconInfo.icon}-{iconInfo.variant}" style="font-size: 2rem;"
										></i>
									{:else if iconInfo.component}
										<svelte:component this={iconInfo.component} size={32} />
									{:else}
										<div class="skill-icon-fallback">
											{skill.name.charAt(0)}
										</div>
									{/if}
								</div>
								<div class="skill-info">
									<h4 class="skill-name">{skill.name}</h4>
									<div
										class="skill-level-badge"
										style="background-color: {levelInfo.bgColor}; color: {levelInfo.color}; border-color: {levelInfo.borderColor}"
									>
										{levelInfo.label}
									</div>
								</div>
							</div>

							<p class="skill-description">{skill.description}</p>

							{#if skill.achievements && skill.achievements.length > 0}
								<div class="skill-achievements">
									<ul>
										{#each skill.achievements.slice(0, 2) as achievement}
											<li>{achievement}</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-16);
	}

	.header-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		border-radius: 1rem;
		color: white;
		margin-bottom: var(--space-6);
	}

	.section-title {
		font-size: clamp(2rem, 4vw, 2.5rem);
		font-weight: 800;
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
	}

	.section-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.skills-categories {
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	.category-section {
		opacity: 0;
		animation: fadeInUp 0.8s ease-out forwards;
	}

	.category-header {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.category-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		background: rgba(var(--color-surface-rgb), 0.8);
		border-radius: 0.75rem;
		backdrop-filter: blur(10px);
	}

	.category-info {
		flex: 1;
	}

	.category-title {
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-1);
	}

	.category-description {
		color: var(--color-text-secondary);
		margin: 0;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-6);
	}

	.skill-card {
		padding: var(--space-6);
		opacity: 0;
		animation: fadeInUp 0.8s ease-out forwards;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.skill-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(var(--primary-500-rgb), 0.1);
	}

	.skill-header {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-4);
	}

	.skill-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 0.75rem;
		background: rgba(var(--color-surface-rgb), 0.8);
	}

	.skill-icon-fallback {
		width: 2rem;
		height: 2rem;
		background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 1rem;
	}

	.skill-info {
		flex: 1;
	}

	.skill-name {
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.skill-level-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		border-radius: 9999px;
		font-size: var(--font-size-sm);
		font-weight: 500;
		border: 1px solid;
	}

	.skill-description {
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin-bottom: var(--space-4);
	}

	.skill-achievements ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.skill-achievements li {
		position: relative;
		padding-left: var(--space-4);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		line-height: 1.4;
		margin-bottom: var(--space-1);
	}

	.skill-achievements li:before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--primary-500);
		font-weight: 700;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(2rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}

		.category-header {
			flex-direction: column;
			align-items: flex-start;
			text-align: left;
		}
	}
</style>
