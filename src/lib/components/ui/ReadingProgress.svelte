<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// Props
	export let showAfter = 100; // Show progress after scrolling this many pixels
	export let hideOnComplete = false; // Hide progress bar when reading is complete
	export let smoothness = 100; // How smooth the animation is (lower = smoother)

	// State
	let scrollY = 0;
	let innerHeight = 0;
	let document: Document;
	let mounted = false;

	// Animated progress value
	const progress = new Tween(0, {
		duration: smoothness,
		easing: cubicOut
	}); // Calculate progress percentage
	$: if (mounted && document) {
		// Try to find either blog post or project detail article
		const articleElement =
			document.querySelector('article.blog-post') ||
			document.querySelector('article.project-detail');

		if (articleElement) {
			const htmlElement = articleElement as HTMLElement;
			const articleTop = htmlElement.offsetTop;
			const articleHeight = htmlElement.offsetHeight;
			const windowHeight = innerHeight;

			// Calculate how much of the article has been scrolled through
			const scrollStart = articleTop - windowHeight * 0.1; // Start when article is 10% visible
			const scrollEnd = articleTop + articleHeight - windowHeight * 0.9; // End when 90% through

			const scrollProgress = Math.max(
				0,
				Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart))
			);

			// Update animated progress
			progress.set(scrollProgress * 100);
		}
	}
	// Show/hide logic
	$: isVisible = mounted && scrollY > showAfter && (!hideOnComplete || progress.current < 100);

	onMount(() => {
		mounted = true;
		document = window.document;
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if isVisible}
	<div
		class="reading-progress"
		role="progressbar"
		aria-valuenow={Math.round(progress.current)}
		aria-valuemin="0"
		aria-valuemax="100"
		aria-label="Reading progress"
	>
		<div class="reading-progress-bar" style="width: {progress.current}%"></div>

		<!-- Optional percentage display -->
		<div class="reading-progress-text">
			{Math.round(progress.current)}%
		</div>
	</div>
{/if}

<style>
	.reading-progress {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border-bottom: 1px solid var(--glass-border);
		z-index: var(--z-sticky);
		box-shadow: 0 2px 12px var(--glass-shadow);
		animation: slideDown 0.3s ease-out;
	}

	.reading-progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--primary-500), var(--primary-600), var(--accent-500));
		border-radius: 0;
		transition: width 0.1s ease-out;
		position: relative;
		overflow: hidden;
	}

	.reading-progress-bar::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: shimmer 2s infinite;
	}

	.reading-progress-text {
		position: absolute;
		top: 8px;
		right: var(--space-4);
		font-size: var(--font-size-xs);
		font-weight: 600;
		color: var(--color-text-secondary);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		padding: var(--space-1) var(--space-2);
		box-shadow: 0 2px 8px var(--glass-shadow);
		opacity: 0;
		animation: fadeInUp 0.3s ease-out 0.5s forwards;
	}

	/* Animations */
	@keyframes slideDown {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.reading-progress {
			height: 3px;
		}

		.reading-progress-text {
			top: 6px;
			right: var(--space-2);
			font-size: var(--font-size-2xs);
			padding: 2px var(--space-1);
		}
	}

	/* Dark mode adjustments */
	:global([data-theme='dark']) .reading-progress-bar {
		background: linear-gradient(90deg, var(--primary-400), var(--primary-500), var(--accent-400));
	}

	/* Light mode adjustments */
	:global([data-theme='light']) .reading-progress-bar {
		background: linear-gradient(90deg, var(--primary-600), var(--primary-700), var(--accent-600));
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.reading-progress,
		.reading-progress-bar,
		.reading-progress-text {
			animation: none;
			transition: none;
		}

		.reading-progress-bar::after {
			animation: none;
		}
	}

	/* High contrast mode */
	@media (prefers-contrast: high) {
		.reading-progress {
			border-bottom: 2px solid var(--color-border);
		}

		.reading-progress-bar {
			background: var(--color-text-primary);
		}
	}
</style>
