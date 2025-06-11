<script lang="ts">
	import { AlertTriangle, Info, CheckCircle, XCircle } from '$lib/utils/icons.js';

	export let type: 'info' | 'warning' | 'success' | 'error' = 'info';
	export let title: string | undefined = undefined;

	const icons = {
		info: Info,
		warning: AlertTriangle,
		success: CheckCircle,
		error: XCircle
	};

	const styles = {
		info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
		warning:
			'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
		success:
			'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
		error:
			'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
	};
</script>

<div class="callout {styles[type]}">
	<div class="callout-header">
		<svelte:component this={icons[type]} size={20} />
		{#if title}
			<h4 class="callout-title">{title}</h4>
		{/if}
	</div>
	<div class="callout-content">
		<slot />
	</div>
</div>

<style>
	.callout {
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		border: 1px solid;
		margin: var(--space-4) 0;
		backdrop-filter: blur(10px);
	}

	.callout-header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.callout-title {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
	}

	.callout-content {
		line-height: var(--line-height-relaxed);
	}

	.callout-content :global(p:last-child) {
		margin-bottom: 0;
	}
</style>
