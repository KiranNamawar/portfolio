<script lang="ts">
	import '../app.css';
	import FloatingDock from '$lib/components/ui/FloatingDock.svelte';
	import Background from '$lib/components/ui/Background.svelte';
	import { theme } from '$lib/stores/theme.js';
	import { initializeCodeBlocks } from '$lib/utils/codeBlocks';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let isDetailPage = $state(false);
	let backgroundVariant: 'default' | 'subtle' | 'vibrant' = 'default';
	// Use $effect to reactively check when page changes
	$effect(() => {
		isDetailPage = page.route.id === '/blog/[slug]' || page.route.id === '/projects/[slug]';
	});

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

{#if !isDetailPage}
	<Background variant={backgroundVariant} />
{/if}

<main>
	<slot />
</main>

<FloatingDock />

<style>
	main {
		min-height: 100vh;
		padding: var(--space-6);
		padding-bottom: calc(var(--space-16) + var(--space-6)); /* Space for floating dock */
	}

	@media (max-width: 768px) {
		main {
			padding: var(--space-4);
			padding-bottom: calc(var(--space-12) + var(--space-4)); /* Space for mobile dock */
		}
	}
</style>
