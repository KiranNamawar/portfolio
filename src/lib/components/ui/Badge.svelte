<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?:
			| 'demo'
			| 'prototype'
			| 'example'
			| 'template'
			| 'tutorial'
			| 'guide'
			| 'featured'
			| 'default'
			| string;
		size?: 'sm' | 'md' | 'lg';
		text?: string;
		children?: Snippet;
	}

	let { variant = 'default', size = 'md', text, children }: Props = $props();

	// Map variants to their display properties
	const variantConfig = {
		demo: { label: 'Demo', icon: '🚧' },
		prototype: { label: 'Prototype', icon: '⚡' },
		example: { label: 'Example', icon: '📝' },
		template: { label: 'Template', icon: '📋' },
		tutorial: { label: 'Tutorial', icon: '📚' },
		guide: { label: 'Guide', icon: '🧭' },
		featured: { label: 'Featured', icon: '⭐' },
		default: { label: '', icon: '' }
	} as const;

	const config = $derived(
		variantConfig[variant as keyof typeof variantConfig] || variantConfig.default
	);
	const safeVariant = $derived(variant in variantConfig ? variant : 'default');
	const displayText = $derived(text || config.label);
</script>

<span class="badge badge-{safeVariant} badge-{size}" role="status" aria-label={displayText}>
	{#if config.icon}
		<span class="badge-icon" aria-hidden="true">{config.icon}</span>
	{/if}
	<span class="badge-text">
		{#if children}
			{@render children()}
		{:else}
			{displayText}
		{/if}
	</span>
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: 500;
		line-height: 1;
		backdrop-filter: blur(10px);
		border: 1px solid;
		transition: all 0.2s ease;
		position: relative;
		overflow: hidden;
	}

	/* Size variants */
	.badge-sm {
		padding: var(--space-1) var(--space-3);
		font-size: var(--font-size-2xs);
		gap: 2px;
	}

	.badge-md {
		padding: var(--space-1) var(--space-2);
		font-size: var(--font-size-xs);
	}

	.badge-lg {
		padding: var(--space-3) var(--space-4);
		font-size: var(--font-size-sm);
		gap: var(--space-1);
	}

	/* Color variants */
	.badge-demo {
		background: rgba(251, 191, 36, 0.15);
		border-color: rgba(251, 191, 36, 0.3);
		color: rgb(245, 158, 11);
	}

	.badge-prototype {
		background: rgba(139, 92, 246, 0.15);
		border-color: rgba(139, 92, 246, 0.3);
		color: rgb(124, 58, 237);
	}

	.badge-example {
		background: rgba(34, 197, 94, 0.15);
		border-color: rgba(34, 197, 94, 0.3);
		color: rgb(22, 163, 74);
	}

	.badge-template {
		background: rgba(59, 130, 246, 0.15);
		border-color: rgba(59, 130, 246, 0.3);
		color: rgb(37, 99, 235);
	}

	.badge-tutorial {
		background: rgba(236, 72, 153, 0.15);
		border-color: rgba(236, 72, 153, 0.3);
		color: rgb(219, 39, 119);
	}

	.badge-guide {
		background: rgba(6, 182, 212, 0.15);
		border-color: rgba(6, 182, 212, 0.3);
		color: rgb(8, 145, 178);
	}

	.badge-featured {
		background: rgba(251, 191, 36, 0.15);
		border-color: rgba(251, 191, 36, 0.3);
		color: rgb(245, 158, 11);
	}

	.badge-default {
		background: rgba(107, 114, 128, 0.15);
		border-color: rgba(107, 114, 128, 0.3);
		color: rgb(75, 85, 99);
	}

	/* Dark mode adjustments */
	:global(.dark) .badge-demo {
		background: rgba(251, 191, 36, 0.2);
		border-color: rgba(251, 191, 36, 0.4);
		color: rgb(252, 211, 77);
	}

	:global(.dark) .badge-prototype {
		background: rgba(139, 92, 246, 0.2);
		border-color: rgba(139, 92, 246, 0.4);
		color: rgb(167, 139, 250);
	}

	:global(.dark) .badge-example {
		background: rgba(34, 197, 94, 0.2);
		border-color: rgba(34, 197, 94, 0.4);
		color: rgb(74, 222, 128);
	}

	:global(.dark) .badge-template {
		background: rgba(59, 130, 246, 0.2);
		border-color: rgba(59, 130, 246, 0.4);
		color: rgb(96, 165, 250);
	}

	:global(.dark) .badge-tutorial {
		background: rgba(236, 72, 153, 0.2);
		border-color: rgba(236, 72, 153, 0.4);
		color: rgb(244, 114, 182);
	}

	:global(.dark) .badge-guide {
		background: rgba(6, 182, 212, 0.2);
		border-color: rgba(6, 182, 212, 0.4);
		color: rgb(34, 211, 238);
	}

	:global(.dark) .badge-featured {
		background: rgba(251, 191, 36, 0.2);
		border-color: rgba(251, 191, 36, 0.4);
		color: rgb(252, 211, 77);
	}

	:global(.dark) .badge-default {
		background: rgba(156, 163, 175, 0.2);
		border-color: rgba(156, 163, 175, 0.4);
		color: rgb(209, 213, 219);
	}

	.badge-icon {
		font-size: 0.75em;
	}

	.badge-text {
		font-weight: inherit;
	}

	/* Hover effects for interactive badges */
	.badge:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	:global(.dark) .badge:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}
</style>
