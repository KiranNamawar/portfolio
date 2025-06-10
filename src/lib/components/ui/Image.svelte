<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let src: string;
	export let alt: string;
	export let caption: string | undefined = undefined;
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let width: string | number | undefined = undefined;
	export let height: string | number | undefined = undefined;
	export let aspectRatio: string | undefined = undefined;
	export let fit: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none' = 'cover';
	export let radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
	export let shadow: boolean = true;
	export let border: boolean = false;
	export let placeholder: string | undefined = undefined;
	export let fadeIn: boolean = true;
	export let clickToExpand: boolean = false;

	let imageElement: HTMLImageElement;
	let isLoaded = false;
	let hasError = false;
	let isExpanded = false;

	function handleLoad() {
		isLoaded = true;
	}

	function handleError() {
		hasError = true;
		isLoaded = true;
	}

	function handleImageClick() {
		if (clickToExpand) {
			isExpanded = true;
			if (typeof document !== 'undefined') {
				document.body.style.overflow = 'hidden';
			}
		}
	}

	function closeExpanded() {
		isExpanded = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isExpanded && event.key === 'Escape') {
			closeExpanded();
		}
	}
	// Calculate responsive dimensions
	$: computedWidth = typeof width === 'number' ? `${width}px` : width;
	$: computedHeight = typeof height === 'number' ? `${height}px` : height;

	// Compute radius class
	$: radiusClass = `radius-${radius}`;
	// Cleanup on component destroy
	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<figure class="image-container" class:has-caption={caption}>
	<div
		class="image-wrapper {radiusClass}"
		class:shadow
		class:border
		style:width={computedWidth}
		style:height={computedHeight}
		style:aspect-ratio={aspectRatio}
	>
		<!-- Loading Skeleton -->
		{#if !isLoaded}
			<div class="skeleton {radiusClass}">
				<div class="skeleton-shimmer"></div>
				<div class="skeleton-content">
					<div class="skeleton-icon">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
								stroke="currentColor"
								stroke-width="2"
							/>
							<path
								d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
								stroke="currentColor"
								stroke-width="2"
							/>
							<path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" />
						</svg>
					</div>
				</div>
			</div>
		{/if}

		<!-- Error State -->
		{#if hasError}
			<div class="error-state {radiusClass}">
				<div class="error-icon">
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<p class="error-text">Failed to load image</p>
				{#if placeholder}
					<button
						class="retry-btn"
						on:click={() => {
							hasError = false;
							isLoaded = false;
						}}
					>
						Retry
					</button>
				{/if}
			</div>
		{:else}
			<!-- Actual Image -->
			{#if clickToExpand}
				<button
					class="image-button"
					on:click={handleImageClick}
					on:keydown={(e) => e.key === 'Enter' && handleImageClick()}
					aria-label="Click to expand image: {alt}"
					type="button"
				>
					<img
						bind:this={imageElement}
						{src}
						{alt}
						{loading}
						class="image"
						class:loaded={isLoaded}
						class:fade-in={fadeIn}
						style:object-fit={fit}
						style:width="100%"
						style:height="100%"
						on:load={handleLoad}
						on:error={handleError}
					/>
				</button>
			{:else}
				<img
					bind:this={imageElement}
					{src}
					{alt}
					{loading}
					class="image"
					class:loaded={isLoaded}
					class:fade-in={fadeIn}
					style:object-fit={fit}
					style:width="100%"
					style:height="100%"
					on:load={handleLoad}
					on:error={handleError}
				/>
			{/if}
		{/if}
	</div>

	<!-- Caption -->
	{#if caption}
		<figcaption class="caption">
			{caption}
		</figcaption>
	{/if}
</figure>

<!-- Expanded View Modal -->
{#if isExpanded}
	<div
		class="expanded-modal"
		on:click={closeExpanded}
		on:keydown={(e) =>
			(e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') && closeExpanded()}
		role="button"
		aria-label="Close expanded image view (click anywhere to close)"
		tabindex="0"
	>
		<div class="expanded-content" role="img" aria-label={alt}>
			<button class="close-btn" on:click={closeExpanded} aria-label="Close expanded view">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 6L6 18M6 6L18 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<img {src} {alt} class="expanded-image" />
			{#if caption}
				<p class="expanded-caption">{caption}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.image-container {
		margin: 0;
		width: 100%;
		max-width: 100%;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		height: auto;
		display: block;
		overflow: hidden;
		background: var(--color-glass-bg);
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.image-wrapper.shadow {
		box-shadow: var(--shadow-glass);
	}
	.image-wrapper.border {
		border: 1px solid var(--color-glass-border);
	}

	/* Border Radius Variants */
	.radius-none {
		border-radius: 0;
	}
	.radius-sm {
		border-radius: var(--radius-sm);
	}
	.radius-md {
		border-radius: var(--radius-md);
	}
	.radius-lg {
		border-radius: var(--radius-lg);
	}
	.radius-xl {
		border-radius: var(--radius-xl);
	}
	.radius-full {
		border-radius: 50%;
	}

	/* Image Button for click-to-expand */
	.image-button {
		width: 100%;
		height: 100%;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: block;
	}

	/* Image Styles */
	.image {
		width: 100%;
		height: 100%;
		display: block;
		transition: opacity 0.3s ease;
		opacity: 0;
	}

	.image.loaded {
		opacity: 1;
	}
	.image.fade-in.loaded {
		animation: fadeIn 0.5s ease-out forwards;
	}

	/* Loading Skeleton */
	.skeleton {
		position: absolute;
		inset: 0;
		background: var(--color-glass-bg);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.skeleton-shimmer {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 50%,
			transparent 100%
		);
		animation: shimmer 2s infinite;
	}

	.skeleton-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		z-index: 1;
	}

	.skeleton-icon {
		color: var(--color-text-tertiary);
		opacity: 0.5;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	/* Error State */
	.error-state {
		position: absolute;
		inset: 0;
		background: var(--color-glass-bg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		color: var(--color-text-tertiary);
	}

	.error-icon {
		color: var(--color-error);
		opacity: 0.7;
	}

	.error-text {
		font-size: var(--text-sm);
		margin: 0;
	}

	.retry-btn {
		background: var(--color-glass-bg);
		border: 1px solid var(--color-glass-border);
		border-radius: var(--radius-sm);
		padding: var(--space-2) var(--space-3);
		color: var(--color-text-secondary);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.retry-btn:hover {
		background: var(--color-glass-hover);
		color: var(--color-text-primary);
	}

	/* Caption */
	.caption {
		margin-top: var(--space-3);
		text-align: center;
		color: var(--color-text-secondary);
		font-style: italic;
		font-size: var(--text-sm);
		line-height: 1.5;
	} /* Expanded Modal */
	.expanded-modal {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(10px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-4);
		opacity: 0;
		animation: fadeIn 0.3s ease forwards;
		cursor: pointer;
	}

	.expanded-content {
		position: relative;
		max-width: 95vw;
		max-height: 95vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.close-btn {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		background: var(--color-glass-bg);
		backdrop-filter: blur(20px);
		border: 1px solid var(--color-glass-border);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
		padding: var(--space-3);
		cursor: pointer;
		z-index: 1001;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: var(--color-glass-hover);
		transform: translateY(-2px);
	}

	.expanded-image {
		max-width: 100%;
		max-height: 80vh;
		object-fit: contain;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-glass);
	}

	.expanded-caption {
		margin-top: var(--space-4);
		text-align: center;
		color: white;
		font-style: italic;
		max-width: 80%;
		background: var(--color-glass-bg);
		backdrop-filter: blur(20px);
		border: 1px solid var(--color-glass-border);
		border-radius: var(--radius-md);
		padding: var(--space-3) var(--space-4);
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.expanded-content {
			padding: var(--space-2);
		}

		.close-btn {
			top: var(--space-2);
			right: var(--space-2);
			padding: var(--space-2);
		}

		.expanded-image {
			max-height: 70vh;
		}
		.expanded-caption {
			max-width: 95%;
			font-size: var(--text-sm);
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.skeleton {
			border: 2px solid currentColor;
		}

		.error-state {
			border: 2px solid var(--color-error);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.image,
		.image-wrapper,
		.skeleton-shimmer,
		.expanded-modal {
			animation: none;
			transition: none;
		}

		.image.fade-in.loaded {
			opacity: 1;
		}
	}
</style>
