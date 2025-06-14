<script lang="ts">
	import { ChevronDown, ChevronUp } from '$lib/utils/icons.js';
	export let type: 'start' | 'end' = 'start';
	export let animated: boolean = true;
</script>

<div class="content-divider {type}" class:animated>
	<div class="divider-line">
		<!-- Left side of the line -->
		<div class="line-segment left"></div>

		<!-- Center chevron -->
		<div class="chevron-container">
			{#if type === 'start'}
				<ChevronDown size={20} class="chevron" />
			{:else}
				<ChevronUp size={20} class="chevron" />
			{/if}
		</div>

		<!-- Right side of the line -->
		<div class="line-segment right"></div>
	</div>
</div>

<style>
	.content-divider {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.content-divider.start {
		padding: var(--space-4) 0 var(--space-8) 0;
	}

	.content-divider.end {
		padding: var(--space-8) 0 var(--space-4) 0;
	}

	.divider-line {
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 600px;
		position: relative;
	}

	.line-segment {
		flex: 1;
		height: 2px;
		border-radius: var(--radius-full);
		position: relative;
		overflow: hidden;
	}

	.line-segment.left {
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--primary-200) 30%,
			var(--primary-400) 70%,
			var(--primary-500) 100%
		);
	}

	.line-segment.right {
		background: linear-gradient(
			90deg,
			var(--primary-500) 0%,
			var(--primary-400) 30%,
			var(--primary-200) 70%,
			transparent 100%
		);
	}

	.line-segment::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.6) 50%,
			transparent 100%
		);
		border-radius: var(--radius-full);
	}

	.animated .line-segment::before {
		animation: shimmer 3s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	.chevron-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--color-bg-primary);
		border: 2px solid var(--primary-500);
		border-radius: var(--radius-full);
		position: relative;
		z-index: 2;
		box-shadow:
			0 0 0 4px var(--color-bg-primary),
			0 2px 8px rgba(var(--primary-500-rgb), 0.3);
		transition: all 0.3s ease;
	}

	.chevron {
		color: var(--primary-500);
		transition: all 0.3s ease;
	}

	.animated .chevron {
		animation: float 2s ease-in-out infinite;
	}

	.animated .chevron-container:hover .chevron {
		color: var(--primary-600);
		transform: scale(1.1);
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-2px);
		}
	}

	/* Pulsing glow effect */
	.animated .chevron-container {
		animation: pulse-glow 3s ease-in-out infinite;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow:
				0 0 0 4px var(--color-bg-primary),
				0 2px 8px rgba(var(--primary-500-rgb), 0.3);
		}
		50% {
			box-shadow:
				0 0 0 4px var(--color-bg-primary),
				0 4px 20px rgba(var(--primary-500-rgb), 0.5),
				0 0 30px rgba(var(--primary-500-rgb), 0.2);
		}
	}

	/* Dark mode adjustments */
	:global(.dark) .line-segment.left {
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--primary-800) 30%,
			var(--primary-600) 70%,
			var(--primary-500) 100%
		);
	}

	:global(.dark) .line-segment.right {
		background: linear-gradient(
			90deg,
			var(--primary-500) 0%,
			var(--primary-600) 30%,
			var(--primary-800) 70%,
			transparent 100%
		);
	}

	:global(.dark) .chevron-container {
		border-color: var(--primary-400);
		box-shadow:
			0 0 0 4px var(--color-bg-primary),
			0 2px 8px rgba(var(--primary-400-rgb), 0.4);
	}

	:global(.dark) .animated .chevron-container {
		animation: pulse-glow-dark 3s ease-in-out infinite;
	}

	@keyframes pulse-glow-dark {
		0%,
		100% {
			box-shadow:
				0 0 0 4px var(--color-bg-primary),
				0 2px 8px rgba(var(--primary-400-rgb), 0.4);
		}
		50% {
			box-shadow:
				0 0 0 4px var(--color-bg-primary),
				0 4px 20px rgba(var(--primary-400-rgb), 0.6),
				0 0 30px rgba(var(--primary-500-rgb), 0.3);
		}
	}

	:global(.dark) .chevron {
		color: var(--primary-400);
	}

	:global(.dark) .animated .chevron-container:hover .chevron {
		color: var(--primary-300);
	}
	/* Responsive design */
	@media (max-width: 768px) {
		.content-divider.start {
			padding: var(--space-3) 0 var(--space-6) 0;
		}

		.content-divider.end {
			padding: var(--space-6) 0 var(--space-3) 0;
		}

		.divider-line {
			max-width: 400px;
		}

		.chevron-container {
			width: 32px;
			height: 32px;
		}

		.chevron {
			width: 16px;
			height: 16px;
		}
	}

	@media (max-width: 480px) {
		.content-divider.start {
			padding: var(--space-2) 0 var(--space-4) 0;
		}

		.content-divider.end {
			padding: var(--space-4) 0 var(--space-2) 0;
		}

		.divider-line {
			max-width: 300px;
		}

		.chevron-container {
			width: 28px;
			height: 28px;
		}

		.chevron {
			width: 14px;
			height: 14px;
		}
	}
</style>
