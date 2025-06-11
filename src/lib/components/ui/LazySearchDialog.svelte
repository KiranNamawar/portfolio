<!-- Lazy-loaded SearchDialog component -->
<script lang="ts">
	import { onMount } from 'svelte';

	export let isOpen = false;
	export let onclose: (() => void) | undefined = undefined;

	let SearchDialogComponent: any = null;
	let mounted = false;

	onMount(async () => {
		mounted = true;
		// Only load the SearchDialog when actually needed
		if (isOpen && !SearchDialogComponent) {
			const module = await import('./SearchDialog.svelte');
			SearchDialogComponent = module.default;
		}
	});

	// Lazy load on first open
	$: if (isOpen && mounted && !SearchDialogComponent) {
		import('./SearchDialog.svelte').then((module) => {
			SearchDialogComponent = module.default;
		});
	}
</script>

{#if isOpen && SearchDialogComponent}
	<svelte:component this={SearchDialogComponent} bind:isOpen {onclose} />
{/if}
