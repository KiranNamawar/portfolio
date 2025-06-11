<script lang="ts">
	import '../app.css';
	import FloatingDock from '$lib/components/ui/FloatingDock.svelte';
	import { theme } from '$lib/stores/theme.js';
	import { initializeCodeBlocks } from '$lib/utils/codeBlocks';
	import { onMount } from 'svelte';

	onMount(() => {
		theme.init();
		initializeCodeBlocks();
	});
</script>

<svelte:head>
	<!-- Devicon for technology icons -->
	<link
		rel="stylesheet"
		type="text/css"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
</svelte:head>

<main>
	<slot />
</main>

<FloatingDock />

<style>
	main {
		min-height: 100vh;
		padding-bottom: calc(var(--space-20) + var(--space-6)); /* Space for floating dock */
	}

	/* Add padding for non-home pages */
	main:not(:has(.hero-section)) {
		padding: var(--space-6);
	}

	@media (max-width: 768px) {
		main {
			padding-bottom: calc(var(--space-16) + var(--space-4)); /* Space for mobile dock */
		}

		main:not(:has(.hero-section)) {
			padding: var(--space-4);
		}
	}
</style>
