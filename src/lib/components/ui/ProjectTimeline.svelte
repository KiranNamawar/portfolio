<script lang="ts">
	import { Calendar, CheckCircle, Clock, GitBranch, Code, Zap } from '$lib/utils/icons.js';
	import { formatDate } from '$lib/utils/date.js';
	import { onMount } from 'svelte';

	// Types
	interface Milestone {
		id: string;
		title: string;
		description: string;
		date: string;
		status: 'completed' | 'in-progress' | 'planned';
		category?: 'development' | 'design' | 'testing' | 'deployment' | 'planning';
		details?: string[];
		achievements?: string[];
	}

	// Props
	export let milestones: Milestone[] = [];
	export let layout: 'vertical' | 'horizontal' = 'vertical';
	export let showProgress: boolean = true;
	export let allowExpand: boolean = true;

	// State
	let containerRef: HTMLElement;
	let isVisible = false;
	let expandedItems: Set<string> = new Set();

	// Computed values
	$: completedMilestones = milestones.filter((m) => m.status === 'completed').length;
	$: totalMilestones = milestones.length;
	$: progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

	// Default milestones if none provided (fallback based on common project phases)
	$: defaultMilestones = milestones.length === 0 ? generateDefaultMilestones() : milestones;

	function generateDefaultMilestones(): Milestone[] {
		// This could be enhanced to parse project content or dates
		return [
			{
				id: 'planning',
				title: 'Project Planning',
				description: 'Initial project setup and architecture planning',
				date: '2024-01-01',
				status: 'completed',
				category: 'planning',
				details: ['Requirements gathering', 'Technology selection', 'Project structure design'],
				achievements: ['Architecture defined', 'Tech stack selected']
			},
			{
				id: 'development',
				title: 'Core Development',
				description: 'Main application development and feature implementation',
				date: '2024-02-01',
				status: 'completed',
				category: 'development',
				details: ['Component development', 'API integration', 'Database setup'],
				achievements: ['Core features implemented', 'Backend infrastructure ready']
			},
			{
				id: 'testing',
				title: 'Testing & Optimization',
				description: 'Testing, debugging and performance optimization',
				date: '2024-03-01',
				status: 'completed',
				category: 'testing',
				details: ['Unit testing', 'Integration testing', 'Performance optimization'],
				achievements: ['95+ Lighthouse score', 'All tests passing']
			},
			{
				id: 'deployment',
				title: 'Deployment & Launch',
				description: 'Production deployment and project launch',
				date: '2024-04-01',
				status: 'completed',
				category: 'deployment',
				details: ['Production deployment', 'Domain setup', 'Monitoring setup'],
				achievements: ['Live deployment', 'CDN optimization', 'Monitoring active']
			}
		];
	}

	function toggleExpand(milestoneId: string) {
		if (!allowExpand) return;

		if (expandedItems.has(milestoneId)) {
			expandedItems.delete(milestoneId);
		} else {
			expandedItems.add(milestoneId);
		}
		expandedItems = expandedItems; // Trigger reactivity
	}
	function getCategoryIcon(category: string) {
		const icons: Record<string, any> = {
			planning: Calendar,
			development: Code,
			design: Zap,
			testing: CheckCircle,
			deployment: GitBranch
		};
		return icons[category] || Clock;
	}

	function getCategoryColor(category: string) {
		const colors: Record<string, string> = {
			planning: 'var(--blue-500)',
			development: 'var(--green-500)',
			design: 'var(--purple-500)',
			testing: 'var(--orange-500)',
			deployment: 'var(--red-500)'
		};
		return colors[category] || 'var(--gray-500)';
	}

	function getStatusIcon(status: string) {
		switch (status) {
			case 'completed':
				return CheckCircle;
			case 'in-progress':
				return Clock;
			case 'planned':
				return Calendar;
			default:
				return Clock;
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (containerRef) {
			observer.observe(containerRef);
		}

		return () => observer.disconnect();
	});
</script>

{#if defaultMilestones.length > 0}
	<section
		class="timeline-section"
		class:visible={isVisible}
		class:vertical-layout={layout === 'vertical'}
		class:horizontal-layout={layout === 'horizontal'}
		bind:this={containerRef}
	>
		<div class="timeline-container">
			<header class="section-header">
				<h2 class="section-title">
					<GitBranch size={24} />
					Project Timeline
				</h2>
				<p class="section-subtitle">Development milestones and progress</p>

				{#if showProgress}
					<div class="progress-section">
						<div class="progress-info">
							<span class="progress-text">
								{completedMilestones} of {totalMilestones} milestones completed
							</span>
							<span class="progress-percentage">{Math.round(progressPercentage)}%</span>
						</div>
						<div class="progress-bar">
							<div class="progress-fill" style="width: {progressPercentage}%"></div>
						</div>
					</div>
				{/if}
			</header>

			<div class="timeline-content">
				{#if layout === 'vertical'}
					<div class="timeline-line"></div>
				{/if}

				<div class="milestones-container">
					{#each defaultMilestones as milestone, index}
						{@const StatusIcon = getStatusIcon(milestone.status)}
						{@const CategoryIcon = getCategoryIcon(milestone.category || 'development')}
						{@const isExpanded = expandedItems.has(milestone.id)}

						<div
							class="milestone"
							class:completed={milestone.status === 'completed'}
							class:in-progress={milestone.status === 'in-progress'}
							class:planned={milestone.status === 'planned'}
							class:expanded={isExpanded}
							style="animation-delay: {index * 150}ms"
						>
							<div class="milestone-marker">
								<div class="marker-icon">
									<svelte:component this={StatusIcon} size={16} />
								</div>
								<div class="marker-line"></div>
							</div>

							<div class="milestone-content">
								<div class="milestone-header">
									<div class="milestone-meta">
										<div class="category-badge">
											<svelte:component
												this={CategoryIcon}
												size={14}
												style="color: {getCategoryColor(milestone.category || 'development')}"
											/>
											<span>{milestone.category || 'development'}</span>
										</div>
										<time class="milestone-date">{formatDate(milestone.date)}</time>
									</div>

									<button
										class="milestone-card"
										class:expandable={allowExpand && (milestone.details || milestone.achievements)}
										on:click={() => toggleExpand(milestone.id)}
									>
										<div class="card-header">
											<h4 class="milestone-title">{milestone.title}</h4>
											<div class="status-badge status-{milestone.status}">
												<svelte:component this={StatusIcon} size={12} />
												<span>{milestone.status.replace('-', ' ')}</span>
											</div>
										</div>

										<p class="milestone-description">{milestone.description}</p>

										{#if allowExpand && (milestone.details || milestone.achievements)}
											<div class="expand-hint">
												<span>Click to {isExpanded ? 'collapse' : 'expand'}</span>
											</div>
										{/if}
									</button>
								</div>

								{#if isExpanded && (milestone.details || milestone.achievements)}
									<div class="milestone-details">
										{#if milestone.details && milestone.details.length > 0}
											<div class="details-section">
												<h5 class="details-title">Development Details</h5>
												<ul class="details-list">
													{#each milestone.details as detail}
														<li>{detail}</li>
													{/each}
												</ul>
											</div>
										{/if}

										{#if milestone.achievements && milestone.achievements.length > 0}
											<div class="achievements-section">
												<h5 class="achievements-title">Key Achievements</h5>
												<ul class="achievements-list">
													{#each milestone.achievements as achievement}
														<li>
															<CheckCircle size={14} />
															{achievement}
														</li>
													{/each}
												</ul>
											</div>
										{/if}
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}

<style>
	/* ===== SECTION LAYOUT ===== */
	.timeline-section {
		width: 100%;
		padding: var(--space-12) 0;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.timeline-section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.timeline-container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	/* ===== HEADER ===== */
	.section-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}

	.section-title {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.section-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
	}

	/* ===== PROGRESS SECTION ===== */
	.progress-section {
		max-width: 400px;
		margin: 0 auto;
	}

	.progress-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-2);
		font-size: var(--font-size-sm);
	}

	.progress-text {
		color: var(--color-text-secondary);
	}

	.progress-percentage {
		font-weight: var(--font-weight-semibold);
		color: var(--primary-600);
	}

	.progress-bar {
		height: 8px;
		background: var(--color-surface-secondary);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--primary-500), var(--primary-400));
		border-radius: var(--radius-full);
		transition: width 1s ease-out;
	}

	/* ===== TIMELINE CONTENT ===== */
	.timeline-content {
		position: relative;
	}

	/* Vertical Timeline Line */
	.vertical-layout .timeline-line {
		position: absolute;
		left: 2rem;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(
			to bottom,
			transparent,
			var(--color-border-primary),
			var(--color-border-primary),
			transparent
		);
		z-index: 1;
	}

	/* Horizontal Layout */
	.horizontal-layout .milestones-container {
		display: flex;
		gap: var(--space-6);
		overflow-x: auto;
		padding: var(--space-4) 0;
		scrollbar-width: thin;
		scrollbar-color: var(--color-border-primary) transparent;
	}

	.horizontal-layout .milestone {
		flex-shrink: 0;
		width: 280px;
	}

	/* ===== MILESTONES ===== */
	.milestones-container {
		position: relative;
		z-index: 2;
	}

	.milestone {
		position: relative;
		display: flex;
		margin-bottom: var(--space-8);
		opacity: 0;
		transform: translateX(-20px);
		animation: slideInLeft 0.6s ease forwards;
	}

	.vertical-layout .milestone {
		align-items: flex-start;
	}

	.horizontal-layout .milestone {
		flex-direction: column;
		align-items: center;
	}

	/* ===== MILESTONE MARKER ===== */
	.milestone-marker {
		position: relative;
		z-index: 3;
		margin-right: var(--space-6);
	}

	.horizontal-layout .milestone-marker {
		margin-right: 0;
		margin-bottom: var(--space-4);
	}

	.marker-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--color-surface-primary);
		border: 3px solid var(--color-border-primary);
		transition: all 0.3s ease;
	}

	.milestone.completed .marker-icon {
		background: var(--primary-500);
		border-color: var(--primary-500);
		color: white;
	}

	.milestone.in-progress .marker-icon {
		background: var(--orange-500);
		border-color: var(--orange-500);
		color: white;
		animation: pulse 2s infinite;
	}

	.milestone.planned .marker-icon {
		background: var(--color-surface-secondary);
		border-color: var(--color-border-secondary);
		color: var(--color-text-secondary);
	}

	/* ===== MILESTONE CONTENT ===== */
	.milestone-content {
		flex: 1;
		min-width: 0;
	}

	.milestone-header {
		margin-bottom: var(--space-2);
	}

	.milestone-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-3);
		font-size: var(--font-size-sm);
	}

	.category-badge {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-2);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-medium);
		text-transform: capitalize;
	}

	.milestone-date {
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-medium);
	}

	/* ===== MILESTONE CARD ===== */
	.milestone-card {
		width: 100%;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		text-align: left;
		cursor: default;
	}

	.milestone-card.expandable {
		cursor: pointer;
	}

	.milestone-card:hover {
		transform: translateY(-2px);
		border-color: var(--primary-300);
		box-shadow: 0 8px 20px var(--glass-shadow);
	}

	.card-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: var(--space-3);
	}

	.milestone-title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		margin: 0;
		line-height: 1.3;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
		text-transform: capitalize;
		white-space: nowrap;
		margin-left: var(--space-3);
	}
	.status-completed {
		background: rgba(34, 197, 94, 0.1);
		color: #15803d; /* green-700 equivalent */
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.status-in-progress {
		background: rgba(249, 115, 22, 0.1);
		color: #c2410c; /* orange-700 equivalent */
		border: 1px solid rgba(249, 115, 22, 0.3);
	}

	.status-planned {
		background: rgba(107, 114, 128, 0.1);
		color: #374151; /* gray-700 equivalent */
		border: 1px solid rgba(107, 114, 128, 0.3);
	}

	.milestone-description {
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	.expand-hint {
		margin-top: var(--space-3);
		padding-top: var(--space-3);
		border-top: 1px solid var(--color-border-subtle);
		font-size: var(--font-size-xs);
		color: var(--color-text-tertiary);
		text-align: center;
	}

	/* ===== MILESTONE DETAILS ===== */
	.milestone-details {
		margin-top: var(--space-4);
		padding: var(--space-4);
		background: var(--color-surface-secondary);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border-subtle);
	}

	.details-section,
	.achievements-section {
		margin-bottom: var(--space-4);
	}

	.details-section:last-child,
	.achievements-section:last-child {
		margin-bottom: 0;
	}

	.details-title,
	.achievements-title {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		margin: 0 0 var(--space-2) 0;
	}

	.details-list,
	.achievements-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.details-list li {
		padding: var(--space-1) 0;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		border-left: 2px solid var(--primary-300);
		padding-left: var(--space-3);
		margin-bottom: var(--space-1);
	}

	.achievements-list li {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) 0;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}

	.achievements-list li :global(svg) {
		color: var(--green-600);
		flex-shrink: 0;
	}

	/* ===== ANIMATIONS ===== */
	@keyframes slideInLeft {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4);
		}
		50% {
			transform: scale(1.1);
			box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
		}
	}

	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		.timeline-container {
			padding: 0 var(--space-4);
		}

		.section-title {
			font-size: var(--font-size-xl);
			flex-direction: column;
			gap: var(--space-2);
		}

		/* Adjust timeline for mobile */
		.vertical-layout .timeline-line {
			left: 1.25rem;
		}

		.milestone-marker {
			margin-right: var(--space-4);
		}

		.marker-icon {
			width: 32px;
			height: 32px;
		}

		.milestone-card {
			padding: var(--space-4);
		}

		.card-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-2);
		}

		.status-badge {
			margin-left: 0;
		}

		.milestone-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-2);
		}

		/* Horizontal layout becomes vertical on mobile */
		.horizontal-layout .milestones-container {
			flex-direction: column;
		}

		.horizontal-layout .milestone {
			width: 100%;
			flex-direction: row;
		}

		.horizontal-layout .milestone-marker {
			margin-right: var(--space-4);
			margin-bottom: 0;
		}
	}

	/* ===== ACCESSIBILITY ===== */
	@media (prefers-reduced-motion: reduce) {
		.timeline-section,
		.milestone,
		.milestone-card,
		.marker-icon {
			animation: none;
			transition: none;
		}

		.timeline-section {
			opacity: 1;
			transform: none;
		}

		.milestone {
			opacity: 1;
			transform: none;
		}
	}
	/* ===== DARK MODE ADJUSTMENTS ===== */
	:global(.dark) .status-completed {
		background: rgba(34, 197, 94, 0.2);
		color: #4ade80; /* green-400 equivalent */
	}

	:global(.dark) .status-in-progress {
		background: rgba(249, 115, 22, 0.2);
		color: #fb923c; /* orange-400 equivalent */
	}

	:global(.dark) .status-planned {
		background: rgba(107, 114, 128, 0.2);
		color: #9ca3af; /* gray-400 equivalent */
	}
</style>
