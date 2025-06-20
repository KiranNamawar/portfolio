<script context="module" lang="ts">
	// Export custom components that can be used in mdsvex files
	import Callout from '../ui/Callout.svelte';
	import Image from '../ui/Image.svelte';
	export { Callout, Image };
</script>

<script lang="ts">
	import { formatDate } from '$lib/utils/date.js';
	import { ArrowLeft, Calendar } from '$lib/utils/icons.js';
	import ReadingProgress from '$lib/components/ui/ReadingProgress.svelte';
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';
	import ContentDivider from '$lib/components/ui/ContentDivider.svelte';
	// Base props that all content layouts need
	export let title: string;
	export let description: string;
	export let date: string;
	export let pageType: 'Blog' | 'Projects' = 'Blog';
	export let backUrl: string | null = null;
	export let backLabel: string | null = null;

	// Computed values
	$: pageTitle = `${title} | ${pageType}`;
	$: backLinkUrl = pageType === 'Blog' ? '/blog' : '/projects';
	$: backLinkLabel = pageType === 'Blog' ? 'Back to Blog' : 'Back to Projects';
	$: finalBackUrl = backUrl || backLinkUrl;
	$: finalBackLabel = backLabel || backLinkLabel;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
</svelte:head>

<!-- Reading Progress Indicator -->
<ReadingProgress />

<!-- Table of Contents -->
<TableOfContents />

<div class="content-layout">
	<article class="content-detail">
		<!-- Content Header -->
		<header class="content-header">
			<div class="container">
				<div class="content-meta-row">
					<a href={finalBackUrl} class="back-link">
						<ArrowLeft size={18} />
						{finalBackLabel}
					</a>

					<div class="header-actions">
						<time class="content-date">
							<Calendar size={16} />
							{formatDate(date)}
						</time>
						<!-- Slot for additional header actions (like featured badge) -->
						<slot name="header-actions" />
					</div>
				</div>

				<h1 class="content-title">{title}</h1>

				{#if description}
					<p class="content-description">{description}</p>
				{/if}

				<!-- Slot for content-specific metadata (tags, tech stack, etc.) -->
				<slot name="metadata" />

				<!-- Slot for content-specific actions (demo links, etc.) -->
				<slot name="actions" />
			</div>
		</header>
		<!-- Slot for content between header and main content (like gallery) -->
		<slot name="pre-content" />
		<!-- Content Start Divider -->
		<ContentDivider type="start" />
		<!-- Main Content -->
		<main id="main-content" class="content-main">
			<div class="container">
				<div class="prose {pageType === 'Blog' ? 'blog-post-content' : 'project-content'}">
					<slot />
				</div>
			</div>
		</main>

		<!-- Slot for content after main content -->
		<slot name="post-content" />
	</article>
</div>

<style>
	.content-layout {
		margin-left: 0;
		transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Desktop: Account for sidebar */
	@media (min-width: 1024px) {
		.content-layout {
			margin-left: 320px;
		}
	}

	/* Tablet and Mobile: Full width */
	@media (max-width: 1023px) {
		.content-layout {
			margin-left: 0;
		}
	}

	/* ===== CORE LAYOUT ===== */
	.content-detail {
		min-height: 100vh;
		/* Removed solid background to allow neural network background to show through */
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 var(--space-1);
	} /* ===== CONTENT HEADER ===== */
	.content-header {
		padding: var(--space-8) 0 var(--space-6);
		position: relative;
	}

	.content-meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-6);
	}

	.back-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--color-text-secondary);
		text-decoration: none;
		font-size: var(--font-size-sm);
		font-weight: 500;
		transition: all 0.2s ease;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		border: 1px solid transparent;
	}

	.back-link:hover {
		color: var(--color-text-primary);
		background: var(--color-surface-secondary);
		border-color: var(--color-border-primary);
		transform: translateX(-2px);
	}
	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-shrink: 0;
	}

	.content-date {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		font-weight: 500;
		padding: var(--space-2) var(--space-3);
		background: var(--color-surface-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-md);
	}
	.content-title {
		font-size: var(--font-size-4xl);
		font-weight: 800;
		line-height: 1.2;
		text-align: center;
		margin: 0 0 var(--space-4) 0;
		letter-spacing: -0.02em;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
		padding-bottom: var(--space-4);
	}

	.content-title::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 3px;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		border-radius: var(--radius-full);
	}

	.content-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-primary);
		line-height: 1.6;
		text-align: center;
		margin: 0 0 var(--space-6) 0;
		max-width: 80ch;
		font-weight: 500;
		opacity: 0.9;
	}
	/* ===== MAIN CONTENT ===== */
	.content-main {
		padding: 0;
	}
	.prose {
		max-width: 100ch;
		margin: 0 auto;
	} /* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		.content-title {
			font-size: var(--font-size-3xl);
		}

		.content-description {
			font-size: var(--font-size-base);
		}

		.container {
			padding: 0 var(--space-3);
		}

		.content-header {
			padding: var(--space-6) 0 var(--space-4);
		}
		.content-main {
			padding: 0;
		}
	}
	@media (max-width: 480px) {
		.content-title {
			font-size: var(--font-size-2xl);
		}

		.container {
			padding: 0 var(--space-2);
		}
	}
</style>
