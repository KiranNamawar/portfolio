<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// Props
	export let showAfter = 100; // Show progress after scrolling this many pixels
	export let hideOnComplete = false; // Hide progress bar when reading is complete
	export let smoothness = 200; // How smooth the animation is (lower = smoother)

	// State
	let scrollY = 0;
	let innerHeight = 0;
	let mounted = false;
	let progressValue = 0;

	// Animated progress value
	const progress = tweened(0, {
		duration: smoothness,
		easing: cubicOut
	});

	// Calculate progress percentage
	$: if (mounted) {
		// Try to find the content article
		const articleElement = document.querySelector('article.content-detail');

		if (articleElement) {
			const htmlElement = articleElement as HTMLElement;
			const articleTop = htmlElement.offsetTop;
			const articleHeight = htmlElement.offsetHeight;
			const windowHeight = innerHeight;

			// Calculate how much of the article has been scrolled through
			const scrollStart = Math.max(0, articleTop - windowHeight * 0.2); // Start when article is 20% visible
			const scrollEnd = articleTop + articleHeight - windowHeight * 0.8; // End when 80% through

			if (scrollEnd > scrollStart) {
				const scrollProgress = Math.max(
					0,
					Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart))
				);

				progressValue = scrollProgress * 100;
				progress.set(progressValue);
			}
		} else {
			// Fallback: calculate based on document height
			const documentHeight = document.documentElement.scrollHeight - innerHeight;
			if (documentHeight > 0) {
				progressValue = (scrollY / documentHeight) * 100;
				progress.set(progressValue);
			}
		}
	}

	// Show/hide logic
	$: isVisible = mounted && scrollY > showAfter && (!hideOnComplete || $progress < 100);
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if isVisible}
	<div
		class="reading-progress"
		role="progressbar"
		aria-valuenow={Math.round($progress)}
		aria-valuemin="0"
		aria-valuemax="100"
		aria-label="Reading progress"
	>
		<div class="reading-progress-bar" style="width: {$progress}%"></div>

		<!-- Optional percentage display -->
		<div class="reading-progress-text">
			{Math.round($progress)}%
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
		background: rgba(0, 0, 0, 0.1);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border-bottom: 1px solid var(--glass-border);
		z-index: var(--z-sticky);
		box-shadow: 0 2px 12px var(--glass-shadow);
		animation: slideDown 0.3s ease-out;
	}
	.reading-progress-bar {
		height: 100%;
		background: linear-gradient(
			90deg,
			var(--primary-200),
			var(--primary-400),
			var(--primary-600),
			var(--primary-800)
		);
		border-radius: 0;
		transition: width 0.1s ease-out;
		position: relative;
		box-shadow: 0 1px 3px rgba(249, 115, 22, 0.3);
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
	} /* Dark mode adjustments */
	:global([data-theme='dark']) .reading-progress {
		background: rgba(255, 255, 255, 0.1);
	}

	:global([data-theme='dark']) .reading-progress-bar {
		background: linear-gradient(90deg, var(--primary-400), var(--primary-500));
		box-shadow: 0 1px 3px rgba(14, 165, 233, 0.4);
	}

	/* Light mode adjustments */
	:global([data-theme='light']) .reading-progress {
		background: rgba(0, 0, 0, 0.05);
	}

	:global([data-theme='light']) .reading-progress-bar {
		background: linear-gradient(90deg, var(--primary-600), var(--primary-700));
		box-shadow: 0 1px 3px rgba(249, 115, 22, 0.4);
	}
	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.reading-progress,
		.reading-progress-bar,
		.reading-progress-text {
			animation: none;
			transition: none;
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
