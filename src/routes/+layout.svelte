<script lang="ts">
	import '../app.css';
	import FloatingDock from '$lib/components/FloatingDock.svelte';
</script>

<main>
	<slot />
</main>

<FloatingDock />

<style>
	main {
		min-height: 100vh;
		padding: var(--space-6);
		padding-bottom: calc(var(--space-20) + var(--space-6)); /* Space for floating dock */
	}

	@media (max-width: 768px) {
		main {
			padding-bottom: calc(var(--space-16) + var(--space-4)); /* Space for mobile dock */
		}
	}
</style>
