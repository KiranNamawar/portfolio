<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { theme } from '$lib/stores/theme';

	// Component props
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	// Handle theme toggle
	function handleToggle() {
		theme.toggle();

		// Provide haptic feedback on mobile devices
		if ('vibrate' in navigator) {
			navigator.vibrate(50);
		}
	}
</script>

<button
	class="theme-toggle {className}"
	onclick={handleToggle}
	aria-label="Toggle theme"
	title={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
>
	{#if $theme === 'light'}
		<Moon size={20} />
	{:else}
		<Sun size={20} />
	{/if}
	<span class="theme-label">Theme</span>
</button>

<style>
	.theme-toggle {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2);
		width: 40px;
		height: 40px;
		border: none;
		background: transparent;
		color: var(--color-text-secondary);
		border-radius: var(--radius-md);
		cursor: pointer;
		outline: none;
		transition: all var(--transition-fast);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--primary-500);
		outline-offset: 2px;
	}
	.theme-toggle:hover {
		color: var(--color-text-primary);
		transform: translateY(-2px);
	}

	.theme-label {
		font-size: var(--font-size-2xs);
		margin-top: var(--space-px);
		font-weight: 500;
		opacity: 0.8;
		display: none; /* Hidden on desktop */
	}

	/* Responsive adjustments for mobile */
	@media (max-width: 768px) {
		.theme-toggle {
			flex-direction: column;
			min-width: 44px;
			height: auto;
			padding: var(--space-1);
		}

		.theme-label {
			display: block; /* Show on mobile */
		}
	}

	/* Enhanced hover effects for desktop */
	@media (hover: hover) {
		.theme-toggle:hover {
			transform: translateY(-4px) scale(1.05);
		}
	} /* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.theme-toggle {
			transition: none;
		}

		.theme-toggle:hover {
			transform: none;
		}
	}
</style>
