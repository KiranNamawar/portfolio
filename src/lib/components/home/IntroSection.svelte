<script lang="ts">
	import { onMount } from 'svelte';
	import { Code, Coffee, Sparkles } from '$lib/utils/icons.js';
	import { personalInfo, heroTypingPhrases } from '../../data/personal.js';

	let typingText = '';
	let currentIndex = 0;
	let isDeleting = false;
	let typeSpeed = 100;
	let introRef: HTMLElement;
	let isVisible = false;

	onMount(() => {
		// Typing animation
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

		// Intersection observer for animations
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (introRef) {
			observer.observe(introRef);
		}

		typeWriter();

		// Terminal animation
		const terminalCommands = [
			'npm install express',
			'git status',
			'npm run dev',
			'node server.js',
			'git push origin main'
		];

		let terminalCommandIndex = 0;
		let terminalText = '';
		let terminalIsDeleting = false;

		function animateTerminal() {
			const commandElement = document.querySelector('.typing-command');
			if (!commandElement) return;

			const currentCommand = terminalCommands[terminalCommandIndex];

			if (terminalIsDeleting) {
				terminalText = currentCommand.substring(0, terminalText.length - 1);
			} else {
				terminalText = currentCommand.substring(0, terminalText.length + 1);
			}

			commandElement.textContent = terminalText;

			let terminalSpeed = terminalIsDeleting ? 30 : 80;

			if (!terminalIsDeleting && terminalText === currentCommand) {
				terminalSpeed = 3000;
				terminalIsDeleting = true;
			} else if (terminalIsDeleting && terminalText === '') {
				terminalIsDeleting = false;
				terminalCommandIndex = (terminalCommandIndex + 1) % terminalCommands.length;
				terminalSpeed = 500;
			}

			setTimeout(animateTerminal, terminalSpeed);
		}

		// Start terminal animation after a delay
		setTimeout(animateTerminal, 2000);
		return () => observer.disconnect();
	});
</script>

<section bind:this={introRef} class="intro-section" class:visible={isVisible} id="intro">
	<div class="intro-content">
		<div class="intro-text">
			<div class="greeting-container">
				<div class="greeting-icon">
					<Sparkles size={24} />
				</div>
				<span class="greeting">Hello there! I'm</span>
			</div>

			<h1 class="name">{personalInfo.name}</h1>

			<div class="role-container">
				<div class="role-prefix">
					<Code size={20} />
					<span>I'm a</span>
				</div>
				<div class="typing-wrapper">
					<span class="typing-text">{typingText}</span>
					<span class="cursor" aria-hidden="true">|</span>
				</div>
			</div>

			<p class="bio">{personalInfo.bio}</p>

			<div class="intro-actions">
				<a href="/projects" class="btn-primary glass-button">
					<span>View My Work</span>
				</a>
				<a href="#connect" class="btn-secondary glass-button">
					<span>Let's Connect</span>
				</a>
			</div>
		</div>
		<div class="intro-visual">
			<!-- 
				TO REPLACE WITH YOUR IMAGE:
				1. Replace the entire .image-placeholder div below with:
				   <img src="/your-image.png" alt="Your Name" class="profile-image" />
				2. Add this CSS for the image:
				   .profile-image {
					   width: 400px;
					   height: 400px;
					   object-fit: cover;
					   border-radius: var(--radius-2xl);
					   box-shadow: 0 12px 35px rgba(var(--primary-500-rgb), 0.15);
				   }
			-->
			<div class="image-placeholder">
				<div class="placeholder-content">
					<div class="placeholder-icon">
						<Code size={48} />
					</div>
					<p class="placeholder-text">Your Image Here</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.intro-section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: var(--space-8) var(--space-6);
		overflow: hidden;
	}
	.intro-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-16);
		align-items: center;
		max-width: 1200px;
		width: 100%;
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.intro-section.visible .intro-content {
		opacity: 1;
		transform: translateY(0);
	} /* Text Content */
	.intro-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
	.greeting-container {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		font-weight: 500;
		justify-content: flex-start;
	}

	.greeting-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		border-radius: var(--radius-full);
		color: white;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.name {
		font-size: clamp(3rem, 8vw, 5rem);
		font-weight: 800;
		line-height: 1.1;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 2;
	}

	.role-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.role-prefix {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.typing-wrapper {
		display: flex;
		align-items: center;
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--color-text-primary);
		min-height: 40px;
	}

	.typing-text {
		color: var(--primary-600);
	}
	.cursor {
		animation: cursor-blink 1s infinite;
		color: var(--primary-500);
		font-weight: 400;
	}

	@keyframes cursor-blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}
	.bio {
		font-size: var(--font-size-lg);
		line-height: 1.6;
		color: var(--color-text-secondary);
		margin: 0;
		max-width: 50ch;
	}
	/* Visual Placeholder */
	.intro-visual {
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
		transform: translateX(50px);
		transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
	}

	.intro-section.visible .intro-visual {
		opacity: 1;
		transform: translateX(0);
	}

	.image-placeholder {
		width: 400px;
		height: 400px;
		border-radius: var(--radius-2xl);
		background: var(--color-surface-secondary);
		border: 2px dashed var(--color-border-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.image-placeholder:hover {
		border-color: var(--primary-500);
		background: var(--color-surface-tertiary);
		transform: translateY(-4px);
		box-shadow: 0 12px 35px rgba(var(--primary-500-rgb), 0.15);
	}

	.placeholder-content {
		text-align: center;
		color: var(--color-text-tertiary);
		transition: all 0.3s ease;
	}

	.image-placeholder:hover .placeholder-content {
		color: var(--primary-500);
		transform: scale(1.05);
	}

	.placeholder-icon {
		margin-bottom: var(--space-3);
		opacity: 0.6;
		transition: all 0.3s ease;
	}

	.image-placeholder:hover .placeholder-icon {
		opacity: 1;
		animation: gentle-pulse 2s ease-in-out infinite;
	}

	.placeholder-text {
		font-size: var(--font-size-lg);
		font-weight: 500;
		margin: 0;
		opacity: 0.8;
	}

	@keyframes gentle-pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
	.intro-actions {
		display: flex;
		gap: var(--space-4);
		margin-top: var(--space-2);
		justify-content: flex-start;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-4) var(--space-6);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-base);
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		border: 1px solid transparent;
	}

	.btn-primary {
		background: var(--primary-500);
		color: white;
		border-color: var(--primary-500);
	}

	.btn-primary:hover {
		background: var(--primary-600);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(var(--primary-500-rgb), 0.3);
	}
	.btn-secondary {
		color: var(--color-text-primary);
		border-color: var(--color-border-primary);
	}

	.btn-secondary:hover {
		background: var(--color-surface-secondary);
		transform: translateY(-2px);
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.intro-content {
			grid-template-columns: 1fr;
			gap: var(--space-12);
			text-align: center;
		}

		.intro-visual {
			order: -1;
		}
		.greeting-container {
			justify-content: center;
		}

		.role-prefix {
			justify-content: center;
		}

		.typing-wrapper {
			justify-content: center;
		}
		.intro-actions {
			justify-content: center;
		}

		.bio {
			margin: 0 auto;
		}

		.image-placeholder {
			width: 300px;
			height: 300px;
		}
	}
	@media (max-width: 768px) {
		.intro-section {
			padding: var(--space-6) var(--space-4);
		}

		.intro-content {
			gap: var(--space-8);
		}

		.intro-actions {
			flex-direction: column;
		}
		.image-placeholder {
			width: 250px;
			height: 250px;
		}

		.bio {
			max-width: none;
		}
	}
	@media (max-width: 480px) {
		.intro-section {
			padding: var(--space-4) var(--space-2);
		}

		.btn-primary,
		.btn-secondary {
			padding: var(--space-3) var(--space-5);
		}

		.image-placeholder {
			width: 200px;
			height: 200px;
		}

		.placeholder-text {
			font-size: var(--font-size-base);
		}
	}
</style>
