<script lang="ts">
	import { onMount } from 'svelte';
	import { Copy, Check } from '$lib/utils/icons.js';

	export let src: string;
	export let alt: string = '';
	export let caption: string = '';
	export let zoomable: boolean = true;
	export let lazy: boolean = true;
	export let width: string | number = 'auto';
	export let height: string | number = 'auto';

	let imageElement: HTMLImageElement;
	let isLoaded = false;
	let isError = false;
	let isZoomed = false;
	let copied = false;

	onMount(() => {
		if (imageElement && lazy) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							imageElement.src = src;
							observer.unobserve(imageElement);
						}
					});
				},
				{ threshold: 0.1 }
			);
			observer.observe(imageElement);
		}
	});

	function handleLoad() {
		isLoaded = true;
	}

	function handleError() {
		isError = true;
	}

	function toggleZoom() {
		if (zoomable) {
			isZoomed = !isZoomed;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isZoomed) {
			isZoomed = false;
		}
	}

	async function copyImageUrl() {
		try {
			await navigator.clipboard.writeText(src);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy image URL:', err);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<figure class="enhanced-image" class:zoomable>
	<div class="image-container">
		{#if lazy}
			<img
				bind:this={imageElement}
				{alt}
				style="width: {typeof width === 'number' ? width + 'px' : width}; height: {typeof height ===
				'number'
					? height + 'px'
					: height};"
				class:loaded={isLoaded}
				class:error={isError}
				on:load={handleLoad}
				on:error={handleError}
				on:click={toggleZoom}
				loading="lazy"
			/>
		{:else}
			<img
				{src}
				{alt}
				style="width: {typeof width === 'number' ? width + 'px' : width}; height: {typeof height ===
				'number'
					? height + 'px'
					: height};"
				class:loaded={isLoaded}
				class:error={isError}
				on:load={handleLoad}
				on:error={handleError}
				on:click={toggleZoom}
			/>
		{/if}

		<!-- Loading placeholder -->
		{#if !isLoaded && !isError}
			<div class="image-placeholder">
				<div class="loading-spinner"></div>
			</div>
		{/if}

		<!-- Error state -->
		{#if isError}
			<div class="image-error">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
					<circle cx="8.5" cy="8.5" r="1.5" />
					<polyline points="21,15 16,10 5,21" />
				</svg>
				<p>Failed to load image</p>
			</div>
		{/if}

		<!-- Image actions overlay -->
		{#if isLoaded && !isError}
			<div class="image-actions">
				<button
					class="action-btn copy-btn"
					on:click|stopPropagation={copyImageUrl}
					title="Copy image URL"
				>
					{#if copied}
						<Check size={16} />
					{:else}
						<Copy size={16} />
					{/if}
				</button>
				{#if zoomable}
					<button class="action-btn zoom-btn" on:click={toggleZoom} title="Click to zoom">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.35-4.35" />
							<path d="M11 8v6" />
							<path d="M8 11h6" />
						</svg>
					</button>
				{/if}
			</div>
		{/if}
	</div>

	{#if caption}
		<figcaption class="image-caption">{caption}</figcaption>
	{/if}
</figure>

<!-- Zoom modal -->
{#if isZoomed}
	<div class="zoom-modal" on:click={toggleZoom}>
		<div class="zoom-container">
			<img {src} {alt} class="zoomed-image" />
			<button class="close-btn" on:click={toggleZoom} title="Close (Esc)">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	.enhanced-image {
		margin: 2em 0;
		max-width: 100%;
	}

	.image-container {
		position: relative;
		display: inline-block;
		max-width: 100%;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--color-surface-secondary);
		border: 1px solid var(--color-border-primary);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.image-container:hover {
		box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.15);
		transform: translateY(-2px);
	}

	.zoomable .image-container {
		cursor: zoom-in;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	img.loaded {
		opacity: 1;
	}

	img.error {
		display: none;
	}

	.image-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface-secondary);
		min-height: 200px;
	}

	.loading-spinner {
		width: 32px;
		height: 32px;
		border: 3px solid var(--color-border-primary);
		border-top: 3px solid var(--primary-500);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.image-error {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--color-surface-secondary);
		color: var(--color-text-tertiary);
		min-height: 200px;
		gap: var(--space-3);
	}

	.image-error p {
		margin: 0;
		font-size: var(--font-size-sm);
	}

	.image-actions {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		display: flex;
		gap: var(--space-2);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.image-container:hover .image-actions {
		opacity: 1;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.action-btn:hover {
		background: var(--color-surface-tertiary);
		border-color: var(--color-border-secondary);
		transform: translateY(-1px);
	}

	.copy-btn {
		color: var(--blue-600);
	}

	.zoom-btn {
		color: var(--purple-600);
	}

	[data-theme='dark'] .copy-btn {
		color: var(--blue-400);
	}

	[data-theme='dark'] .zoom-btn {
		color: var(--purple-400);
	}

	.image-caption {
		margin-top: var(--space-3);
		text-align: center;
		font-size: var(--font-size-sm);
		color: var(--color-text-tertiary);
		font-style: italic;
		line-height: var(--line-height-normal);
	}

	/* Zoom modal */
	.zoom-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(10px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-4);
		cursor: zoom-out;
	}

	.zoom-container {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
	}

	.zoomed-image {
		max-width: 100%;
		max-height: 100%;
		border-radius: var(--radius-lg);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.close-btn {
		position: absolute;
		top: -var(--space-12);
		right: 0;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.image-actions {
			opacity: 1;
		}

		.action-btn {
			width: 28px;
			height: 28px;
		}

		.zoom-modal {
			padding: var(--space-2);
		}

		.close-btn {
			top: -var(--space-8);
			width: 36px;
			height: 36px;
		}
	}
</style>
