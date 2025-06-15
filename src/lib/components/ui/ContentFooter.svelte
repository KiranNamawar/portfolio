<script lang="ts">
	import {
		ArrowRight,
		Calendar,
		Tag,
		Github,
		ExternalLink,
		Share2,
		Heart,
		Copy,
		Twitter,
		Linkedin,
		Facebook
	} from '$lib/utils/icons.js';
	import { formatDate } from '$lib/utils/date.js';
	import { personalInfo } from '$lib/data/personal.js';
	import type { BlogPost } from '$lib/types/blog.js';
	import type { Project } from '$lib/types/project.js';

	// Props
	export let contentType: 'blog' | 'project' = 'blog';
	export let relatedContent: (BlogPost | Project)[] = [];
	export let currentSlug: string;

	// Reactive values
	$: isProject = contentType === 'project';
	$: currentUrl = typeof window !== 'undefined' ? window.location.href : '';
	// Share functionality
	const shareContent = async () => {
		const title = document.title;
		const url = currentUrl;

		if (navigator.share) {
			try {
				await navigator.share({
					title,
					url
				});
			} catch (err) {
				// Fallback to clipboard
				copyToClipboard(url);
			}
		} else {
			copyToClipboard(url);
		}
	};

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			showToast('Link copied to clipboard!');
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const shareToTwitter = () => {
		const text = encodeURIComponent(document.title);
		const url = encodeURIComponent(currentUrl);
		window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
	};

	const shareToLinkedIn = () => {
		const url = encodeURIComponent(currentUrl);
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
	};

	const shareToFacebook = () => {
		const url = encodeURIComponent(currentUrl);
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
	};

	const showToast = (message: string) => {
		// Remove any existing toast
		const existingToast = document.querySelector('.share-toast');
		if (existingToast) {
			existingToast.remove();
		}

		// Create and show new toast
		const toast = document.createElement('div');
		toast.className = 'share-toast';
		toast.textContent = message;
		document.body.appendChild(toast);

		// Remove toast after animation
		setTimeout(() => {
			if (toast.parentNode) {
				toast.parentNode.removeChild(toast);
			}
		}, 2000);
	};
</script>

<!-- Content Footer - Following BaseContentLayout structure -->
<div class="content-layout">
	<footer class="content-footer">
		<div class="container">
			<!-- Share Section -->
			<div class="share-section-wrapper">
				<div class="share-section">
					<span class="share-label">Found it helpful? Share it:</span>
					<div class="share-buttons">
						<button
							on:click={() => copyToClipboard(currentUrl)}
							class="share-btn"
							title="Copy link"
						>
							<Copy size={16} />
						</button>
						<button on:click={shareToTwitter} class="share-btn" title="Share on Twitter">
							<Twitter size={16} />
						</button>
						<button on:click={shareToLinkedIn} class="share-btn" title="Share on LinkedIn">
							<Linkedin size={16} />
						</button>
						<button on:click={shareToFacebook} class="share-btn" title="Share on Facebook">
							<Facebook size={16} />
						</button>
					</div>
				</div>
			</div>

			<!-- Related Content -->
			{#if relatedContent.length > 0}
				<div class="related-section">
					<h3 class="related-title">You may also like</h3>
					<div class="related-grid">
						{#each relatedContent.slice(0, 3) as item}
							{#if item.slug !== currentSlug}
								<a href="/{isProject ? 'projects' : 'blog'}/{item.slug}" class="related-card">
									<div class="related-content">
										<h4>{item.title}</h4>
										<p>{item.description}</p>
										<div class="related-meta">
											<span>{formatDate(item.date)}</span>
											{#if item.readingTime}
												<span>·</span>
												<span>{item.readingTime} min read</span>
											{/if}
										</div>
									</div>
									<div class="read-more">
										<span>Read more</span>
										<ArrowRight size={16} class="related-arrow" />
									</div>
								</a>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</footer>
</div>

<style>
	/* ===== LAYOUT MATCHING BaseContentLayout ===== */
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

	/* ===== CONTAINER MATCHING BaseContentLayout ===== */
	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 var(--space-1);
	}
	/* ===== FOOTER SECTION ===== */
	.content-footer {
		padding: var(--space-4) 0 var(--space-20);
		position: relative;
	} /* ===== SHARE SECTION WRAPPER ===== */
	.share-section-wrapper {
		padding: var(--space-6) 0;
		border-top: 1px solid var(--color-border-primary);
		border-bottom: 1px solid var(--color-border-primary);
		background: var(--color-surface-subtle);
		border-radius: var(--radius-lg);
		margin: var(--space-4) 0;
	}

	/* ===== SHARE SECTION ===== */
	.share-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		max-width: 80ch;
		margin: 0 auto;
	}
	.share-label {
		color: var(--color-text-primary);
		font-size: var(--font-size-base);
		font-weight: 600;
		text-align: center;
	}

	.share-buttons {
		display: flex;
		gap: var(--space-3);
		justify-content: center;
		flex-wrap: wrap;
	}

	.share-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: var(--color-surface-secondary);
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-full);
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.share-btn:hover {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-400);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	/* ===== RELATED SECTION ===== */
	.related-section {
		padding: var(--space-8) 0 0;
		max-width: 80ch;
		margin: 0 auto;
	}

	.related-title {
		margin: 0 0 var(--space-6) 0;
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--color-text-primary);
		text-align: center;
	}
	.related-grid {
		display: grid;
		gap: var(--space-6);
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {
		.related-grid {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}
	.related-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-6);
		background: var(--color-surface-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-xl);
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.related-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.related-card:hover {
		background: var(--color-surface-tertiary);
		border-color: var(--primary-400);
		transform: translateY(-4px);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
	}

	.related-card:hover::before {
		transform: scaleX(1);
	}
	.related-content {
		flex: 1;
	}

	.related-content h4 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		line-height: 1.3;
	}
	.related-content p {
		margin: 0 0 var(--space-4) 0;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.related-meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--color-text-tertiary);
		font-size: var(--font-size-xs);
		font-weight: 500;
		padding: var(--space-2) var(--space-3);
		background: var(--color-surface-subtle);
		border-radius: var(--radius-full);
		width: fit-content;
	}
	/* ===== READ MORE SECTION ===== */
	.read-more {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--primary-500);
		font-size: var(--font-size-sm);
		font-weight: 600;
		padding: var(--space-2) var(--space-3);
		background: rgba(var(--primary-500-rgb, 249, 115, 22), 0.1);
		border: 1px solid rgba(var(--primary-500-rgb, 249, 115, 22), 0.2);
		border-radius: var(--radius-full);
		transition: all 0.2s ease;
		align-self: flex-end;
		width: fit-content;
	}
	.related-card:hover .read-more {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-400);
	}
	:global(.related-arrow) {
		flex-shrink: 0;
		color: currentColor;
		transition: transform 0.2s ease;
	}

	.related-card:hover :global(.related-arrow) {
		transform: translateX(2px);
	}

	/* ===== TOAST ===== */
	:global(.share-toast) {
		position: fixed;
		bottom: 100px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--color-bg-primary);
		color: var(--color-text-primary);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-primary);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		font-size: var(--font-size-sm);
		z-index: 1000;
		animation: toast-in 0.3s ease-out;
	}

	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translate(-50%, 20px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
	/* ===== RESPONSIVE DESIGN ===== */
	@media (max-width: 768px) {
		.container {
			padding: 0 var(--space-3);
		}

		.share-section-wrapper {
			margin: var(--space-3) 0;
			border-radius: var(--radius-md);
		}

		.share-section {
			gap: var(--space-3);
		}

		.share-label {
			font-size: var(--font-size-sm);
		}

		.share-buttons {
			gap: var(--space-2);
		}

		.share-btn {
			width: 40px;
			height: 40px;
		}

		.related-grid {
			gap: var(--space-4);
		}
		.related-card {
			padding: var(--space-4);
			text-align: center;
		}

		.related-content {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.related-content h4 {
			font-size: var(--font-size-lg);
		}

		.related-meta {
			align-self: center;
		}

		.read-more {
			align-self: center;
		}
	}
	@media (max-width: 480px) {
		.content-footer {
			padding: var(--space-2) 0 var(--space-16);
		}

		.share-buttons {
			justify-content: center;
		}

		.share-btn {
			width: 36px;
			height: 36px;
		}

		.related-card {
			padding: var(--space-3);
		}
	}
</style>
