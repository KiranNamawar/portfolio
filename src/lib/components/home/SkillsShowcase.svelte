<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, Settings, Zap, Layers, Code, Database, Palette } from '$lib/utils/icons.js';
	import { getSkillsGroupedByCategory, getSkillLevels, getSkillIcon } from '$lib/utils/skills.js';
	import type { SkillCategory, Skill, SkillLevel } from '$lib/types/skills.js';

	let skillsRef: HTMLElement;
	let isVisible = false;
	let skillCategories: Array<{
		category: string;
		categoryInfo: SkillCategory;
		skills: Skill[];
	}> = [];
	let skillLevels: Record<string, SkillLevel> = {};

	// Define categories to show on homepage in order
	const homepageCategories = ['frontend', 'backend', 'database', 'devops'];

	onMount(() => {
		// Load skills data
		skillLevels = getSkillLevels();
		const allSkillGroups = getSkillsGroupedByCategory();
		// Filter and sort categories for homepage
		skillCategories = homepageCategories
			.map((categoryKey) => allSkillGroups.find((group) => group.category === categoryKey))
			.filter((group): group is NonNullable<typeof group> => Boolean(group))
			.map((group) => ({
				...group,
				skills: group.skills
					.sort((a, b) => {
						// Sort by skill level (highest first), then by name
						const aLevel = skillLevels[a.level]?.order || 0;
						const bLevel = skillLevels[b.level]?.order || 0;
						if (bLevel !== aLevel) return bLevel - aLevel;
						return a.name.localeCompare(b.name);
					})
					.slice(0, 5) // Top 5 skills per category
			}));

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

	function getSkillLevelBadge(level: string) {
		const skillLevel = skillLevels[level];
		if (!skillLevel) return { label: level, color: '#6b7280' };
		return {
			label: skillLevel.label,
			color: skillLevel.color,
			bgColor: skillLevel.bgColor,
			borderColor: skillLevel.borderColor
		};
	}
	function getCategoryIcon(iconName: string) {
		// Map icon names to actual icon components
		const iconMap: Record<string, any> = {
			Layers: Layers,
			Code: Code,
			Database: Database,
			Zap: Zap,
			Settings: Settings,
			Palette: Palette
		};
		return iconMap[iconName] || Settings;
	}
</script>

<section bind:this={skillsRef} class="skills-section" class:visible={isVisible} id="skills">
	<div class="container">
		<header class="section-header">
			<div class="header-icon">
				<Code size={32} />
			</div>
			<h2 class="section-title">Skills & Expertise</h2>
			<p class="section-subtitle">
				Core technologies and tools I work with across different domains
			</p>
		</header>
		<div class="skills-grid">
			{#each skillCategories as { category, categoryInfo, skills }, index}
				<article class="skill-category-card glass-card" style="animation-delay: {index * 0.15}s">
					<div class="category-header">
						<div class="category-icon" style="color: {categoryInfo.color}">
							<svelte:component this={getCategoryIcon(categoryInfo.icon)} size={20} />
						</div>
						<div class="category-info">
							<h3 class="category-title">{categoryInfo.label}</h3>
							<div class="skills-count">{skills.length} skills</div>
						</div>
					</div>

					<div class="skills-preview">
						{#each skills.slice(0, 4) as skill, skillIndex}
							<div
								class="skill-preview-item"
								style="animation-delay: {index * 0.1 + skillIndex * 0.05}s"
							>
								<div class="skill-preview-content">
									<div class="skill-icon">
										{#if getSkillIcon(skill.name).type === 'devicon'}
											<i
												class="devicon-{getSkillIcon(skill.name).icon}-{getSkillIcon(skill.name)
													.variant || 'plain'}"
											></i>
										{:else}
											<svelte:component this={getSkillIcon(skill.name).component} size={14} />
										{/if}
									</div>
									<span class="skill-name">{skill.name}</span>
								</div>
								<div class="skill-level-indicator">
									<div class="level-dots">
										{#each Array(3) as _, dotIndex}
											<div
												class="level-dot"
												class:filled={dotIndex < (skillLevels[skill.level]?.order || 1)}
												style="--dot-color: {getSkillLevelBadge(skill.level).color}"
											></div>
										{/each}
									</div>
									<span class="level-label">{getSkillLevelBadge(skill.level).label}</span>
								</div>
							</div>
						{/each}

						{#if skills.length > 4}
							<div class="more-skills">
								<span class="more-count">+{skills.length - 4} more</span>
								<span class="more-text">in {categoryInfo.label.toLowerCase()}</span>
							</div>
						{/if}
					</div>

					<div class="category-stats">
						<div class="stat-item">
							<span class="stat-value"
								>{skills.filter((s) => skillLevels[s.level]?.order === 3).length}</span
							>
							<span class="stat-label">Expert</span>
						</div>
						<div class="stat-item">
							<span class="stat-value"
								>{skills.filter((s) => skillLevels[s.level]?.order === 2).length}</span
							>
							<span class="stat-label">Intermediate</span>
						</div>
						<div class="stat-item">
							<span class="stat-value"
								>{skills.filter((s) => skillLevels[s.level]?.order === 1).length}</span
							>
							<span class="stat-label">Learning</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
		<div class="section-footer">
			<a href="/about#skills" class="view-all-btn glass-button">
				<Code size={20} />
				<span>View All Skills</span>
				<ArrowRight size={18} />
			</a>
		</div>
	</div>
</section>

<style>
	.skills-section {
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
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
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
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-4);
		margin-bottom: var(--space-16);
	}
	.skill-category-card {
		padding: var(--space-5);
		border-radius: var(--radius-xl);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(30px);
		position: relative;
		overflow: hidden;
	}

	.skills-section.visible .skill-category-card {
		opacity: 1;
		transform: translateY(0);
	}

	.skill-category-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.category-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--color-border-secondary);
	}

	.category-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-md);
		background: var(--color-surface-secondary);
		flex-shrink: 0;
	}

	.category-info {
		flex: 1;
	}

	.category-title {
		font-size: var(--font-size-lg);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-1);
	}

	.skills-count {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.skills-preview {
		margin-bottom: var(--space-4);
	}

	.skill-preview-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) 0;
		opacity: 0;
		transform: translateX(-10px);
		animation: slideInSkill 0.6s ease forwards;
	}

	@keyframes slideInSkill {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.skill-preview-content {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex: 1;
	}

	.skill-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.skill-icon :global(i) {
		font-size: 14px;
	}

	.skill-name {
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.skill-level-indicator {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.level-dots {
		display: flex;
		gap: 2px;
	}

	.level-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--color-border-secondary);
		transition: all 0.3s ease;
	}

	.level-dot.filled {
		background: var(--dot-color);
		box-shadow: 0 0 6px var(--dot-color);
	}

	.level-label {
		font-size: var(--font-size-xs);
		font-weight: 500;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.more-skills {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-3);
		margin-top: var(--space-2);
		border-radius: var(--radius-md);
		background: var(--color-surface-secondary);
		border: 1px dashed var(--color-border-secondary);
	}

	.more-count {
		font-size: var(--font-size-sm);
		font-weight: 700;
		color: var(--color-text-primary);
	}

	.more-text {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
	}

	.category-stats {
		display: flex;
		justify-content: space-between;
		padding-top: var(--space-3);
		border-top: 1px solid var(--color-border-secondary);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-1);
	}

	.stat-value {
		font-size: var(--font-size-lg);
		font-weight: 800;
		color: var(--color-text-primary);
	}
	.stat-label {
		font-size: var(--font-size-xs);
		font-weight: 500;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.section-footer {
		display: flex;
		justify-content: center;
		opacity: 0;
		transform: translateY(20px);
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
		padding: var(--space-4) var(--space-6);
		border-radius: var(--radius-full);
		font-weight: 600;
		transition: all 0.3s ease;
		text-decoration: none;
		color: var(--color-text-primary);
	}

	.view-all-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}

	.view-all-btn:hover :global(svg) {
		transform: translateX(4px);
	}
	.view-all-btn :global(svg) {
		transition: transform 0.3s ease;
	}
	/* Responsive Design */
	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
			gap: var(--space-4);
		}

		.skill-category-card {
			padding: var(--space-3);
		}

		.category-header-compact {
			gap: var(--space-2);
			margin-bottom: var(--space-3);
			padding-bottom: var(--space-2);
		}

		.category-icon-small {
			width: 28px;
			height: 28px;
		}

		.category-title-compact {
			font-size: var(--font-size-sm);
		}

		.skills-compact-grid {
			gap: var(--space-1);
		}

		.skill-chip {
			padding: var(--space-1) var(--space-2);
			font-size: var(--font-size-xs);
		}

		.skill-icon-mini {
			width: 14px;
			height: 14px;
		}

		.skill-icon-mini :global(i) {
			font-size: 10px;
		}

		.skill-level-dot {
			width: 5px;
			height: 5px;
		}

		.section-title {
			font-size: 2.5rem;
		}

		.section-subtitle {
			font-size: var(--font-size-lg);
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-4);
		}

		.skills-section {
			padding: var(--space-16) 0;
		}

		.section-header {
			margin-bottom: var(--space-12);
		}

		.skills-grid {
			margin-bottom: var(--space-12);
		}
	}
</style>
