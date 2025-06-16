<script lang="ts">
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/ui/SEOHead.svelte';
	import CleanSkillsShowcase from '$lib/components/about/SkillsShowcase.svelte';
	import { personalInfo } from '$lib/data/personal.js';
	import {
		Code,
		TestTube,
		Layers,
		Shield,
		Zap,
		User,
		Target,
		Award,
		BookOpen,
		Coffee,
		Heart,
		Lightbulb
	} from '$lib/utils/icons.js';

	let aboutRef: HTMLElement;
	let isVisible = false;

	const developmentPrinciples = [
		{
			icon: Layers,
			title: 'Clean Architecture',
			description:
				'Learning to build reusable, maintainable components that follow best practices.',
			details: [
				'Component-based architecture',
				'Separation of concerns',
				'Reusable utility functions',
				'Clean code principles'
			],
			color: 'from-blue-500 to-cyan-500'
		},
		{
			icon: TestTube,
			title: 'Testing Mindset',
			description:
				'Understanding the importance of testing and working to implement it in projects.',
			details: [
				'Unit testing fundamentals',
				'Integration testing concepts',
				'Learning testing frameworks',
				'Test-driven development principles'
			],
			color: 'from-green-500 to-emerald-500'
		},
		{
			icon: Shield,
			title: 'Security Awareness',
			description: 'Learning security best practices and implementing them from the start.',
			details: [
				'Input validation and sanitization',
				'Authentication concepts',
				'HTTPS and secure headers',
				'Security best practices'
			],
			color: 'from-red-500 to-pink-500'
		},
		{
			icon: Zap,
			title: 'Performance Focus',
			description: 'Building with modern technologies while keeping performance in mind.',
			details: [
				'Code optimization techniques',
				'Image optimization basics',
				'Understanding caching',
				'Bundle size awareness'
			],
			color: 'from-yellow-500 to-orange-500'
		},
		{
			icon: User,
			title: 'User Experience',
			description: 'Focus on creating applications that work well for users.',
			details: [
				'Responsive design principles',
				'Basic accessibility knowledge',
				'Progressive enhancement',
				'User feedback consideration'
			],
			color: 'from-purple-500 to-violet-500'
		},
		{
			icon: Target,
			title: 'Quality Focus',
			description: 'Striving for high standards and continuous improvement in code quality.',
			details: [
				'Code reviews and feedback',
				'Learning CI/CD concepts',
				'Error handling practices',
				'Performance monitoring basics'
			],
			color: 'from-indigo-500 to-blue-500'
		}
	];

	const personalValues = [
		{
			icon: Lightbulb,
			title: 'Continuous Learning',
			description: 'Always eager to learn new technologies and best practices in development.'
		},
		{
			icon: Heart,
			title: 'Passion for Code',
			description: 'Dedicated to writing clean, maintainable code and improving with every project.'
		},
		{
			icon: User,
			title: 'Team Player',
			description: 'Believing in the power of collaboration and knowledge sharing with others.'
		},
		{
			icon: BookOpen,
			title: 'Documentation',
			description:
				'Understanding the importance of clear documentation for project maintainability.'
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (aboutRef) {
			observer.observe(aboutRef);
		}

		return () => observer.disconnect();
	});
</script>

<SEOHead
	data={{
		title: `About`,
		description: `Learn more about ${personalInfo.name}, a passionate full-stack developer with a focus on backend technologies like Node.js and GraphQL, dedicated to building robust web applications with clean, maintainable code.`,
		keywords: [
			'about',
			'full-stack developer',
			'backend developer',
			'web development',
			'programming'
		],
		type: 'website',
		url: '/about'
	}}
/>

<main id="main-content" class="about-page">
	<!-- Hero Section -->
	<section class="about-hero">
		<div class="container">
			<div class="hero-content">
				<div class="hero-text">
					<h1 class="hero-title">About Me</h1>
					<p class="hero-subtitle">
						Full-stack developer with a passion for backend technologies and clean code
					</p>
				</div>
				<div class="hero-image">
					<div class="profile-card glass-card">
						<div class="profile-avatar">
							<img src="/profile.svg" alt={personalInfo.name} />
						</div>
						<div class="profile-info">
							<h3>{personalInfo.name}</h3>
							<p>{personalInfo.title}</p>
							<div class="profile-location">
								<span>📍 {personalInfo.location}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Bio Section -->
	<section bind:this={aboutRef} class="bio-section" class:visible={isVisible}>
		<div class="container">
			<div class="bio-content">
				<div class="bio-text">
					<h2 class="section-title">My Story</h2>
					<div class="bio-paragraphs">
						<p>{personalInfo.bio}</p>
						<p>{personalInfo.description}</p>
						<p>
							I believe in writing clean, maintainable code and following modern development
							practices. I'm particularly passionate about backend technologies like Node.js,
							GraphQL, and database design, while also enjoying frontend development with React and
							modern JavaScript frameworks.
						</p>
						<p>
							As a fresher developer, I'm constantly learning and working on personal projects to
							improve my skills. I enjoy tackling complex problems and building scalable solutions
							that make a difference.
						</p>
					</div>
				</div>
				<!-- Removed stats section as a fresher -->
			</div>
		</div>
	</section>

	<!-- Development Philosophy Section -->
	<section class="philosophy-section">
		<div class="container">
			<header class="section-header">
				<div class="header-icon">
					<Code size={32} />
				</div>
				<h2 class="section-title">Development Approach</h2>
				<p class="section-subtitle">
					Principles and practices I'm learning and applying in my development journey
				</p>
			</header>

			<div class="principles-grid">
				{#each developmentPrinciples as principle, index}
					<div class="principle-card glass-card" style="animation-delay: {index * 0.1}s">
						<div class="principle-header">
							<div class="principle-icon bg-gradient-to-br {principle.color}">
								<svelte:component this={principle.icon} size={24} />
							</div>
							<h3 class="principle-title">{principle.title}</h3>
						</div>
						<p class="principle-description">{principle.description}</p>
						<ul class="principle-details">
							{#each principle.details as detail}
								<li>{detail}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section id="skills" class="skills-section">
		<CleanSkillsShowcase />
	</section>

	<!-- Values Section -->
	<section class="values-section">
		<div class="container">
			<header class="section-header">
				<div class="header-icon">
					<Heart size={32} />
				</div>
				<h2 class="section-title">Values & Mindset</h2>
				<p class="section-subtitle">
					What drives me as a developer and how I approach learning and growth
				</p>
			</header>

			<div class="values-grid">
				{#each personalValues as value, index}
					<div class="value-card glass-card" style="animation-delay: {index * 0.1}s">
						<div class="value-icon">
							<svelte:component this={value.icon} size={32} />
						</div>
						<h3 class="value-title">{value.title}</h3>
						<p class="value-description">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content glass-card">
				<div class="cta-text">
					<h2>Let's Connect</h2>
					<p>
						Interested in connecting or discussing development? I'm always excited to learn from
						others and explore new opportunities to grow as a developer.
					</p>
				</div>
				<div class="cta-actions">
					<a href="mailto:{personalInfo.email}" class="cta-btn primary">
						<span>Get In Touch</span>
					</a>
					<a href="/projects" class="cta-btn secondary">
						<span>View My Work</span>
					</a>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	.about-page {
		min-height: 100vh;
		padding-top: var(--space-20);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	/* Hero Section */
	.about-hero {
		padding: var(--space-20) 0;
		background: linear-gradient(
			135deg,
			rgba(var(--primary-500-rgb), 0.05) 0%,
			transparent 50%,
			rgba(var(--primary-700-rgb), 0.05) 100%
		);
	}

	.hero-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
		align-items: center;
	}

	@media (min-width: 768px) {
		.hero-content {
			grid-template-columns: 1fr 400px;
		}
	}

	.hero-title {
		font-size: clamp(3rem, 6vw, 4.5rem);
		font-weight: 900;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-4);
	}

	.hero-subtitle {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	.profile-card {
		padding: var(--space-8);
		text-align: center;
		border-radius: var(--radius-2xl);
	}

	.profile-avatar {
		width: 120px;
		height: 120px;
		margin: 0 auto var(--space-4);
		border-radius: 50%;
		overflow: hidden;
		border: 4px solid var(--primary-500);
	}

	.profile-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.profile-info h3 {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.profile-info p {
		color: var(--color-text-secondary);
		margin-bottom: var(--space-3);
	}

	.profile-location {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}

	/* Bio Section */
	.bio-section {
		padding: var(--space-20) 0;
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.bio-section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.bio-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
		align-items: start;
	}

	@media (min-width: 768px) {
		.bio-content {
			grid-template-columns: 2fr 1fr;
		}
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-6);
	}

	.bio-paragraphs p {
		font-size: var(--font-size-lg);
		line-height: 1.7;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-4);
	}

	.bio-stats {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
	}

	.stat-item {
		padding: var(--space-6);
		text-align: center;
		border-radius: var(--radius-xl);
	}

	.stat-number {
		font-size: var(--font-size-3xl);
		font-weight: 900;
		color: var(--primary-600);
		margin-bottom: var(--space-2);
	}

	.stat-label {
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	/* Philosophy Section */
	.philosophy-section {
		padding: var(--space-20) 0;
		background: linear-gradient(
			135deg,
			rgba(var(--primary-500-rgb), 0.02) 0%,
			transparent 50%,
			rgba(var(--primary-700-rgb), 0.02) 100%
		);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-16);
	}

	.header-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		margin: 0 auto var(--space-6);
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		border-radius: var(--radius-2xl);
		color: white;
	}

	.section-subtitle {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		max-width: 60ch;
		margin: 0 auto;
		line-height: 1.6;
	}

	.principles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: var(--space-8);
	}

	.principle-card {
		padding: var(--space-8);
		border-radius: var(--radius-xl);
		transition: all 0.3s ease;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 0.8s ease forwards;
	}

	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.principle-card:hover {
		transform: translateY(-5px);
	}

	.principle-header {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-bottom: var(--space-4);
	}

	.principle-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		border-radius: var(--radius-lg);
		color: white;
		flex-shrink: 0;
	}

	.principle-title {
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin: 0;
	}

	.principle-description {
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-4);
	}

	.principle-details {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.principle-details li {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		padding: var(--space-2) 0;
		border-bottom: 1px solid rgba(var(--color-border-rgb), 0.1);
		position: relative;
		padding-left: var(--space-6);
	}

	.principle-details li:before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--primary-500);
		font-weight: bold;
	}

	.principle-details li:last-child {
		border-bottom: none;
	}

	/* Skills Section */
	.skills-section {
		padding: var(--space-20) 0;
	}

	/* Values Section */
	.values-section {
		padding: var(--space-20) 0;
		background: linear-gradient(
			135deg,
			rgba(var(--primary-500-rgb), 0.02) 0%,
			transparent 50%,
			rgba(var(--primary-700-rgb), 0.02) 100%
		);
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-6);
	}

	.value-card {
		padding: var(--space-8);
		border-radius: var(--radius-xl);
		text-align: center;
		transition: all 0.3s ease;
		opacity: 0;
		transform: translateY(30px);
		animation: fadeInUp 0.8s ease forwards;
	}

	.value-card:hover {
		transform: translateY(-3px);
	}

	.value-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		margin: 0 auto var(--space-4);
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		border-radius: var(--radius-lg);
		color: white;
	}

	.value-title {
		font-size: var(--font-size-lg);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}

	.value-description {
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	/* CTA Section */
	.cta-section {
		padding: var(--space-20) 0;
	}

	.cta-content {
		padding: var(--space-12);
		border-radius: var(--radius-2xl);
		text-align: center;
		background: linear-gradient(
			135deg,
			rgba(var(--primary-500-rgb), 0.1) 0%,
			rgba(var(--primary-700-rgb), 0.05) 100%
		);
	}

	.cta-text h2 {
		font-size: var(--font-size-3xl);
		font-weight: 800;
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
	}

	.cta-text p {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-8);
		max-width: 60ch;
		margin-left: auto;
		margin-right: auto;
	}

	.cta-actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		flex-wrap: wrap;
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-8);
		border-radius: var(--radius-full);
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		border: 2px solid transparent;
	}

	.cta-btn.primary {
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
	}

	.cta-btn.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(var(--primary-500-rgb), 0.3);
	}

	.cta-btn.secondary {
		background: transparent;
		color: var(--primary-600);
		border-color: var(--primary-500);
	}

	.cta-btn.secondary:hover {
		background: var(--primary-500);
		color: white;
		transform: translateY(-2px);
	}

	/* Gradient classes */
	.bg-gradient-to-br {
		background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
	}

	.from-blue-500 {
		--tw-gradient-from: #3b82f6;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-cyan-500 {
		--tw-gradient-to: #06b6d4;
	}
	.from-green-500 {
		--tw-gradient-from: #22c55e;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-emerald-500 {
		--tw-gradient-to: #10b981;
	}
	.from-red-500 {
		--tw-gradient-from: #ef4444;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-pink-500 {
		--tw-gradient-to: #ec4899;
	}
	.from-yellow-500 {
		--tw-gradient-from: #eab308;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-orange-500 {
		--tw-gradient-to: #f97316;
	}
	.from-purple-500 {
		--tw-gradient-from: #a855f7;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-violet-500 {
		--tw-gradient-to: #8b5cf6;
	}
	.from-indigo-500 {
		--tw-gradient-from: #6366f1;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.to-blue-500 {
		--tw-gradient-to: #3b82f6;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.about-page {
			padding-top: var(--space-16);
		}

		.about-hero,
		.bio-section,
		.philosophy-section,
		.skills-section,
		.values-section,
		.cta-section {
			padding: var(--space-12) 0;
		}

		.container {
			padding: 0 var(--space-4);
		}

		.principles-grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}

		.values-grid {
			grid-template-columns: 1fr;
			gap: var(--space-4);
		}

		.cta-actions {
			flex-direction: column;
			align-items: center;
		}

		.cta-btn {
			width: 100%;
			max-width: 300px;
			justify-content: center;
		}
	}
</style>
