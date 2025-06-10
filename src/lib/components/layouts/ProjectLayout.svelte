<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import { formatDate } from '$lib/utils/date.js';
	import {
		ExternalLink,
		Github,
		ArrowLeft,
		Calendar,
		ChevronLeft,
		ChevronRight
	} from '@lucide/svelte';
	import ReadingProgress from '$lib/components/ui/ReadingProgress.svelte';
	import CodeBlockEnhancer from '$lib/components/ui/CodeBlockEnhancer.svelte';
	// import Image from '../ui/Image.svelte';
	import { onMount } from 'svelte';

	// All frontmatter values are available as props
	export let title: string;
	export let description: string;
	export let date: string;
	export let technologies: string[] | undefined = undefined;
	export let github: string | undefined = undefined;
	export let demo: string | undefined = undefined;
	export let featured: boolean | undefined = undefined;
	export let gallery: Array<{ src: string; alt: string; caption?: string }> | undefined = undefined;

	let currentImageIndex = 0;
	let showImageModal = false;
	let modalImageIndex = 0;

	function openImageModal(index: number) {
		modalImageIndex = index;
		showImageModal = true;
	}

	function closeImageModal() {
		showImageModal = false;
	}

	function nextModalImage() {
		if (gallery) {
			modalImageIndex = (modalImageIndex + 1) % gallery.length;
		}
	}

	function prevModalImage() {
		if (gallery) {
			modalImageIndex = modalImageIndex === 0 ? gallery.length - 1 : modalImageIndex - 1;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!showImageModal) return;

		if (event.key === 'Escape') {
			closeImageModal();
		} else if (event.key === 'ArrowLeft') {
			prevModalImage();
		} else if (event.key === 'ArrowRight') {
			nextModalImage();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<svelte:head>
	<title>{title} | Projects</title>
	<meta name="description" content={description} />
</svelte:head>

<!-- Reading Progress Indicator -->
<ReadingProgress />

<!-- Code Block Enhancer -->
<CodeBlockEnhancer />

<article class="project-detail">
	<!-- Desktop Hero Layout -->
	<div class="desktop-only">
		{#if gallery && gallery.length > 0}
			<!-- Desktop Layout with Gallery -->
			<header class="desktop-header">
				<div class="container">
					<div class="desktop-header-content">
						<div class="desktop-meta-row">
							<a href="/projects" class="back-link">
								<ArrowLeft size={18} />
								Projects
							</a>

							<div class="desktop-badges">
								<time class="project-date">
									<Calendar size={16} />
									{formatDate(date)}
								</time>
								{#if featured}
									<span class="featured-badge">Featured</span>
								{/if}
							</div>
						</div>

						<h1 class="desktop-title">{title}</h1>

						{#if description}
							<p class="desktop-description">{description}</p>
						{/if}

						{#if technologies && technologies.length > 0}
							<div class="desktop-tech-stack">
								{#each technologies as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>
						{/if}

						<div class="desktop-actions">
							{#if demo}
								<a href={demo} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
									<ExternalLink size={16} />
									Live Demo
								</a>
							{/if}
							{#if github}
								<a
									href={github}
									target="_blank"
									rel="noopener noreferrer"
									class="btn btn-secondary"
								>
									<Github size={16} />
									Source Code
								</a>
							{/if}
						</div>
					</div>
				</div>
			</header>
			<!-- Desktop Gallery Section -->
			<section class="desktop-gallery-section">
				{#if gallery.length === 1}
					<!-- Single image showcase -->
					<div class="desktop-single-showcase">
						<button class="desktop-main-image" on:click={() => openImageModal(0)}>
							<img src={gallery[0].src} alt={gallery[0].alt} />
							<div class="desktop-overlay">
								<span class="desktop-label">View Full Size</span>
							</div>
						</button>
					</div>
				{:else if gallery.length === 2}
					<!-- Two images side-by-side -->
					<div class="desktop-two-images-grid">
						{#each gallery as image, index}
							<button
								class="desktop-main-image"
								on:click={() => openImageModal(index)}
								style:--delay="{index * 100}ms"
							>
								<img src={image.src} alt={image.alt} />
								<div class="desktop-overlay">
									<span class="desktop-label">Image {index + 1}</span>
								</div>
							</button>
						{/each}
					</div>
				{:else}
					<!-- Multiple images grid (3+) -->
					<div class="desktop-gallery-grid">
						<!-- Featured main image -->
						<div class="desktop-featured-container">
							<button
								class="desktop-main-image"
								on:click={() => openImageModal(0)}
								style:--delay="0ms"
							>
								<img src={gallery[0].src} alt={gallery[0].alt} />
								<div class="desktop-overlay">
									<span class="desktop-label">Main View</span>
								</div>
							</button>
						</div>

						<!-- Thumbnail grid -->
						<div class="desktop-thumbnails-grid">
							{#each gallery.slice(1, 7) as image, index}
								<button
									class="desktop-thumb"
									on:click={() => openImageModal(index + 1)}
									style:--delay="{(index + 1) * 100}ms"
								>
									<img src={image.src} alt={image.alt} />
									<div class="desktop-thumb-overlay">
										<span class="desktop-thumb-number">{index + 2}</span>
									</div>
								</button>
							{/each}
							{#if gallery.length > 7}
								<button
									class="desktop-thumb desktop-more"
									on:click={() => openImageModal(7)}
									style:--delay="700ms"
								>
									<img src={gallery[7].src} alt={gallery[7].alt} />
									<div class="desktop-more-overlay">
										<span class="desktop-more-text">+{gallery.length - 7}</span>
									</div>
								</button>
							{/if}
						</div>
					</div>
				{/if}
			</section>
		{:else}
			<!-- Desktop No Gallery - Compact Header -->
			<header class="project-header">
				<div class="container">
					<div class="project-meta-row">
						<a href="/projects" class="back-link">
							<ArrowLeft size={18} />
							Projects
						</a>

						<div class="project-badges">
							<time class="project-date">
								<Calendar size={16} />
								{formatDate(date)}
							</time>
							{#if featured}
								<span class="featured-badge">Featured</span>
							{/if}
						</div>
					</div>

					<h1 class="project-title">{title}</h1>

					{#if description}
						<p class="project-description">{description}</p>
					{/if}

					{#if technologies && technologies.length > 0}
						<div class="tech-stack">
							{#each technologies as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					{/if}

					<div class="project-actions">
						{#if demo}
							<a href={demo} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
								<ExternalLink size={16} />
								Live Demo
							</a>
						{/if}
						{#if github}
							<a href={github} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
								<Github size={16} />
								Source Code
							</a>
						{/if}
					</div>
				</div>
			</header>
		{/if}
	</div>

	<!-- Mobile Layout -->
	<div class="mobile-only">
		<!-- Compact Header with Metadata -->
		<header class="project-header">
			<div class="container">
				<div class="mobile-header-row">
					<a href="/projects" class="back-link">
						<ArrowLeft size={18} />
						Projects
					</a>

					<time class="mobile-date">
						<Calendar size={14} />
						{formatDate(date)}
					</time>
				</div>

				{#if featured}
					<div class="mobile-featured-badge">
						<span class="featured-badge">Featured</span>
					</div>
				{/if}

				<h1 class="project-title">{title}</h1>

				{#if description}
					<p class="project-description">{description}</p>
				{/if}

				{#if technologies && technologies.length > 0}
					<div class="tech-stack">
						{#each technologies as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
				{/if}

				<div class="project-actions">
					{#if demo}
						<a href={demo} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
							<ExternalLink size={16} />
							Live Demo
						</a>
					{/if}
					{#if github}
						<a href={github} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
							<Github size={16} />
							Source Code
						</a>
					{/if}
				</div>
			</div>
		</header>

		<!-- Mobile Gallery Section -->
		{#if gallery && gallery.length > 0}
			<section class="gallery-section">
				<div class="container">
					{#if gallery.length === 1}
						<!-- Single image - centered showcase -->
						<div class="single-image-showcase">
							<button class="gallery-item single" on:click={() => openImageModal(0)}>
								<img src={gallery[0].src} alt={gallery[0].alt} />
								<div class="gallery-overlay">
									<span class="gallery-label">View Full Size</span>
								</div>
							</button>
						</div>
					{:else}
						<!-- Multiple images - horizontal scroll -->
						<div class="gallery-container">
							<div class="gallery-scroll">
								<div class="gallery-track">
									{#each gallery as image, index}
										<button
											class="gallery-thumb"
											class:active={index === currentImageIndex}
											on:click={() => openImageModal(index)}
										>
											<img src={image.src} alt={image.alt} />
											<div class="thumb-overlay">
												<span class="thumb-number">{index + 1}</span>
											</div>
										</button>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>
			</section>
		{/if}
	</div>

	<!-- Main Content -->
	<main class="project-content">
		<div class="container">
			<div class="markdown-content">
				<slot />
			</div>
		</div>
	</main>
</article>

<!-- Image Modal -->
{#if showImageModal && gallery}
	<div class="image-modal" role="dialog" aria-modal="true" on:click={closeImageModal}>
		<div class="modal-content" on:click|stopPropagation>
			<button class="modal-close" on:click={closeImageModal} aria-label="Close modal"> × </button>

			<div class="modal-image-container">
				<img
					src={gallery[modalImageIndex].src}
					alt={gallery[modalImageIndex].alt}
					class="modal-image"
				/>
				{#if gallery[modalImageIndex].caption}
					<p class="modal-caption">{gallery[modalImageIndex].caption}</p>
				{/if}
			</div>

			{#if gallery.length > 1}
				<div class="modal-navigation">
					<button
						class="modal-nav modal-prev"
						on:click={prevModalImage}
						aria-label="Previous image"
					>
						<ChevronLeft size={20} />
					</button>

					<div class="modal-indicators">
						{#each gallery as _, index}
							<button
								class="modal-dot"
								class:active={index === modalImageIndex}
								on:click={() => (modalImageIndex = index)}
								aria-label="Go to image {index + 1}"
							></button>
						{/each}
					</div>

					<button class="modal-nav modal-next" on:click={nextModalImage} aria-label="Next image">
						<ChevronRight size={20} />
					</button>
				</div>
			{:else}
				<div class="modal-indicators">
					<div class="modal-dot active"></div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ===== CORE LAYOUT ===== */
	.project-detail {
		min-height: 100vh;
		background: var(--color-bg-primary);
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	/* ===== DESKTOP LAYOUT ===== */
	.desktop-header {
		padding: var(--space-8) 0 var(--space-6);
		border-bottom: 1px solid var(--color-border-primary);
		background: var(--color-bg-primary);
	}

	.desktop-header-content {
		max-width: 900px;
		margin: 0 auto;
	}

	.desktop-meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-6);
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.desktop-badges {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.desktop-title {
		font-family: var(--font-serif);
		font-size: clamp(2.5rem, 4vw, 3.5rem);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		line-height: 1.2;
		text-align: center;
	}

	.desktop-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
		line-height: var(--line-height-relaxed);
		text-align: center;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
	}

	.desktop-tech-stack {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-8);
	}

	.desktop-actions {
		display: flex;
		justify-content: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	/* Desktop Gallery Section */
	.desktop-gallery-section {
		padding: var(--space-8) 0;
		/* Removed background to let gallery flow naturally */
	}

	.desktop-single-showcase {
		display: flex;
		justify-content: center;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.desktop-gallery-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: var(--space-6);
		max-width: 1200px;
		margin: 0 auto;
		align-items: start;
		padding: 0 var(--space-4);
	}

	/* Special layout for exactly 2 images */
	.desktop-two-images-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	.desktop-featured-container {
		position: relative;
	}

	.desktop-main-image {
		position: relative;
		width: 100%;
		border-radius: var(--radius-xl);
		overflow: hidden;
		background: transparent;
		border: 3px solid transparent;
		cursor: pointer;
		transition: all var(--transition-fast);
		opacity: 0;
		transform: translateY(30px);
		animation: slideInUp 0.8s ease forwards;
		animation-delay: var(--delay);
	}

	.desktop-main-image:hover {
		border-color: var(--primary-500);
		transform: translateY(-8px);
		box-shadow: 0 20px 40px var(--color-surface-hover);
	}

	.desktop-main-image img {
		width: 100%;
		height: 400px;
		object-fit: cover;
		transition: transform var(--transition-fast);
	}

	.desktop-main-image:hover img {
		transform: scale(1.05);
	}

	.desktop-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(0, 0, 0, 0.3) 0%,
			rgba(0, 0, 0, 0.1) 50%,
			rgba(0, 0, 0, 0.5) 100%
		);
		opacity: 0;
		transition: opacity var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.desktop-main-image:hover .desktop-overlay {
		opacity: 1;
	}

	.desktop-label {
		color: white;
		font-weight: 700;
		font-size: var(--font-size-base);
		text-transform: uppercase;
		letter-spacing: 1px;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(15px);
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-full);
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	}

	/* Desktop Thumbnails */
	.desktop-thumbnails-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-3);
	}

	.desktop-thumb {
		position: relative;
		aspect-ratio: 4/3;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: transparent;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all var(--transition-fast);
		opacity: 0;
		transform: translateX(30px);
		animation: slideInRight 0.6s ease forwards;
		animation-delay: var(--delay);
	}

	.desktop-thumb:hover {
		border-color: var(--primary-500);
		transform: scale(1.05);
		box-shadow: 0 8px 20px var(--color-surface-hover);
		z-index: 10;
	}

	.desktop-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-fast);
	}

	.desktop-thumb:hover img {
		transform: scale(1.1);
	}

	.desktop-thumb-overlay {
		position: absolute;
		top: 8px;
		right: 8px;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
		border-radius: var(--radius-sm);
		padding: 0.25rem 0.5rem;
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.desktop-thumb:hover .desktop-thumb-overlay {
		opacity: 1;
	}

	.desktop-thumb-number {
		color: white;
		font-size: var(--font-size-xs);
		font-weight: 700;
	}

	.desktop-more-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(5px);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
	}

	.desktop-more-text {
		color: white;
		font-weight: 700;
		font-size: var(--font-size-lg);
	}

	@keyframes slideInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideInRight {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* ===== PROJECT HEADER ===== */
	.project-header {
		padding: var(--space-8) 0 var(--space-6);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.project-meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-6);
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		text-decoration: none;
		color: var(--color-text-secondary);
		font-weight: 600;
		font-size: var(--font-size-sm);
		transition: all var(--transition-fast);
	}

	.back-link:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-1px);
	}

	.project-badges {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.project-date {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		font-weight: 500;
	}

	/* Mobile Header Layout */
	.mobile-header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-4);
		gap: var(--space-3);
	}

	.mobile-date {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		font-weight: 500;
		flex-shrink: 0;
	}

	.mobile-featured-badge {
		display: flex;
		justify-content: center;
		margin-bottom: var(--space-3);
	}

	.featured-badge {
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-full);
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 2px 8px var(--color-surface-hover);
	}

	.project-title {
		font-family: var(--font-serif);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		line-height: 1.2;
		text-align: center;
	}

	.project-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
		line-height: var(--line-height-relaxed);
		text-align: center;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
	}

	.tech-stack {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-6);
	}

	.tech-tag {
		padding: 0.375rem 0.75rem;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--primary-600);
		font-weight: 600;
		transition: all var(--transition-fast);
	}

	.tech-tag:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-1px);
	}

	.project-actions {
		display: flex;
		justify-content: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-full);
		text-decoration: none;
		font-weight: 600;
		font-size: var(--font-size-sm);
		transition: all var(--transition-fast);
		border: 1px solid;
		min-width: 140px;
		justify-content: center;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		border-color: var(--primary-500);
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
		transform: translateY(-2px);
		box-shadow: 0 8px 20px var(--color-surface-hover);
	}

	.btn-secondary {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		color: var(--color-text-primary);
		border-color: var(--glass-border);
	}

	.btn-secondary:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--color-surface-hover);
	}

	/* ===== GALLERY SECTION (MOBILE) ===== */
	.gallery-section {
		padding: var(--space-6) 0 var(--space-8);
	}

	/* Single Image Showcase */
	.single-image-showcase {
		display: flex;
		justify-content: center;
	}

	.gallery-item.single {
		max-width: 600px;
		width: 100%;
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: transparent;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.gallery-item.single:hover {
		border-color: var(--primary-500);
		transform: translateY(-4px);
		box-shadow: 0 8px 24px var(--color-surface-hover);
	}

	.gallery-item.single img {
		height: 350px;
		width: 100%;
		object-fit: cover;
		transition: transform var(--transition-fast);
	}

	.gallery-item.single:hover img {
		transform: scale(1.05);
	}

	.gallery-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(0, 0, 0, 0.4) 0%,
			rgba(0, 0, 0, 0.2) 50%,
			rgba(0, 0, 0, 0.6) 100%
		);
		opacity: 0;
		transition: opacity var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gallery-item.single:hover .gallery-overlay {
		opacity: 1;
	}

	.gallery-label {
		color: white;
		font-weight: 600;
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-full);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	/* Mobile Horizontal Scroll */
	.gallery-scroll {
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.gallery-scroll::-webkit-scrollbar {
		display: none;
	}

	.gallery-track {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-2) 0 var(--space-4);
	}

	.gallery-thumb {
		flex-shrink: 0;
		width: 140px;
		height: 100px;
		border-radius: var(--radius-md);
		border: 2px solid transparent;
		overflow: hidden;
		cursor: pointer;
		transition: all var(--transition-fast);
		background: transparent;
		position: relative;
	}

	.gallery-thumb:hover,
	.gallery-thumb.active {
		border-color: var(--primary-500);
		transform: scale(1.05);
		box-shadow: 0 4px 12px var(--color-surface-hover);
	}

	.gallery-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-fast);
	}

	.gallery-thumb:hover img {
		transform: scale(1.1);
	}

	.thumb-overlay {
		position: absolute;
		top: 4px;
		right: 4px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(5px);
		border-radius: var(--radius-sm);
		padding: 0.25rem 0.5rem;
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.gallery-thumb:hover .thumb-overlay {
		opacity: 1;
	}

	.thumb-number {
		color: white;
		font-size: var(--font-size-xs);
		font-weight: 600;
	}

	/* Show/Hide based on screen size */
	.desktop-only {
		display: block;
	}

	.mobile-only {
		display: none;
	}

	/* ===== MAIN CONTENT ===== */
	.project-content {
		padding: var(--space-8) 0;
	}

	.markdown-content {
		font-size: var(--font-size-base);
		line-height: var(--line-height-relaxed);
		color: var(--color-text-primary);
		max-width: 800px;
		margin: 0 auto;
	}

	/* ===== IMAGE MODAL ===== */
	.image-modal {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(10px);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-4);
		cursor: pointer;
	}

	.modal-content {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
		cursor: default;
	}

	.modal-close {
		position: absolute;
		top: -50px;
		right: 0;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		color: white;
		font-size: 24px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
		z-index: 100;
	}

	.modal-close:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}

	.modal-nav {
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
		z-index: 100;
	}

	.modal-nav:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: scale(1.1);
	}

	.modal-navigation {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		margin-top: var(--space-4);
	}

	.modal-image-container {
		text-align: center;
	}

	.modal-image {
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
		border-radius: var(--radius-lg);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
	}

	.modal-caption {
		color: white;
		margin-top: var(--space-3);
		font-size: var(--font-size-sm);
		opacity: 0.9;
	}

	.modal-indicators {
		display: flex;
		justify-content: center;
		gap: var(--space-2);
	}

	.modal-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		border: none;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.modal-dot.active {
		background: white;
		transform: scale(1.3);
	}

	.modal-dot:hover {
		background: rgba(255, 255, 255, 0.7);
	}

	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 1200px) {
		.desktop-gallery-grid {
			grid-template-columns: 1.5fr 1fr;
			gap: var(--space-4);
		}

		.desktop-main-image img {
			height: 350px;
		}
	}

	@media (max-width: 1024px) {
		.desktop-gallery-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.desktop-thumbnails-grid {
			grid-template-columns: repeat(3, 1fr);
			max-width: 600px;
			margin: 0 auto;
		}

		.desktop-main-image img {
			height: 300px;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 var(--space-3);
		}

		.project-header {
			padding: var(--space-6) 0 var(--space-4);
		}

		.project-meta-row {
			flex-direction: column;
			align-items: stretch;
			gap: var(--space-3);
		}

		.project-badges {
			justify-content: center;
		}

		.gallery-section {
			padding: var(--space-6) 0;
		}

		/* Switch to mobile layout on tablets and below */
		.desktop-only {
			display: none;
		}

		.mobile-only {
			display: block;
		}

		.gallery-scroll {
			margin: 0 calc(-1 * var(--space-3));
			padding: 0 var(--space-3);
		}

		/* Center single image on mobile */
		.single-image-showcase .gallery-item.single {
			max-width: 100%;
			margin: 0 auto;
		}

		/* Center gallery track when content is smaller than screen */
		.gallery-track {
			justify-content: center;
			min-width: 100%;
			padding: var(--space-2) var(--space-3) var(--space-4);
		}

		/* But when content overflows, allow left alignment for scrolling */
		.gallery-track:has(.gallery-thumb:nth-child(3)) {
			justify-content: flex-start;
		}

		.project-actions {
			flex-direction: column;
			align-items: center;
		}

		.btn {
			width: 100%;
			max-width: 250px;
		}

		.modal-close {
			top: -40px;
			width: 35px;
			height: 35px;
			font-size: 20px;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}

		.project-title {
			font-size: clamp(1.5rem, 6vw, 2.25rem);
		}

		.gallery-scroll {
			margin: 0 calc(-1 * var(--space-2));
			padding: 0 var(--space-2);
		}

		.gallery-thumb {
			width: 120px;
			height: 80px;
		}

		.tech-stack {
			gap: var(--space-1);
		}

		.tech-tag {
			font-size: var(--font-size-xs);
			padding: 0.25rem 0.5rem;
		}

		.modal-nav {
			width: 35px;
			height: 35px;
		}

		.modal-navigation {
			gap: var(--space-2);
		}

		.modal-content {
			display: flex;
			flex-direction: column;
		}
	}

	/* ===== REDUCED MOTION ===== */
	@media (prefers-reduced-motion: reduce) {
		.desktop-main-image {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.desktop-thumb {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.desktop-main-image:hover img,
		.desktop-thumb:hover img,
		.gallery-item.single:hover img,
		.gallery-thumb:hover img {
			transform: none;
		}

		.btn,
		.back-link,
		.tech-tag,
		.modal-close,
		.modal-nav,
		.modal-dot {
			transition: none;
		}
	}
</style>
