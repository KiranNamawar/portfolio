<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Palette, Database, Globe, Smartphone, Zap, Award } from '$lib/utils/icons.js';
	import { getSkillsGroupedByCategory, getSkillLevels } from '$lib/utils/skills.js';

	let skillsRef: HTMLElement;
	let isVisible = false;

	// Get skills data from JSON
	const skillCategories = getSkillsGroupedByCategory();
	const skillLevels = getSkillLevels();

	// Icon mapping for categories
	const iconMap: Record<string, any> = {
		Palette,
		Database,
		Code,
		Globe,
		Smartphone,
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

	function getSkillLevelInfo(level: string) {
		return skillLevels[level as keyof typeof skillLevels] || skillLevels.foundational;
	}

	function getSkillProgressWidth(level: string) {
		const levelInfo = getSkillLevelInfo(level);
		return (levelInfo.order / 5) * 100; // Convert to percentage
	}
</script>

<section bind:this={skillsRef} class="skills-section" class:visible={isVisible} id="skills">
	<div class="container">
		<header class="section-header">
			<div class="header-icon">
				<Code size={32} />
			</div>
			<h2 class="section-title">Technical Skills & Expertise</h2>
			<p class="section-subtitle">
				Comprehensive overview of my technical capabilities and experience levels
			</p>
		</header>

		<div class="skills-grid">
			{#each skillCategories as categoryGroup, categoryIndex}
				<div class="skill-category glass-card" style="animation-delay: {categoryIndex * 0.2}s">
					<div class="category-header">
						<div class="category-icon" style="background: {categoryGroup.categoryInfo.color}">
							<svelte:component this={iconMap[categoryGroup.categoryInfo.icon] || Code} size={24} />
						</div>
						<div class="category-info">
							<h3 class="category-title">{categoryGroup.categoryInfo.label}</h3>
							<p class="category-description">{categoryGroup.categoryInfo.description}</p>
						</div>
					</div>

					<div class="skills-list">
						{#each categoryGroup.skills as skill, skillIndex}
							<div
								class="skill-item"
								style="animation-delay: {categoryIndex * 0.2 + skillIndex * 0.1}s"
								title={skill.description}
							>
								<div class="skill-header">
									<div class="skill-info">
										<div class="skill-icon">{skill.icon}</div>
										<span class="skill-name">{skill.name}</span>
									</div>
									<div
										class="skill-level-badge"
										style="background: {skillLevels[skill.level]?.bgColor ||
											skillLevels.learning.bgColor}; color: {skillLevels[skill.level]?.color ||
											skillLevels.learning.color}"
									>
										<Award size={14} />
										<span class="skill-level-text"
											>{skillLevels[skill.level]?.label || skillLevels.learning.label}</span
										>
									</div>
								</div>

								<div class="skill-progress-container">
									<div
										class="skill-progress"
										class:animate={isVisible}
										style="background: {skillLevels[skill.level]?.color ||
											skillLevels.learning.color}; width: {isVisible
											? getSkillProgressWidth(skill.level)
											: 0}%"
									></div>
								</div>

								<div class="skill-achievements">
									<p class="skill-description">{skill.description}</p>
									<div class="achievement-list">
										{#each skill.achievements.slice(0, 3) as achievement}
											<div class="achievement-item">
												<span class="achievement-dot"></span>
												<span class="achievement-text">{achievement}</span>
											</div>
										{/each}
										{#if skill.achievements.length > 3}
											<div class="achievement-item more-achievements">
												<span class="achievement-dot"></span>
												<span class="achievement-text"
													>+{skill.achievements.length - 3} more achievements...</span
												>
											</div>
										{/if}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Additional Skills Cloud -->
		<div class="skills-cloud">
			<h3 class="cloud-title">Additional Technologies & Tools</h3>
			<div class="cloud-tags">
				{#each ['GraphQL', 'Next.js', 'SvelteKit', 'Prisma', 'Stripe', 'Socket.io', 'Jest', 'Playwright', 'Webpack', 'Vite', 'ESLint', 'Prettier', 'GitHub Actions', 'Jenkins'] as tech}
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
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
		gap: var(--space-6);
	}

	.skill-item {
		opacity: 0;
		transform: translateX(-20px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		background: rgba(var(--color-surface-secondary-rgb), 0.3);
		border: 1px solid rgba(var(--color-border-rgb), 0.1);
	}

	.skills-section.visible .skill-item {
		opacity: 1;
		transform: translateX(0);
	}

	.skill-item:hover {
		background: rgba(var(--color-surface-secondary-rgb), 0.5);
		transform: translateX(5px);
	}

	.skill-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-3);
	}

	.skill-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
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

	.skill-level-badge {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		color: white;
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.skill-level-text {
		line-height: 1;
	}

	.skill-progress-container {
		position: relative;
		height: 6px;
		background: var(--color-surface-secondary);
		border-radius: var(--radius-full);
		overflow: hidden;
		margin-bottom: var(--space-4);
	}

	.skill-progress {
		height: 100%;
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

	.skill-achievements {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.skill-description {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		line-height: 1.4;
		margin: 0;
	}

	.achievement-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.achievement-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.achievement-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--primary-500);
		flex-shrink: 0;
	}

	.achievement-text {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		line-height: 1.3;
	}

	.more-achievements .achievement-text {
		font-style: italic;
		opacity: 0.7;
	}

	/* Additional Skills Cloud */
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

	/* Gradient classes for category icons and skill levels */
	.bg-gradient-to-br,
	.bg-gradient-to-r {
		background-image: linear-gradient(
			var(--tw-gradient-direction, to bottom right),
			var(--tw-gradient-stops)
		);
	}

	.bg-gradient-to-r {
		--tw-gradient-direction: to right;
	}

	/* Color definitions */
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
	.from-orange-500 {
		--tw-gradient-from: #f97316;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-red-500 {
		--tw-gradient-to: #ef4444;
	}
	.from-purple-500 {
		--tw-gradient-from: #8b5cf6;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-violet-500 {
		--tw-gradient-to: #8b5cf6;
	}
	.from-gray-500 {
		--tw-gradient-from: #6b7280;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-slate-500 {
		--tw-gradient-to: #64748b;
	}
	.from-pink-500 {
		--tw-gradient-from: #ec4899;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-rose-500 {
		--tw-gradient-to: #f43f5e;
	}

	/* Skill level gradient colors */
	.from-gray-400 {
		--tw-gradient-from: #9ca3af;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-gray-500 {
		--tw-gradient-to: #6b7280;
	}
	.from-blue-400 {
		--tw-gradient-from: #60a5fa;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-blue-500 {
		--tw-gradient-to: #3b82f6;
	}
	.from-green-400 {
		--tw-gradient-from: #4ade80;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-green-500 {
		--tw-gradient-to: #22c55e;
	}
	.from-purple-400 {
		--tw-gradient-from: #a78bfa;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-purple-500 {
		--tw-gradient-to: #8b5cf6;
	}
	.from-gold-400 {
		--tw-gradient-from: #fbbf24;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-gold-500 {
		--tw-gradient-to: #f59e0b;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.skills-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.skill-category {
			padding: var(--space-6);
		}

		.category-header {
			gap: var(--space-3);
		}

		.category-icon {
			width: 50px;
			height: 50px;
		}

		.skill-item {
			padding: var(--space-3);
		}

		.skill-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-2);
		}

		.skill-level-badge {
			align-self: flex-end;
		}
	}
</style>
