<script lang="ts">
	import { ChevronDown, ChevronUp } from '$lib/utils/icons.js';
	export let type: 'start' | 'end' = 'start';
	export let animated: boolean = true;
</script>

<div class="content-divider {type}" class:animated>
	<div class="divider-line">
		<div class="line-segment"></div>
		<div class="divider-icon">
			{#if type === 'start'}
				<ChevronDown size={16} class="chevron" />
			{:else}
				<ChevronUp size={16} class="chevron" />
			{/if}
		</div>
		<div class="line-segment"></div>
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
		padding: var(--space-6) 0 var(--space-8) 0;
	}

	.content-divider.end {
		padding: var(--space-8) 0 var(--space-6) 0;
	}

	.divider-line {
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 500px;
		gap: var(--space-4);
	}
	.line-segment {
		flex: 1;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--primary-300) 15%,
			var(--primary-500) 50%,
			var(--primary-300) 85%,
			transparent 100%
		);
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-full);
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
			rgba(255, 255, 255, 0.5) 50%,
			transparent 100%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.animated .line-segment::before {
		animation: shimmer 2.5s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			left: -100%;
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			left: 100%;
			opacity: 0;
		}
	}
	.divider-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: var(--color-bg-primary);
		border: 2px solid var(--primary-500);
		border-radius: var(--radius-full);
		box-shadow:
			0 0 0 3px var(--color-bg-primary),
			0 3px 12px rgba(var(--primary-500-rgb, 249, 115, 22), 0.25);
		transition: all 0.3s ease;
	}

	.chevron {
		color: var(--primary-500);
		transition: all 0.3s ease;
	}

	.animated .divider-icon {
		animation: gentle-pulse 3s ease-in-out infinite;
	}
	@keyframes gentle-pulse {
		0%,
		100% {
			transform: scale(1);
			box-shadow:
				0 0 0 3px var(--color-bg-primary),
				0 3px 12px rgba(var(--primary-500-rgb, 249, 115, 22), 0.25);
		}
		50% {
			transform: scale(1.08);
			box-shadow:
				0 0 0 3px var(--color-bg-primary),
				0 6px 20px rgba(var(--primary-500-rgb, 249, 115, 22), 0.4);
		}
	}
	/* Dark mode adjustments */
	[data-theme='dark'] .line-segment {
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--primary-500) 15%,
			var(--primary-400) 50%,
			var(--primary-500) 85%,
			transparent 100%
		);
	}

	[data-theme='dark'] .divider-icon {
		border-color: var(--primary-400);
		box-shadow:
			0 0 0 3px var(--color-bg-primary),
			0 3px 12px rgba(var(--primary-400-rgb, 251, 191, 36), 0.3);
	}

	[data-theme='dark'] .animated .divider-icon {
		animation: gentle-pulse-dark 3s ease-in-out infinite;
	}

	@keyframes gentle-pulse-dark {
		0%,
		100% {
			transform: scale(1);
			box-shadow:
				0 0 0 3px var(--color-bg-primary),
				0 3px 12px rgba(var(--primary-400-rgb, 251, 191, 36), 0.3);
		}
		50% {
			transform: scale(1.08);
			box-shadow:
				0 0 0 3px var(--color-bg-primary),
				0 6px 20px rgba(var(--primary-400-rgb, 251, 191, 36), 0.5);
		}
	}

	[data-theme='dark'] .chevron {
		color: var(--primary-400);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.content-divider.start {
			padding: var(--space-4) 0 var(--space-6) 0;
		}

		.content-divider.end {
			padding: var(--space-6) 0 var(--space-4) 0;
		}

		.divider-line {
			max-width: 400px;
		}
		.divider-icon {
			width: 32px;
			height: 32px;
		}

		.chevron {
			width: 14px;
			height: 14px;
		}
	}
</style>
