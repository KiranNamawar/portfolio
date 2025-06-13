<script lang="ts">
	import Image from '$lib/components/ui/Image.svelte';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Enhanced Image Component Demo</title>
	<meta
		name="description"
		content="Demonstration of the enhanced Image component with glassmorphism effects, advanced zoom, pan, and fullscreen capabilities."
	/>
</svelte:head>

<main class="demo-container">
	<div class="demo-header">
		<h1>Enhanced Image Component</h1>
		<p class="demo-description">
			A redesigned Image component inspired by ProjectGallery with glassmorphism effects, advanced
			zoom controls, pan functionality, and fullscreen support.
		</p>
	</div>

	{#if mounted}
		<section class="demo-section">
			<h2>Basic Usage</h2>
			<p>Simple image with glassmorphism hover effects and auto-hide controls:</p>

			<Image
				src="/project-placeholder.svg"
				alt="Basic image demonstration"
				caption="A basic image with glassmorphism effects and hover interactions"
			/>
		</section>

		<section class="demo-section">
			<h2>Custom Dimensions</h2>
			<p>Images with custom width and aspect ratio:</p>

			<div class="image-grid">
				<Image
					src="/blog-placeholder.svg"
					alt="Custom width image"
					width={400}
					aspectRatio="16/9"
					caption="400px width with 16:9 aspect ratio"
				/>

				<Image
					src="/profile.svg"
					alt="Square image"
					width={300}
					aspectRatio="1/1"
					caption="300px square image"
				/>
			</div>
		</section>

		<section class="demo-section">
			<h2>Advanced Lightbox Features</h2>
			<p>Click any image to experience the advanced lightbox with zoom, pan, and fullscreen:</p>

			<div class="feature-showcase">
				<Image
					src="/project-placeholder.svg"
					alt="Advanced lightbox demo"
					caption="Advanced lightbox with zoom (±), pan (drag/arrows), fullscreen (f), and glass effects"
					maxZoom={5}
					enablePan={true}
					enableFullscreen={true}
				/>
			</div>

			<div class="keyboard-shortcuts">
				<h3>Keyboard Shortcuts in Lightbox:</h3>
				<ul>
					<li><kbd>+</kbd> or <kbd>=</kbd> - Zoom in</li>
					<li><kbd>-</kbd> - Zoom out</li>
					<li><kbd>0</kbd> - Reset zoom</li>
					<li><kbd>f</kbd> or <kbd>F</kbd> - Toggle fullscreen</li>
					<li><kbd>Arrow keys</kbd> - Pan when zoomed</li>
					<li><kbd>Escape</kbd> - Close lightbox</li>
				</ul>
			</div>
		</section>

		<section class="demo-section">
			<h2>Disabled Features</h2>
			<p>Images with specific features disabled:</p>

			<div class="image-grid">
				<Image
					src="/blog-placeholder.svg"
					alt="Non-zoomable image"
					zoomable={false}
					caption="Non-zoomable image (no lightbox)"
				/>

				<Image
					src="/profile.svg"
					alt="No lazy loading"
					lazy={false}
					caption="Image without lazy loading"
				/>
			</div>
		</section>

		<section class="demo-section">
			<h2>Responsive Behavior</h2>
			<p>The component adapts to different screen sizes with touch-friendly controls on mobile:</p>

			<Image
				src="/project-placeholder.svg"
				alt="Responsive image"
				caption="This image adapts its hover effects and controls based on screen size"
			/>
		</section>

		<section class="demo-section">
			<h2>Glass Effect System</h2>
			<p>Built-in glassmorphism effects that work with your theme:</p>

			<div class="glass-demo">
				<Image
					src="/blog-placeholder.svg"
					alt="Glass effects demo"
					caption="Auto-hiding glass overlays with backdrop blur and theme-aware styling"
				/>
			</div>
		</section>
	{:else}
		<div class="loading-state">
			<p>Loading demo...</p>
		</div>
	{/if}
</main>

<style>
	.demo-container {
		min-height: 100vh;
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		background: var(--color-background);
		color: var(--color-text-primary);
	}

	.demo-header {
		text-align: center;
		margin-bottom: 3rem;
		padding: 2rem;
		background: var(--glass-bg, rgba(255, 255, 255, 0.1));
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.2));
		border-radius: 1rem;
	}

	.demo-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary, #8b5cf6));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.demo-description {
		font-size: 1.1rem;
		opacity: 0.8;
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
	}

	.demo-section {
		margin-bottom: 4rem;
		padding: 2rem;
		background: var(--color-surface-primary);
		border-radius: 1rem;
		border: 1px solid var(--color-border-primary);
	}

	.demo-section h2 {
		font-size: 1.8rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--color-primary);
	}

	.demo-section p {
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.feature-showcase {
		display: flex;
		justify-content: center;
		margin: 2rem 0;
	}

	.keyboard-shortcuts {
		margin-top: 2rem;
		padding: 1.5rem;
		background: var(--color-surface-secondary);
		border-radius: 0.75rem;
		border: 1px solid var(--color-border-secondary);
	}

	.keyboard-shortcuts h3 {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--color-text-primary);
	}

	.keyboard-shortcuts ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.75rem;
	}

	.keyboard-shortcuts li {
		display: flex;
		align-items: center;
		font-size: 0.9rem;
		opacity: 0.9;
	}

	kbd {
		background: var(--color-surface-tertiary);
		border: 1px solid var(--color-border-secondary);
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		font-family: monospace;
		font-size: 0.75rem;
		font-weight: 600;
		margin-right: 0.5rem;
		color: var(--color-text-primary);
	}

	.glass-demo {
		padding: 2rem;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
	}

	.loading-state {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
		font-size: 1.1rem;
		opacity: 0.6;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.demo-container {
			padding: 1rem;
		}

		.demo-header {
			padding: 1.5rem;
			margin-bottom: 2rem;
		}

		.demo-header h1 {
			font-size: 2rem;
		}

		.demo-section {
			padding: 1.5rem;
			margin-bottom: 2rem;
		}

		.image-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.keyboard-shortcuts ul {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.demo-header h1 {
			font-size: 1.75rem;
		}

		.demo-section {
			padding: 1rem;
		}

		.glass-demo {
			padding: 1rem;
		}
	}
</style>
