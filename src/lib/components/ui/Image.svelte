<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Copy,
		Check,
		ZoomIn,
		ZoomOut,
		RotateCcw,
		Maximize2 as Maximize,
		X,
		ChevronLeft,
		ChevronRight
	} from '$lib/utils/icons.js';

	// Props
	export let src: string;
	export let alt: string = '';
	export let caption: string = '';
	export let zoomable: boolean = true;
	export let lazy: boolean = true;
	export let width: string | number = 'auto';
	export let height: string | number = 'auto';
	export let aspectRatio: string = 'auto';

	// Advanced props
	export let enablePan: boolean = true;
	export let enableFullscreen: boolean = true;
	export let maxZoom: number = 3;
	export let minZoom: number = 0.5;
	// State
	let imageElement: HTMLImageElement;
	let lightboxImageElement: HTMLImageElement;
	let isLoaded = false;
	let isError = false;
	let isZoomed = false;
	let copied = false;

	// Lightbox state
	let zoomLevel = 1;
	let panX = 0;
	let panY = 0;
	let isDragging = false;
	let dragStartX = 0;
	let dragStartY = 0;
	let isFullscreen = false;
	let lightboxImageSize = { width: 'auto', height: 'auto' };

	// Refs
	let lightboxImageContainer: HTMLElement;
	let lightboxBackdrop: HTMLElement;

	// Lazy loading observer
	let observer: IntersectionObserver;

	function setupLazyLoading() {
		if (!lazy || typeof window === 'undefined') return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement;
						if (img.dataset.src) {
							img.src = img.dataset.src;
							img.classList.remove('lazy');
							observer.unobserve(img);
						}
					}
				});
			},
			{ rootMargin: '50px' }
		);
	}

	function handleLoad() {
		isLoaded = true;
	}

	function handleError() {
		isError = true;
	}
	// Lightbox functions
	function calculateLightboxSize() {
		if (!lightboxImageElement) return;

		const img = lightboxImageElement;
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		// Reserve space for controls (header + footer)
		const availableWidth = vw * 0.95;
		const availableHeight = vh * 0.85;

		// Get natural image dimensions
		const naturalWidth = img.naturalWidth;
		const naturalHeight = img.naturalHeight;
		const aspectRatio = naturalWidth / naturalHeight;

		// Calculate optimal size
		let targetWidth = availableWidth;
		let targetHeight = targetWidth / aspectRatio;

		// If height is too large, scale down based on height
		if (targetHeight > availableHeight) {
			targetHeight = availableHeight;
			targetWidth = targetHeight * aspectRatio;
		}

		// Ensure minimum size for small images (scale up if needed)
		const minSize = Math.min(vw * 0.6, vh * 0.6, 400);
		if (targetWidth < minSize && targetHeight < minSize) {
			if (aspectRatio > 1) {
				targetWidth = minSize;
				targetHeight = minSize / aspectRatio;
			} else {
				targetHeight = minSize;
				targetWidth = minSize * aspectRatio;
			}
		}

		lightboxImageSize = {
			width: `${targetWidth}px`,
			height: `${targetHeight}px`
		};
	}

	function openLightbox() {
		if (!zoomable) return;
		isZoomed = true;
		resetZoom();
		document.body.style.overflow = 'hidden';

		// Focus the lightbox for keyboard navigation
		setTimeout(() => {
			lightboxBackdrop?.focus();
			// Calculate size after image loads in lightbox
			setTimeout(calculateLightboxSize, 100);
		}, 0);
	}

	function closeLightbox() {
		isZoomed = false;
		document.body.style.overflow = '';
		if (isFullscreen) exitFullscreen();
	}

	// Zoom and pan functions
	function resetZoom() {
		zoomLevel = 1;
		panX = 0;
		panY = 0;
	}

	function zoomIn() {
		if (zoomLevel < maxZoom) {
			zoomLevel += 0.25;
		}
	}

	function zoomOut() {
		if (zoomLevel > minZoom) {
			zoomLevel -= 0.25;
			constrainPan();
		}
	}

	function constrainPan() {
		if (!lightboxImageContainer) return;
		const container = lightboxImageContainer;
		const maxPanX = (container.scrollWidth - container.clientWidth) / 2;
		const maxPanY = (container.scrollHeight - container.clientHeight) / 2;

		panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
		panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
	}

	// Mouse/touch handlers for pan
	function handleMouseDown(event: MouseEvent) {
		if (enablePan && zoomLevel > 1) {
			isDragging = true;
			dragStartX = event.clientX - panX;
			dragStartY = event.clientY - panY;
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging && enablePan && zoomLevel > 1) {
			panX = event.clientX - dragStartX;
			panY = event.clientY - dragStartY;
			constrainPan();
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	// Touch handlers for mobile
	function handleTouchStart(event: TouchEvent) {
		if (enablePan && zoomLevel > 1 && event.touches.length === 1) {
			isDragging = true;
			const touch = event.touches[0];
			dragStartX = touch.clientX - panX;
			dragStartY = touch.clientY - panY;
		}
	}

	function handleTouchMove(event: TouchEvent) {
		if (isDragging && enablePan && zoomLevel > 1 && event.touches.length === 1) {
			event.preventDefault();
			const touch = event.touches[0];
			panX = touch.clientX - dragStartX;
			panY = touch.clientY - dragStartY;
			constrainPan();
		}
	}

	function handleTouchEnd() {
		isDragging = false;
	}

	// Fullscreen functions
	function toggleFullscreen() {
		if (!enableFullscreen) return;
		if (!isFullscreen) {
			enterFullscreen();
		} else {
			exitFullscreen();
		}
	}

	function enterFullscreen() {
		if (lightboxImageContainer?.requestFullscreen) {
			lightboxImageContainer.requestFullscreen();
			isFullscreen = true;
		}
	}

	function exitFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			isFullscreen = false;
		}
	}

	// Keyboard navigation for lightbox
	function handleLightboxKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				closeLightbox();
				break;
			case '+':
			case '=':
				event.preventDefault();
				zoomIn();
				break;
			case '-':
				event.preventDefault();
				zoomOut();
				break;
			case '0':
				event.preventDefault();
				resetZoom();
				break;
			case 'f':
			case 'F':
				event.preventDefault();
				toggleFullscreen();
				break;
		}
	}

	// Keyboard handler for image container accessibility
	function handleImageContainerKeydown(event: KeyboardEvent) {
		if (enablePan && zoomLevel > 1) {
			const step = 20; // Pixels to move per keystroke
			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					panX = Math.max(-100, panX - step);
					constrainPan();
					break;
				case 'ArrowRight':
					event.preventDefault();
					panX = Math.min(100, panX + step);
					constrainPan();
					break;
				case 'ArrowUp':
					event.preventDefault();
					panY = Math.max(-100, panY - step);
					constrainPan();
					break;
				case 'ArrowDown':
					event.preventDefault();
					panY = Math.min(100, panY + step);
					constrainPan();
					break;
			}
		}
	}
	async function copyImageUrl() {
		try {
			// Create full URL from potentially relative src
			const fullUrl = new URL(src, window.location.origin).href;
			await navigator.clipboard.writeText(fullUrl);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy image URL:', err);
		}
	}
	// Lifecycle
	onMount(() => {
		// Event listeners
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('fullscreenchange', () => {
			isFullscreen = document.fullscreenElement !== null;
		});

		// Recalculate lightbox size on window resize
		window.addEventListener('resize', () => {
			if (isZoomed) {
				setTimeout(calculateLightboxSize, 100);
			}
		});

		// Lazy loading setup
		setupLazyLoading();

		// Observe lazy images
		if (lazy && observer && imageElement) {
			observer.observe(imageElement);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.body.style.overflow = '';

			if (observer) {
				observer.disconnect();
			}
		};
	});
</script>

<figure class="enhanced-image" class:zoomable>
	<div class="image-container glass-overlay-container">
		<button
			class="image-button"
			type="button"
			disabled={!zoomable}
			on:click={openLightbox}
			on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? openLightbox() : null)}
			aria-label={zoomable ? `Zoom image: ${alt}` : alt}
		>
			{#if lazy}
				<img
					bind:this={imageElement}
					{alt}
					data-src={src}
					style="width: {typeof width === 'number'
						? width + 'px'
						: width}; height: {typeof height === 'number'
						? height + 'px'
						: height}; aspect-ratio: {aspectRatio};"
					class="item-image"
					class:lazy
					class:loaded={isLoaded}
					class:error={isError}
					on:load={handleLoad}
					on:error={handleError}
					loading="lazy"
				/>
			{:else}
				<img
					bind:this={imageElement}
					{src}
					{alt}
					style="width: {typeof width === 'number'
						? width + 'px'
						: width}; height: {typeof height === 'number'
						? height + 'px'
						: height}; aspect-ratio: {aspectRatio};"
					class="item-image"
					class:loaded={isLoaded}
					class:error={isError}
					on:load={handleLoad}
					on:error={handleError}
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

			<!-- Zoom overlay -->
			{#if zoomable && isLoaded && !isError}
				<div class="item-overlay glass-overlay-auto-hide">
					<ZoomIn size={24} />
				</div>
			{/if}
		</button>

		<!-- Image actions overlay -->
		{#if isLoaded && !isError}
			<div class="image-actions glass-overlay-auto-hide">
				<button
					class="glass-control-btn"
					type="button"
					on:click|stopPropagation={copyImageUrl}
					on:keydown={(e) =>
						(e.key === 'Enter' || e.key === ' ') && e.stopPropagation() && copyImageUrl()}
					aria-label="Copy image URL"
					title="Copy image URL"
				>
					{#if copied}
						<Check size={16} />
					{:else}
						<Copy size={16} />
					{/if}
				</button>
			</div>
		{/if}
	</div>

	{#if caption}
		<figcaption class="image-caption">{caption}</figcaption>
	{/if}
</figure>

<!-- Advanced Lightbox Modal -->
{#if isZoomed}
	<div
		class="lightbox-backdrop glass-modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-label="Zoomed image view"
		tabindex="-1"
		bind:this={lightboxBackdrop}
		on:click={closeLightbox}
		on:keydown={handleLightboxKeydown}
	>
		<div
			class="lightbox-content glass-overlay-container"
			on:click|stopPropagation
			role="presentation"
		>
			<!-- Header Controls -->
			<div class="lightbox-header glass-overlay-auto-hide">
				<div class="lightbox-info">
					<span class="image-title">{alt}</span>
				</div>

				<div class="lightbox-controls">
					<button class="glass-control-btn" on:click={zoomOut} aria-label="Zoom out">
						<ZoomOut size={20} />
					</button>
					<span class="zoom-level">{Math.round(zoomLevel * 100)}%</span>
					<button class="glass-control-btn" on:click={zoomIn} aria-label="Zoom in">
						<ZoomIn size={20} />
					</button>
					<button class="glass-control-btn" on:click={resetZoom} aria-label="Reset zoom">
						<RotateCcw size={20} />
					</button>

					{#if enableFullscreen}
						<button
							class="glass-control-btn"
							on:click={toggleFullscreen}
							aria-label="Toggle fullscreen"
						>
							<Maximize size={20} />
						</button>
					{/if}

					<button class="glass-control-btn danger" on:click={closeLightbox} aria-label="Close">
						<X size={24} />
					</button>
				</div>
			</div>

			<!-- Image Container -->
			<button
				class="lightbox-image-container"
				bind:this={lightboxImageContainer}
				aria-label="Zoomable image viewer - use arrow keys to pan when zoomed, +/- to zoom, f for fullscreen"
				on:mousedown={handleMouseDown}
				on:touchstart={handleTouchStart}
				on:touchmove={handleTouchMove}
				on:touchend={handleTouchEnd}
				on:keydown={handleImageContainerKeydown}
				style="cursor: {zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'}"
			>
				<img
					bind:this={lightboxImageElement}
					{src}
					{alt}
					class="lightbox-media"
					style="transform: scale({zoomLevel}) translate({panX}px, {panY}px); width: {lightboxImageSize.width}; height: {lightboxImageSize.height};"
					draggable="false"
					on:load={calculateLightboxSize}
				/>
			</button>
			<!-- Footer with caption -->
			{#if caption}
				<div class="lightbox-footer glass-overlay-auto-hide">
					<p class="lightbox-caption">{caption}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ===== CSS CUSTOM PROPERTIES ===== */
	:root {
		--image-border-radius: 1rem;
		--image-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		--image-hover-scale: 1.05;
		--image-hover-lift: -8px;
	}

	/* ===== MAIN CONTAINER ===== */
	.enhanced-image {
		margin: 2rem 0;
		max-width: 100%;
	}

	.image-container {
		position: relative;
		display: inline-block;
		max-width: 100%;
		border-radius: var(--image-border-radius);
		overflow: hidden;
		background: var(--color-surface-secondary);
		border: 2px solid transparent;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transition: var(--image-transition);
	}

	.image-container:hover {
		transform: translateY(var(--image-hover-lift)) scale(var(--image-hover-scale));
		border-color: var(--color-primary, #3b82f6);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.zoomable .image-container {
		cursor: zoom-in;
	}

	/* ===== IMAGE BUTTON ===== */
	.image-button {
		display: block;
		width: 100%;
		border: none;
		background: none;
		padding: 0;
		cursor: inherit;
		border-radius: var(--image-border-radius);
		overflow: hidden;
	}

	.image-button:disabled {
		cursor: default;
	}

	/* ===== IMAGE STYLES ===== */
	.item-image {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
		opacity: 0;
		transition: var(--image-transition);
	}

	.item-image.loaded {
		opacity: 1;
	}

	.item-image.error {
		display: none;
	}

	/* Lazy loading states */
	.item-image.lazy {
		opacity: 0.6;
		filter: blur(5px);
	}

	.image-container:hover .item-image {
		transform: scale(1.1);
	}

	/* ===== LOADING & ERROR STATES ===== */
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
		border-top: 3px solid var(--color-primary, #3b82f6);
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

	/* ===== OVERLAYS ===== */
	.item-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		opacity: 0;
		transition: var(--image-transition);
		backdrop-filter: blur(4px);
	}

	.image-container:hover .item-overlay {
		opacity: 1;
	}

	.image-actions {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		display: flex;
		gap: var(--space-2);
	}

	/* ===== CAPTION ===== */
	.image-caption {
		margin-top: var(--space-3);
		text-align: center;
		font-size: var(--font-size-sm);
		color: var(--color-text-tertiary);
		font-style: italic;
		line-height: var(--line-height-normal);
	}

	/* ===== LIGHTBOX MODAL ===== */
	.lightbox-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		animation: fadeIn 0.3s ease;
	}

	.lightbox-content {
		position: relative;
		width: 100%;
		height: 100%;
		max-width: 98vw;
		max-height: 98vh;
		display: flex;
		flex-direction: column;
	}

	/* ===== LIGHTBOX HEADER ===== */
	.lightbox-header {
		position: absolute;
		top: 2rem;
		left: 2rem;
		right: 2rem;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		color: white;
	}

	.lightbox-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.image-title {
		font-weight: 600;
		font-size: 0.875rem;
		opacity: 0.9;
		max-width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.lightbox-controls {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.zoom-level {
		font-size: 0.75rem;
		font-weight: 600;
		min-width: 40px;
		text-align: center;
		opacity: 0.9;
		color: white;
	}

	/* ===== LIGHTBOX IMAGE CONTAINER ===== */
	.lightbox-image-container {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: transparent;
		/* Button reset styles */
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		text-align: inherit;
		cursor: inherit;
		outline: inherit;
	}
	.lightbox-media {
		/* Base properties */
		object-fit: contain;
		transition: transform 0.3s ease;
		border-radius: 0.5rem;

		/* Size will be set dynamically via JavaScript */
		max-width: 95vw;
		max-height: 90vh;

		/* Ensure crisp rendering for scaled images */
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
	}

	/* Override for mobile */
	@media (max-width: 768px) {
		.lightbox-media {
			max-width: 98vw;
			max-height: 85vh;
		}
	}

	/* ===== LIGHTBOX FOOTER ===== */
	.lightbox-footer {
		position: absolute;
		bottom: 2rem;
		left: 2rem;
		right: 2rem;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1rem;
		color: white;
	}

	.lightbox-caption {
		font-style: italic;
		font-size: 0.875rem;
		opacity: 0.9;
		text-align: center;
		margin: 0;
		line-height: 1.5;
	}

	/* ===== ANIMATIONS ===== */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	} /* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		/* Hide image overlays completely on mobile */
		.image-actions,
		.item-overlay {
			display: none !important;
		}

		/* Remove hover effects on mobile */
		.image-container:hover {
			transform: none;
		}

		.image-container:hover .item-image {
			transform: none;
		}

		/* Mobile lightbox - always visible overlays */
		.lightbox-header.glass-overlay-auto-hide {
			opacity: 0.95 !important;
			transform: translateY(0) !important;
			pointer-events: auto !important;
		}

		.lightbox-footer.glass-overlay-auto-hide {
			opacity: 0.95 !important;
			transform: translateY(0) !important;
			pointer-events: auto !important;
		}

		.lightbox-header {
			top: 0.5rem;
			left: 0.5rem;
			right: 0.5rem;
			flex-direction: column;
			gap: 0.75rem;
			text-align: center;
			padding: 0.5rem 0.75rem;
		}

		.lightbox-info {
			flex-direction: column;
			gap: 0.5rem;
		}

		.image-title {
			max-width: none;
			white-space: normal;
		}

		.lightbox-footer {
			bottom: 0.5rem;
			left: 0.5rem;
			right: 0.5rem;
			padding: 0.5rem 0.75rem;
		}

		.lightbox-media {
			max-width: 96vw;
			max-height: 80vh;
		}

		.glass-control-btn {
			width: 36px;
			height: 36px;
		}
	}

	@media (max-width: 480px) {
		.enhanced-image {
			margin: 1.5rem 0;
		}

		.image-container {
			border-radius: 0.75rem;
		}

		.glass-control-btn {
			width: 32px;
			height: 32px;
		}

		.lightbox-controls {
			gap: 0.5rem;
		}
	}

	/* ===== ACCESSIBILITY & PREFERENCES ===== */
	@media (prefers-reduced-motion: reduce) {
		.item-image,
		.image-container,
		.lightbox-backdrop {
			animation: none;
			transition: none;
		}

		.image-container:hover,
		.image-container:hover .item-image {
			transform: none;
		}
	}

	@media (prefers-contrast: high) {
		.image-container {
			border-width: 3px;
		}

		.item-overlay {
			background: rgba(0, 0, 0, 0.9);
		}

		.lightbox-header,
		.lightbox-footer {
			border: 2px solid rgba(255, 255, 255, 0.5);
			border-radius: 0.5rem;
		}
	}

	/* ===== FOCUS STATES ===== */
	.image-button:focus-visible {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: 4px;
	}

	.glass-control-btn:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.lightbox-image-container:focus-visible {
		outline: 2px solid white;
		outline-offset: -2px;
	}

	/* ===== PRINT STYLES ===== */
	@media print {
		.lightbox-backdrop {
			display: none;
		}

		.enhanced-image {
			break-inside: avoid;
			page-break-inside: avoid;
		}

		.item-overlay,
		.image-actions {
			display: none;
		}
	}
</style>
