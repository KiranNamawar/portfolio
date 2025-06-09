<script lang="ts">
	// Component demo page for the portfolio
</script>

<div class="hero">
	<div class="hero-content">
		<h1 class="hero-title">Welcome to Your Portfolio</h1>
		<p class="hero-description">
			A modern portfolio built with Svelte 5, featuring beautiful typography with Nunito Sans and Playfair Display fonts, glassmorphism design, and dark/light mode support.
		</p>
		
		<div class="typography-showcase">
			<h2>Typography Showcase</h2>
			<h3>This is a heading using Playfair Display serif font</h3>
			<p>This paragraph uses Nunito Sans, a clean and modern sans-serif font perfect for body text. It's highly readable and works great for interfaces.</p>
			<h4>Different heading levels</h4>
			<p>The serif font (Playfair Display) is used for all headings, while the sans-serif font (Nunito Sans) is used for body text, creating a beautiful typographic hierarchy.</p>
		</div>
		
		<div class="glass-card-demo">
			<h3>Glass Card Example</h3>
			<p>This is an example of a glass morphism card component using the design system.</p>
			<div class="card-features">
				<span class="feature">✨ Glassmorphism Design</span>
				<span class="feature">🎨 Beautiful Typography</span>
				<span class="feature">🌙 Dark/Light Mode</span>
				<span class="feature">📱 Responsive</span>
				<span class="feature">♿ Accessible</span>
			</div>
		</div>
	</div>
</div>

<style>
	.hero {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - var(--space-20));
		text-align: center;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-family: var(--font-serif);
		font-size: var(--font-size-4xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--space-4);
		background: linear-gradient(135deg, var(--primary-600), var(--primary-400));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: var(--line-height-tight);
	}

	.hero-description {
		font-family: var(--font-sans);
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-8);
	}

	.typography-showcase {
		margin: var(--space-8) 0;
		padding: var(--space-6);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		text-align: left;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.typography-showcase h2 {
		font-family: var(--font-serif);
		color: var(--primary-600);
		margin-bottom: var(--space-4);
	}

	.typography-showcase h3,
	.typography-showcase h4 {
		font-family: var(--font-serif);
		margin-bottom: var(--space-3);
	}

	.typography-showcase p {
		font-family: var(--font-sans);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-4);
	}

	.glass-card-demo {
		margin-top: var(--space-8);
		padding: var(--space-6);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: 0 8px 32px var(--glass-shadow);
		text-align: left;
	}

	.glass-card-demo h3 {
		font-family: var(--font-serif);
		font-size: var(--font-size-xl);
		margin-bottom: var(--space-3);
		color: var(--color-text-primary);
	}

	.glass-card-demo p {
		font-family: var(--font-sans);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-4);
		line-height: var(--line-height-relaxed);
	}

	.card-features {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.feature {
		font-family: var(--font-sans);
		padding: var(--space-2) var(--space-3);
		background: rgba(59, 130, 246, 0.1);
		color: var(--primary-600);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		border: 1px solid rgba(59, 130, 246, 0.2);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.hero-title {
			font-size: var(--font-size-3xl);
		}

		.hero-description {
			font-size: var(--font-size-base);
		}

		.glass-card-demo {
			padding: var(--space-4);
		}

		.card-features {
			flex-direction: column;
		}
	}

	/* Dark mode adjustments */
	:global([data-theme="dark"]) .feature {
		background: rgba(59, 130, 246, 0.2);
		color: var(--primary-400);
		border-color: rgba(59, 130, 246, 0.3);
	}
</style>
