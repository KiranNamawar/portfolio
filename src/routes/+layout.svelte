<script lang="ts">
	import '../app.css';
	import FloatingDock from '$lib/components/ui/FloatingDock.svelte';
	import Background from '$lib/components/ui/Background.svelte';
	import { theme } from '$lib/stores/theme.js';
	import { initializeCodeBlocks } from '$lib/utils/codeBlocks';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isDetailPage = $state(false);

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

<!-- Skip Navigation Links for Accessibility -->
<nav class="skip-links" aria-label="Skip navigation">
	<a href="#main-content" class="skip-link">Skip to main content</a>
	<a href="#navigation" class="skip-link">Skip to navigation</a>
	{#if page.route.id === '/'}
		<a href="#skills" class="skip-link">Skip to skills</a>
		<a href="#projects" class="skip-link">Skip to projects</a>
		<a href="#blog" class="skip-link">Skip to blog</a>
		<a href="#connect" class="skip-link">Skip to contact</a>
	{/if}
</nav>

{#if !isDetailPage}
	<Background variant="subtle" />
{/if}

<main>
	{@render children()}
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
