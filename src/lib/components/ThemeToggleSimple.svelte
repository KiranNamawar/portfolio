<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { theme } from '$lib/stores/theme';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	// Component props
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		variant?: 'default' | 'floating' | 'minimal';
		class?: string;
	}

	let { size = 'md', variant = 'default', class: className = '' }: Props = $props();

	// Initialize theme on mount
	onMount(() => {
		theme.init();
	});

	// Reactive variables for styling
	const sizeClasses = {
		sm: 'h-8 w-8 text-sm',
		md: 'h-10 w-10 text-base',
		lg: 'h-12 w-12 text-lg'
	};

	const variantClasses = {
		default: 'glass-button',
		floating: 'glass-button shadow-lg',
		minimal: 'hover:bg-opacity-10 hover:bg-gray-500 rounded-lg transition-all duration-200'
	};

	// Handle theme toggle
	function handleToggle() {
		theme.toggle();
		
		// Provide haptic feedback on mobile devices
		if ('vibrate' in navigator) {
			navigator.vibrate(50);
		}
	}

	// Icon size based on button size
	const iconSize = {
		sm: 16,
		md: 20,
		lg: 24
	};
</script>

<button
	class="theme-toggle-simple {sizeClasses[size]} {variantClasses[variant]} {className}"
	onclick={handleToggle}
	aria-label="Toggle theme"
	title={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
>
	<div class="icon-container">
		{#if $theme === 'light'}
			<div
				class="icon"
				in:fly={{ x: 20, duration: 300, easing: cubicInOut }}
				out:fly={{ x: -20, duration: 200, easing: cubicInOut }}
			>
				<Moon size={iconSize[size]} />
			</div>
		{:else}
			<div
				class="icon"
				in:fly={{ x: -20, duration: 300, easing: cubicInOut }}
				out:fly={{ x: 20, duration: 200, easing: cubicInOut }}
			>
				<Sun size={iconSize[size]} />
			</div>
		{/if}
	</div>
</button>

<style>
	.theme-toggle-simple {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: var(--glass-bg);
		color: var(--color-text-primary);
		cursor: pointer;
		transition: all var(--transition-normal);
		outline: none;
		overflow: hidden;
	}

	.theme-toggle-simple:focus-visible {
		outline: 2px solid var(--primary-500);
		outline-offset: 2px;
	}

	.theme-toggle-simple:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-1px);
		box-shadow: 0 8px 25px var(--glass-shadow);
	}

	.theme-toggle-simple:active {
		transform: scale(0.98);
		transition: transform 100ms ease-out;
	}

	.icon-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.icon {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.theme-toggle-simple:hover {
			transform: none;
			background: var(--glass-bg);
		}
		
		.theme-toggle-simple:active {
			transform: scale(0.95);
		}
	}

	/* Reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.theme-toggle-simple {
			transition: none;
		}
		
		.theme-toggle-simple:hover {
			transform: none;
		}
	}

	/* Dark theme adjustments */
	:global([data-theme="dark"]) .theme-toggle-simple:hover {
		background: rgba(255, 255, 255, 0.1);
	}
</style>
