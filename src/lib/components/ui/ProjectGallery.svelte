<script lang="ts">
	import {
		ChevronLeft,
		ChevronRight,
		X,
		ZoomIn,
		ZoomOut,
		RotateCcw,
		Maximize,
		Play
	} from '@lucide/svelte';
	import { onMount } from 'svelte';

	// Types
	interface GalleryItem {
		src: string;
		alt: string;
		caption?: string;
		type?: 'image' | 'video';
		thumbnail?: string;
		width?: number;
		height?: number;
	}

	// Props
	export let gallery: GalleryItem[] = [];
	export let layout: 'auto' | 'masonry' | 'grid' | 'horizontal' = 'auto';
	export let enableLightbox: boolean = true;
	export let enableZoom: boolean = true;
	export let enableLazyLoading: boolean = true;
	export let columns: number = 3;
	export let mobileLimit: number = 6;

	// Callback props (Svelte 5 style)
	export let onLightboxOpen: ((event: { index: number }) => void) | undefined = undefined;
	export let onLightboxClose: (() => void) | undefined = undefined;

	// State
	let showLightbox = false;
	let currentIndex = 0;
	let zoomLevel = 1;
	let panX = 0;
	let panY = 0;
	let isDragging = false;
	let dragStartX = 0;
	let dragStartY = 0;
	let isFullscreen = false;
	let showAllOnMobile = false;
	let isMobile = false;

	// Refs
	let galleryContainer: HTMLElement;
	let lightboxImageContainer: HTMLElement;

	// Reactive layout determination
	$: effectiveLayout = layout === 'auto' ? getAutoLayout() : layout;

	// Mobile gallery display logic - only apply to non-horizontal layouts
	$: displayedGallery =
		isMobile && !showAllOnMobile && effectiveLayout !== 'horizontal'
			? gallery.slice(0, mobileLimit)
			: gallery;

	$: hasMoreImages = gallery.length > mobileLimit && effectiveLayout !== 'horizontal';
	$: remainingCount = gallery.length - mobileLimit;

	// Layout determination
	function getAutoLayout(): 'grid' | 'masonry' | 'horizontal' {
		if (isMobile) return 'horizontal';
		return gallery.length <= 6 ? 'grid' : 'masonry';
	}

	// Mobile detection
	function checkMobile() {
		if (typeof window !== 'undefined') {
			isMobile = window.innerWidth <= 767;
		}
	}

	// Show more/less functionality
	function toggleShowMore() {
		showAllOnMobile = !showAllOnMobile;
	}

	// Video utilities
	function isVideo(item: GalleryItem): boolean {
		return item.type === 'video' || /\.(mp4|webm|ogg)$/i.test(item.src);
	}

	function getVideoThumbnail(item: GalleryItem): string {
		return item.thumbnail || item.src;
	}
	// Lightbox functions
	function openLightbox(index: number) {
		if (!enableLightbox) return;

		// Map displayed index to actual gallery index
		let actualIndex = index;
		if (isMobile && !showAllOnMobile && effectiveLayout !== 'horizontal') {
			const displayedItem = displayedGallery[index];
			actualIndex = gallery.findIndex((item) => item.src === displayedItem.src);
		}

		currentIndex = actualIndex;
		showLightbox = true;
		resetZoom();
		document.body.style.overflow = 'hidden';
		onLightboxOpen?.({ index: actualIndex });
	}

	function closeLightbox() {
		showLightbox = false;
		document.body.style.overflow = '';
		if (isFullscreen) exitFullscreen();
		onLightboxClose?.();
	}

	function nextImage() {
		if (currentIndex < gallery.length - 1) {
			currentIndex++;
			resetZoom();
		}
	}

	function prevImage() {
		if (currentIndex > 0) {
			currentIndex--;
			resetZoom();
		}
	}

	function goToImage(index: number) {
		currentIndex = index;
		resetZoom();
	}

	// Zoom and pan functions
	function resetZoom() {
		zoomLevel = 1;
		panX = 0;
		panY = 0;
	}

	function zoomIn() {
		if (zoomLevel < 3) {
			zoomLevel += 0.25;
		}
	}

	function zoomOut() {
		if (zoomLevel > 0.5) {
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
		if (zoomLevel > 1) {
			isDragging = true;
			dragStartX = event.clientX - panX;
			dragStartY = event.clientY - panY;
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging && zoomLevel > 1) {
			panX = event.clientX - dragStartX;
			panY = event.clientY - dragStartY;
			constrainPan();
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	// Fullscreen functions
	function toggleFullscreen() {
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

	// Keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (!showLightbox) return;

		switch (event.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowLeft':
				prevImage();
				break;
			case 'ArrowRight':
				nextImage();
				break;
			case '+':
			case '=':
				zoomIn();
				break;
			case '-':
				zoomOut();
				break;
			case '0':
				resetZoom();
				break;
			case 'f':
			case 'F11':
				event.preventDefault();
				toggleFullscreen();
				break;
		}
	}

	// Lazy loading
	let observer: IntersectionObserver;

	function setupLazyLoading() {
		if (!enableLazyLoading || typeof window === 'undefined') return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement;
						const src = img.dataset.src;
						if (src) {
							img.src = src;
							img.classList.remove('lazy');
							observer.unobserve(img);
						}
					}
				});
			},
			{ rootMargin: '50px' }
		);
	}

	// Masonry layout calculation
	function calculateMasonryLayout() {
		if (!galleryContainer || effectiveLayout !== 'masonry') return;

		// Skip masonry on mobile - use CSS grid instead
		if (isMobile) {
			const items = galleryContainer.querySelectorAll('.gallery-item');
			items.forEach((item: Element) => {
				const htmlItem = item as HTMLElement;
				htmlItem.style.position = '';
				htmlItem.style.left = '';
				htmlItem.style.top = '';
				htmlItem.style.width = '';
			});
			galleryContainer.style.height = '';
			return;
		}

		const items = galleryContainer.querySelectorAll('.gallery-item');
		const columnWidth = 300;
		const gap = 16;
		const containerWidth = galleryContainer.clientWidth;
		const actualColumns = Math.floor(containerWidth / (columnWidth + gap));
		const columnHeights = new Array(actualColumns).fill(0);

		items.forEach((item: Element) => {
			const htmlItem = item as HTMLElement;
			const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

			htmlItem.style.position = 'absolute';
			htmlItem.style.left = `${shortestColumnIndex * (columnWidth + gap)}px`;
			htmlItem.style.top = `${columnHeights[shortestColumnIndex]}px`;
			htmlItem.style.width = `${columnWidth}px`;

			columnHeights[shortestColumnIndex] += htmlItem.offsetHeight + gap;
		});

		galleryContainer.style.height = `${Math.max(...columnHeights)}px`;
	}

	// Lifecycle
	onMount(() => {
		// Event listeners
		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('fullscreenchange', () => {
			isFullscreen = document.fullscreenElement !== null;
		});

		// Mobile detection
		checkMobile();
		window.addEventListener('resize', checkMobile);

		// Lazy loading setup
		setupLazyLoading();

		// Observe lazy images
		if (enableLazyLoading && observer) {
			const lazyImages = galleryContainer?.querySelectorAll('.item-image.lazy');
			lazyImages?.forEach((img) => observer.observe(img));
		}

		// Masonry layout setup
		if (effectiveLayout === 'masonry') {
			calculateMasonryLayout();
			window.addEventListener('resize', calculateMasonryLayout);
		}

		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.body.style.overflow = '';
			window.removeEventListener('resize', checkMobile);

			if (observer) {
				observer.disconnect();
			}

			if (effectiveLayout === 'masonry') {
				window.removeEventListener('resize', calculateMasonryLayout);
			}
		};
	});

	// Watch for layout changes
	$: if (galleryContainer && effectiveLayout === 'masonry') {
		setTimeout(calculateMasonryLayout, 100);
	}
</script>

{#if gallery && gallery.length > 0}
	<section class="gallery-section" aria-label="Project gallery">
		<div class="gallery-container" bind:this={galleryContainer}>
			<div
				class="gallery-grid"
				class:masonry={effectiveLayout === 'masonry'}
				class:grid={effectiveLayout === 'grid'}
				class:horizontal={effectiveLayout === 'horizontal'}
				style="--columns: {columns}"
			>
				{#each displayedGallery as item, index}
					<div class="gallery-item" class:video={isVideo(item)} style="--delay: {index * 100}ms">
						<button
							class="item-button"
							on:click={() => openLightbox(index)}
							disabled={!enableLightbox}
							aria-label="View {item.alt}"
						>
							<div class="image-container">
								{#if isVideo(item)}
									<img
										src={getVideoThumbnail(item)}
										alt={item.alt}
										class="item-image"
										class:lazy={enableLazyLoading}
										data-src={enableLazyLoading ? getVideoThumbnail(item) : undefined}
										loading={enableLazyLoading ? 'lazy' : 'eager'}
									/>
									<div class="video-overlay">
										<Play size={32} />
									</div>
								{:else}
									<img
										src={enableLazyLoading ? undefined : item.src}
										alt={item.alt}
										class="item-image"
										class:lazy={enableLazyLoading}
										data-src={enableLazyLoading ? item.src : undefined}
										loading={enableLazyLoading ? 'lazy' : 'eager'}
									/>
								{/if}

								{#if enableLightbox}
									<div class="item-overlay">
										<ZoomIn size={20} />
									</div>
								{/if}
							</div>

							{#if item.caption}
								<p class="item-caption">{item.caption}</p>
							{/if}
						</button>
					</div>
				{/each}
			</div>

			<!-- Show More/Less Buttons for Mobile (only for non-horizontal layouts) -->
			{#if isMobile && hasMoreImages && effectiveLayout !== 'horizontal'}
				<div class="show-more-container">
					{#if !showAllOnMobile}
						<button class="show-more-btn" on:click={toggleShowMore}>
							<span class="show-more-text">
								Show {remainingCount} more image{remainingCount !== 1 ? 's' : ''}
							</span>
							<ChevronRight size={20} />
						</button>
					{:else}
						<button class="show-more-btn" on:click={toggleShowMore}>
							<span class="show-more-text">Show less</span>
							<ChevronLeft size={20} />
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</section>
{/if}

<!-- Lightbox Modal -->
{#if showLightbox && enableLightbox && gallery.length > 0}
	<div
		class="lightbox-backdrop"
		role="dialog"
		aria-modal="true"
		aria-label="Gallery lightbox"
		on:click={closeLightbox}
		on:keydown|stopPropagation
	>
		<div class="lightbox-content" on:click|stopPropagation>
			<!-- Header Controls -->
			<div class="lightbox-header">
				<div class="lightbox-info">
					<span class="image-counter">{currentIndex + 1} / {gallery.length}</span>
					{#if gallery[currentIndex].caption}
						<span class="current-caption">{gallery[currentIndex].caption}</span>
					{/if}
				</div>

				<div class="lightbox-controls">
					{#if enableZoom}
						<button class="control-btn" on:click={zoomOut} aria-label="Zoom out">
							<ZoomOut size={20} />
						</button>
						<span class="zoom-level">{Math.round(zoomLevel * 100)}%</span>
						<button class="control-btn" on:click={zoomIn} aria-label="Zoom in">
							<ZoomIn size={20} />
						</button>
						<button class="control-btn" on:click={resetZoom} aria-label="Reset zoom">
							<RotateCcw size={20} />
						</button>
					{/if}

					<button class="control-btn" on:click={toggleFullscreen} aria-label="Toggle fullscreen">
						<Maximize size={20} />
					</button>

					<button class="control-btn close-btn" on:click={closeLightbox} aria-label="Close">
						<X size={24} />
					</button>
				</div>
			</div>

			<!-- Image Container -->
			<div
				class="lightbox-image-container"
				bind:this={lightboxImageContainer}
				on:mousedown={handleMouseDown}
				style="cursor: {zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'}"
			>
				{#if isVideo(gallery[currentIndex])}
					<video
						src={gallery[currentIndex].src}
						class="lightbox-media"
						style="transform: scale({zoomLevel}) translate({panX}px, {panY}px)"
						controls
						autoplay
						title={gallery[currentIndex].alt}
					>
						<track kind="captions" />
					</video>
				{:else}
					<img
						src={gallery[currentIndex].src}
						alt={gallery[currentIndex].alt}
						class="lightbox-media"
						style="transform: scale({zoomLevel}) translate({panX}px, {panY}px)"
						draggable="false"
					/>
				{/if}
			</div>

			<!-- Navigation -->
			{#if gallery.length > 1}
				<div class="lightbox-navigation">
					<button
						class="nav-btn prev"
						on:click={prevImage}
						disabled={currentIndex === 0}
						aria-label="Previous image"
					>
						<ChevronLeft size={32} />
					</button>

					<div class="lightbox-thumbnails">
						{#each gallery as item, index}
							<button
								class="thumbnail-btn"
								class:active={index === currentIndex}
								on:click={() => goToImage(index)}
								aria-label="Go to image {index + 1}"
							>
								<img
									src={isVideo(item) ? getVideoThumbnail(item) : item.src}
									alt={item.alt}
									class="thumbnail-image"
								/>
								{#if isVideo(item)}
									<div class="thumbnail-video-indicator">
										<Play size={12} />
									</div>
								{/if}
							</button>
						{/each}
					</div>

					<button
						class="nav-btn next"
						on:click={nextImage}
						disabled={currentIndex === gallery.length - 1}
						aria-label="Next image"
					>
						<ChevronRight size={32} />
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ===== CSS CUSTOM PROPERTIES ===== */
	:root {
		--gallery-gap: 1rem;
		--gallery-border-radius: 1rem;
		--gallery-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		--gallery-glass-bg: rgba(255, 255, 255, 0.1);
		--gallery-glass-border: rgba(255, 255, 255, 0.2);
		--gallery-hover-scale: 1.05;
		--gallery-hover-lift: -8px;
		--lightbox-backdrop: rgba(0, 0, 0, 0.95);
		--lightbox-glass-bg: rgba(255, 255, 255, 0.15);
		--lightbox-glass-border: rgba(255, 255, 255, 0.25);
	}

	/* Dark mode adjustments */
	:global(.dark) {
		--gallery-glass-bg: rgba(0, 0, 0, 0.2);
		--gallery-glass-border: rgba(255, 255, 255, 0.1);
		--lightbox-glass-bg: rgba(0, 0, 0, 0.3);
		--lightbox-glass-border: rgba(255, 255, 255, 0.15);
	}

	/* ===== GALLERY CONTAINER ===== */
	.gallery-section {
		width: 100%;
		padding: 2rem 0;
	}

	.gallery-container {
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	/* ===== GALLERY GRID LAYOUTS ===== */
	.gallery-grid {
		position: relative;
		width: 100%;
	}

	/* Grid Layout */
	.gallery-grid.grid {
		display: grid;
		grid-template-columns: repeat(var(--columns, 3), 1fr);
		gap: var(--gallery-gap);
		align-items: start;
	}

	/* Masonry Layout */
	.gallery-grid.masonry {
		position: relative;
		min-height: 400px;
	}

	.gallery-grid.masonry .gallery-item {
		position: absolute;
		width: 300px;
	}

	/* Horizontal Layout */
	.gallery-grid.horizontal {
		display: flex;
		gap: var(--gallery-gap);
		overflow-x: auto;
		overflow-y: hidden;
		padding-bottom: 1rem;
		scroll-behavior: smooth;
		scrollbar-width: thin;
		scrollbar-color: var(--gallery-glass-border) transparent;
	}

	.gallery-grid.horizontal::-webkit-scrollbar {
		height: 8px;
	}

	.gallery-grid.horizontal::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 4px;
	}

	.gallery-grid.horizontal::-webkit-scrollbar-thumb {
		background: var(--gallery-glass-border);
		border-radius: 4px;
	}

	.gallery-grid.horizontal::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary, #3b82f6);
	}

	.gallery-grid.horizontal .gallery-item {
		flex-shrink: 0;
		width: 280px;
	}

	/* ===== GALLERY ITEMS ===== */
	.gallery-item {
		position: relative;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 0.6s ease forwards;
		animation-delay: var(--delay, 0ms);
	}

	.item-button {
		display: block;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: var(--gallery-transition);
		border-radius: var(--gallery-border-radius);
		overflow: hidden;
	}

	.item-button:disabled {
		cursor: default;
	}

	/* ===== IMAGE CONTAINERS ===== */
	.image-container {
		position: relative;
		width: 100%;
		aspect-ratio: 4/3;
		border-radius: var(--gallery-border-radius);
		overflow: hidden;
		background: var(--gallery-glass-bg);
		border: 2px solid transparent;
		backdrop-filter: blur(10px);
		transition: var(--gallery-transition);
	}

	.item-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: var(--gallery-transition);
	}

	/* Lazy loading states */
	.item-image.lazy {
		opacity: 0.6;
		filter: blur(5px);
	}

	/* ===== VIDEO OVERLAY ===== */
	.video-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		color: white;
		backdrop-filter: blur(2px);
		transition: var(--gallery-transition);
	}

	/* ===== ITEM OVERLAY ===== */
	.item-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		opacity: 0;
		transition: var(--gallery-transition);
		backdrop-filter: blur(4px);
	}

	/* ===== CAPTIONS ===== */
	.item-caption {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary, #6b7280);
		text-align: center;
		font-style: italic;
		line-height: 1.5;
	}

	/* ===== SHOW MORE BUTTON ===== */
	.show-more-container {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		padding: 0 1rem;
	}

	.show-more-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--gallery-glass-bg);
		border: 2px solid var(--gallery-glass-border);
		border-radius: var(--gallery-border-radius);
		padding: 0.75rem 1.5rem;
		color: var(--color-text-primary, #1f2937);
		font-weight: 500;
		font-size: 0.875rem;
		cursor: pointer;
		transition: var(--gallery-transition);
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.show-more-btn:hover {
		transform: translateY(-2px) scale(1.02);
		border-color: var(--color-primary, #3b82f6);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}

	:global(.dark) .show-more-btn {
		color: var(--color-text-primary, #f9fafb);
		background: rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.15);
	}

	:global(.dark) .show-more-btn:hover {
		background: rgba(0, 0, 0, 0.4);
		border-color: var(--color-primary, #3b82f6);
	}

	/* ===== HOVER EFFECTS ===== */
	.item-button:not(:disabled):hover .image-container {
		transform: translateY(var(--gallery-hover-lift)) scale(var(--gallery-hover-scale));
		border-color: var(--color-primary, #3b82f6);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.item-button:not(:disabled):hover .item-image {
		transform: scale(1.1);
	}

	.item-button:not(:disabled):hover .item-overlay {
		opacity: 1;
	}

	.item-button:not(:disabled):hover .video-overlay {
		background: rgba(0, 0, 0, 0.6);
	}

	/* ===== LIGHTBOX MODAL ===== */
	.lightbox-backdrop {
		position: fixed;
		inset: 0;
		background: var(--lightbox-backdrop);
		backdrop-filter: blur(20px);
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
		max-width: 95vw;
		max-height: 95vh;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* ===== LIGHTBOX HEADER ===== */
	.lightbox-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: var(--lightbox-glass-bg);
		border: 1px solid var(--lightbox-glass-border);
		border-radius: 1rem;
		backdrop-filter: blur(20px);
		color: white;
		flex-shrink: 0;
	}

	.lightbox-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.image-counter {
		font-weight: 600;
		font-size: 0.875rem;
		opacity: 0.9;
	}

	.current-caption {
		font-style: italic;
		font-size: 0.875rem;
		opacity: 0.8;
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

	.control-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
		color: white;
		cursor: pointer;
		transition: var(--gallery-transition);
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.05);
	}

	.close-btn {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.3);
	}

	.close-btn:hover {
		background: rgba(239, 68, 68, 0.3);
	}

	.zoom-level {
		font-size: 0.75rem;
		font-weight: 600;
		min-width: 40px;
		text-align: center;
		opacity: 0.9;
	}

	/* ===== LIGHTBOX IMAGE CONTAINER ===== */
	.lightbox-image-container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 1rem;
		background: var(--lightbox-glass-bg);
		border: 1px solid var(--lightbox-glass-border);
		backdrop-filter: blur(20px);
		position: relative;
	}

	.lightbox-media {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		transition: transform 0.3s ease;
		border-radius: 0.5rem;
	}

	/* ===== LIGHTBOX NAVIGATION ===== */
	.lightbox-navigation {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		background: var(--lightbox-glass-bg);
		border: 1px solid var(--lightbox-glass-border);
		border-radius: 1rem;
		backdrop-filter: blur(20px);
		flex-shrink: 0;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		color: white;
		cursor: pointer;
		transition: var(--gallery-transition);
		flex-shrink: 0;
	}

	.nav-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}

	.nav-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.lightbox-thumbnails {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		padding: 0.5rem;
		max-width: 60vw;
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
	}

	.lightbox-thumbnails::-webkit-scrollbar {
		height: 4px;
	}

	.lightbox-thumbnails::-webkit-scrollbar-track {
		background: transparent;
	}

	.lightbox-thumbnails::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
	}

	.thumbnail-btn {
		position: relative;
		flex-shrink: 0;
		width: 60px;
		height: 45px;
		background: none;
		border: 2px solid transparent;
		border-radius: 0.5rem;
		overflow: hidden;
		cursor: pointer;
		transition: var(--gallery-transition);
	}

	.thumbnail-btn.active {
		border-color: var(--color-primary, #3b82f6);
	}

	.thumbnail-btn:hover {
		border-color: rgba(255, 255, 255, 0.5);
		transform: scale(1.05);
	}

	.thumbnail-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.thumbnail-video-indicator {
		position: absolute;
		top: 2px;
		right: 2px;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 50%;
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	/* ===== ANIMATIONS ===== */
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* ===== RESPONSIVE DESIGN ===== */

	/* Large screens */
	@media (min-width: 1024px) {
		.gallery-grid.grid {
			grid-template-columns: repeat(var(--columns, 3), 1fr);
		}
	}

	/* Medium screens */
	@media (max-width: 1023px) and (min-width: 768px) {
		.gallery-grid.grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.gallery-grid.masonry .gallery-item {
			width: calc(50% - 0.5rem);
		}

		.gallery-grid.horizontal .gallery-item {
			width: 250px;
		}
	}

	/* Small screens */
	@media (max-width: 767px) {
		.gallery-container {
			padding: 0 0.75rem;
		}

		.gallery-grid.grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
		}

		.gallery-grid.masonry {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
			min-height: auto;
		}

		.gallery-grid.masonry .gallery-item {
			position: relative !important;
			left: 0 !important;
			top: auto !important;
			width: 100% !important;
		}

		.gallery-grid.horizontal {
			gap: 0.75rem;
			padding-bottom: 0.75rem;
		}

		.gallery-grid.horizontal .gallery-item {
			width: 220px;
		}

		.lightbox-header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.lightbox-info {
			flex-direction: column;
			gap: 0.5rem;
		}

		.current-caption {
			max-width: none;
			white-space: normal;
		}

		.lightbox-navigation {
			flex-direction: row;
			gap: 0.5rem;
			align-items: center;
			justify-content: space-between;
		}

		.lightbox-thumbnails {
			flex: 1;
			max-width: none;
			justify-content: center;
			margin: 0 0.5rem;
		}

		.nav-btn {
			width: 44px;
			height: 44px;
			flex-shrink: 0;
		}
	}

	/* Extra small screens */
	@media (max-width: 480px) {
		.gallery-container {
			padding: 0 0.5rem;
		}

		.gallery-grid.grid,
		.gallery-grid.masonry {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5rem;
		}

		.gallery-grid.horizontal {
			gap: 0.5rem;
			padding-bottom: 0.5rem;
		}

		.gallery-grid.horizontal .gallery-item {
			width: 180px;
		}

		.show-more-container {
			margin-top: 1.5rem;
			padding: 0 0.5rem;
		}

		.show-more-btn {
			padding: 0.625rem 1.25rem;
			font-size: 0.8rem;
		}

		.control-btn {
			width: 36px;
			height: 36px;
		}

		.nav-btn {
			width: 40px;
			height: 40px;
		}

		.thumbnail-btn {
			width: 50px;
			height: 38px;
		}

		.lightbox-navigation {
			padding: 0.75rem;
			gap: 0.25rem;
		}

		.lightbox-thumbnails {
			gap: 0.25rem;
			padding: 0.25rem;
			margin: 0 0.25rem;
		}
	}

	/* ===== ACCESSIBILITY & PREFERENCES ===== */
	@media (prefers-reduced-motion: reduce) {
		.gallery-item {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.item-button:hover .image-container,
		.item-button:hover .item-image {
			transform: none;
		}

		.lightbox-backdrop {
			animation: none;
		}

		* {
			transition: none !important;
		}
	}

	@media (prefers-contrast: high) {
		.image-container {
			border-width: 3px;
		}

		.item-overlay,
		.video-overlay {
			background: rgba(0, 0, 0, 0.9);
		}

		.lightbox-header,
		.lightbox-image-container,
		.lightbox-navigation {
			border-width: 2px;
		}
	}

	/* ===== FOCUS STATES ===== */
	.item-button:focus-visible {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: 4px;
	}

	.show-more-btn:focus-visible {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: 2px;
	}

	.control-btn:focus-visible,
	.nav-btn:focus-visible,
	.thumbnail-btn:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	/* ===== PRINT STYLES ===== */
	@media print {
		.lightbox-backdrop {
			display: none;
		}

		.gallery-grid {
			break-inside: avoid;
		}

		.gallery-item {
			break-inside: avoid;
			page-break-inside: avoid;
		}
	}
</style>
