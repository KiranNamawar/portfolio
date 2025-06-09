<script lang="ts">	import { Home, FileText, Search, User, Mail } from '@lucide/svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	
	// Navigation items
	const navItems = [
		{ icon: Home, label: 'Home', href: '/', action: 'navigate' },
		{ icon: User, label: 'About', href: '#about', action: 'scroll' },
		{ icon: FileText, label: 'Blog', href: '/blog', action: 'navigate' }
	];

	let mounted = false;

	onMount(() => {
		mounted = true;
	});	// Handle navigation item click
	function handleNavClick(item: typeof navItems[0]) {
		if (item.action === 'navigate') {
			goto(item.href);
		} else if (item.action === 'scroll') {
			// Check if we're on the home page
			if ($page.url.pathname === '/') {
				// Smooth scroll to section
				const targetId = item.href.replace('#', '');
				const element = document.getElementById(targetId);
				if (element) {
					element.scrollIntoView({ 
						behavior: 'smooth',
						block: 'start'
					});
				}
			} else {
				// Navigate to home page with hash, then scroll
				goto('/').then(() => {
					// Small delay to ensure page loads
					setTimeout(() => {
						const targetId = item.href.replace('#', '');
						const element = document.getElementById(targetId);
						if (element) {
							element.scrollIntoView({ 
								behavior: 'smooth',
								block: 'start'
							});
						}
					}, 100);
				});
			}
		}
	}

	// Handle search click
	function handleSearchClick() {
		console.log('Opening search dialog');
		// This would trigger a search modal/dialog
	}
</script>

{#if mounted}
	<!-- Desktop Floating Dock -->
	<nav
		class="floating-dock desktop-dock"
		in:fly={{ y: 100, duration: 500, delay: 300 }}
		aria-label="Main navigation"
	>
		<div class="dock-container">			<!-- Navigation Items -->
			{#each navItems as item}				<button
					class="dock-item"
					class:active={
						($page.url.pathname === '/' && item.href === '/') ||
						($page.url.pathname === item.href && item.action === 'navigate') ||
						($page.url.pathname.startsWith('/blog') && item.href === '/blog')
					}
					onclick={() => handleNavClick(item)}
					aria-label={item.label}
					title={item.label}
				>
					<svelte:component this={item.icon} size={20} />
				</button>
			{/each}

			<!-- Divider -->
			<div class="dock-divider"></div>

			<!-- Search Button -->
			<button
				class="dock-item"
				onclick={handleSearchClick}
				aria-label="Search"
				title="Search"
			>
				<Search size={20} />
			</button><!-- Theme Toggle -->
			<ThemeToggle class="dock-theme-toggle" />
		</div>
	</nav>
	<!-- Mobile Bottom Bar -->
	<nav
		class="floating-dock mobile-dock"
		in:fly={{ y: 100, duration: 500, delay: 300 }}
		aria-label="Mobile navigation"
	>
		<div class="mobile-container">
			<!-- Main Navigation Items -->
			{#each navItems as item}
				<button
					class="mobile-item"
					class:active={
						($page.url.pathname === '/' && item.href === '/') ||
						($page.url.pathname === item.href && item.action === 'navigate') ||
						($page.url.pathname.startsWith('/blog') && item.href === '/blog')
					}
					onclick={() => handleNavClick(item)}
					aria-label={item.label}
				>
					<svelte:component this={item.icon} size={18} />
					<span class="mobile-label">{item.label}</span>
				</button>
			{/each}

			<!-- Search Button -->
			<button
				class="mobile-item"
				onclick={handleSearchClick}
				aria-label="Search"
			>
				<Search size={18} />
				<span class="mobile-label">Search</span>
			</button>

			<!-- Mobile Theme Toggle -->
			<ThemeToggle class="mobile-theme-toggle" />
		</div>
	</nav>
{/if}

<style>
	.floating-dock {
		position: fixed;
		z-index: var(--z-fixed);
		transition: all var(--transition-normal);
	}

	/* Desktop Floating Dock */
	.desktop-dock {
		bottom: var(--space-6);
		left: 50%;
		transform: translateX(-50%);
		display: none;
	}
	.dock-container {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-2) var(--space-3);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: 
			0 8px 32px var(--glass-shadow),
			0 1px 0 rgba(255, 255, 255, 0.1) inset;
	}	.dock-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2);
		width: 40px;
		height: 40px;
		border: none;
		background: transparent;
		color: var(--color-text-secondary);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-decoration: none;
	}
	.dock-item:hover {
		color: var(--color-text-primary);
		transform: translateY(-2px);
	}

	.dock-item.active {
		background: var(--primary-500);
		color: white;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}	.dock-divider {
		width: 1px;
		height: 24px;
		background: rgba(0, 0, 0, 0.3);
		margin: 0 var(--space-1);
	}

	/* Adjust divider for dark mode */
	:global([data-theme="dark"]) .dock-divider {
		background: rgba(255, 255, 255, 0.2);	}

	/* Mobile Bottom Bar */
	.mobile-dock {
		bottom: 0;
		left: 0;
		right: 0;
		display: none;
		border-radius: 0;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		-webkit-backdrop-filter: var(--glass-backdrop);
		border-top: 1px solid var(--glass-border);
		box-shadow: 0 -4px 20px var(--glass-shadow);
	}	.mobile-container {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: var(--space-1) var(--space-2) calc(var(--space-1) + env(safe-area-inset-bottom));
		max-width: 600px;
		margin: 0 auto;
		gap: var(--space-1);
	}	.mobile-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-1);
		min-width: 40px;
		border: none;
		background: transparent;
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
		border-radius: var(--radius-md);
		flex: 1;
		max-width: 60px;
	}
	.mobile-item:hover,
	.mobile-item:active {
		color: var(--color-text-primary);
	}

	.mobile-item.active {
		color: var(--primary-500);
	}	.mobile-label {
		font-size: var(--font-size-3xs);
		margin-top: 2px;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	/* Responsive Breakpoints */
	@media (min-width: 769px) {
		.desktop-dock {
			display: block;
		}
		
		.mobile-dock {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.desktop-dock {
			display: none;
		}
		
		.mobile-dock {
			display: block;
		}
	}
	/* Hover effects for desktop */
	@media (hover: hover) {
		.dock-item:hover {
			transform: translateY(-4px) scale(1.05);
		}
	}
	/* Safe area handling for mobile */
	@supports (padding-bottom: env(safe-area-inset-bottom)) {
		.mobile-container {
			padding-bottom: calc(var(--space-1) + env(safe-area-inset-bottom));
		}
	}
	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.floating-dock,
		.dock-item,
		.mobile-item {
			transition: none;
		}
		
		.dock-item:hover {
			transform: none;
		}
	}
</style>
