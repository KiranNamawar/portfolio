<script lang="ts">
	import { onMount } from 'svelte';
	import { personalInfo, heroTypingPhrases } from '../../data/personal.js';

	let typingText = '';
	let currentIndex = 0;
	let isDeleting = false;
	let typeSpeed = 100;
	onMount(() => {
		function typeWriter() {
			const currentPhrase = heroTypingPhrases[currentIndex];

			if (isDeleting) {
				typingText = currentPhrase.substring(0, typingText.length - 1);
			} else {
				typingText = currentPhrase.substring(0, typingText.length + 1);
			}

			typeSpeed = isDeleting ? 50 : 100;

			if (!isDeleting && typingText === currentPhrase) {
				typeSpeed = 2000;
				isDeleting = true;
			} else if (isDeleting && typingText === '') {
				isDeleting = false;
				currentIndex = (currentIndex + 1) % heroTypingPhrases.length;
				typeSpeed = 500;
			}

			setTimeout(typeWriter, typeSpeed);
		}

		typeWriter();
	});
</script>

<section class="hero-section" id="hero">
	<div class="hero-background">
		<div class="particles" aria-hidden="true"></div>
		<div class="gradient-overlay"></div>
	</div>

	<div class="hero-content">
		<div class="hero-text">
			<h1 class="hero-title">
				<span class="greeting">Hello, I'm</span>
				<span class="name">{personalInfo.name}</span>
			</h1>

			<div class="hero-subtitle">
				<span class="typing-container">
					<span class="typing-text">{typingText}</span>
					<span class="cursor" aria-hidden="true">|</span>
				</span>
			</div>

			<p class="hero-description">
				{personalInfo.bio}
			</p>

			<div class="hero-actions">
				<a href="/projects" class="btn btn-primary glass-button">
					<span>View My Work</span>
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>

				<a href="#contact" class="btn btn-secondary glass-button">
					<span>Get In Touch</span>
					<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
				</a>
			</div>
		</div>

		<div class="hero-image">
			<div class="profile-container">
				<div class="profile-ring"></div>
				<div class="profile-image">
					<img src="/profile.svg" alt="Kiran's Profile" />
				</div>
				<div class="floating-elements" aria-hidden="true">
					<div class="floating-element element-1">💻</div>
					<div class="floating-element element-2">🚀</div>
					<div class="floating-element element-3">⚡</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: var(--space-8) var(--space-4);
	}

	.hero-background {
		position: absolute;
		inset: 0;
		z-index: -1;
	}

	.particles {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.1) 0%, transparent 50%);
		animation: float 20s ease-in-out infinite;
	}

	.gradient-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			var(--color-bg-primary) 0%,
			transparent 50%,
			var(--color-bg-primary) 100%
		);
		opacity: 0.8;
	}

	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-12);
		align-items: center;
		max-width: 1200px;
		width: 100%;
		z-index: 1;
	}

	.hero-text {
		text-align: left;
	}

	.hero-title {
		margin-bottom: var(--space-6);
	}

	.greeting {
		display: block;
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		font-weight: var(--font-weight-normal);
		margin-bottom: var(--space-2);
	}

	.name {
		display: block;
		font-size: var(--font-size-6xl);
		font-weight: var(--font-weight-bold);
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.1;
	}

	.hero-subtitle {
		margin-bottom: var(--space-6);
		height: 3rem;
		display: flex;
		align-items: center;
	}
	.typing-container {
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-semibold);
	}

	.typing-text {
		background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-style: italic;
	}

	.cursor {
		animation: blink 1s infinite;
		color: var(--primary-500);
		font-weight: var(--font-weight-bold);
	}

	.hero-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: var(--line-height-relaxed);
		margin-bottom: var(--space-8);
		max-width: 500px;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-6);
		border-radius: var(--radius-full);
		text-decoration: none;
		font-weight: var(--font-weight-medium);
		transition: all var(--transition-fast);
		border: 1px solid transparent;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		box-shadow: 0 4px 12px rgba(var(--primary-500-rgb), 0.3);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(var(--primary-500-rgb), 0.4);
	}

	.btn-secondary {
		background: var(--glass-bg);
		backdrop-filter: var(--glass-backdrop);
		border-color: var(--glass-border);
		color: var(--color-text-primary);
	}

	.btn-secondary:hover {
		transform: translateY(-2px);
		border-color: var(--primary-400);
	}

	.icon {
		width: 1.25rem;
		height: 1.25rem;
		stroke-width: 2;
	}

	.hero-image {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.profile-container {
		position: relative;
		width: 300px;
		height: 300px;
	}

	.profile-ring {
		position: absolute;
		inset: -10px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		animation: rotate 10s linear infinite;
		opacity: 0.8;
	}

	.profile-image {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		background: var(--color-bg-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-6xl);
		z-index: 1;
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.profile-container:hover .profile-image img {
		transform: scale(1.05);
	}

	.floating-elements {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.floating-element {
		position: absolute;
		font-size: 2rem;
		animation: float 3s ease-in-out infinite;
		opacity: 0.8;
	}

	.element-1 {
		top: 10%;
		left: 10%;
		animation-delay: 0s;
	}

	.element-2 {
		top: 20%;
		right: 10%;
		animation-delay: 1s;
	}
	.element-3 {
		bottom: 20%;
		left: 20%;
		animation-delay: 2s;
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-content {
			grid-template-columns: 1fr;
			gap: var(--space-8);
			text-align: center;
		}

		.hero-text {
			text-align: center;
			order: 2;
		}

		.hero-image {
			order: 1;
		}

		.profile-container {
			width: 200px;
			height: 200px;
		}

		.name {
			font-size: var(--font-size-4xl);
		}
		.hero-subtitle {
			display: flex;
			justify-content: center;
		}

		.typing-container {
			font-size: var(--font-size-xl);
		}
		.hero-description {
			margin-left: auto;
			margin-right: auto;
		}

		.hero-actions {
			justify-content: center;
		}

		.btn {
			padding: var(--space-3) var(--space-5);
		}
	}

	@media (max-width: 480px) {
		.hero-section {
			padding: var(--space-4) var(--space-2);
		}

		.profile-container {
			width: 150px;
			height: 150px;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.btn {
			width: 100%;
			max-width: 200px;
			justify-content: center;
		}
	}
</style>
