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
			<div class="profile-image-container">
				<div class="profile-image-frame">
					<div class="profile-image-glow"></div>
					<img
						src="/ProfilePicture.jpg"
						alt={personalInfo.name}
						class="profile-image"
						loading="lazy"
					/>
					<div class="profile-image-overlay"></div>
				</div>
				<div class="floating-elements">
					<div class="floating-element element-1">
						<Code size={20} />
					</div>
					<div class="floating-element element-2">
						<Coffee size={18} />
					</div>
					<div class="floating-element element-3">
						<Sparkles size={16} />
					</div>
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
	/* Profile Image Styles */
	.profile-image-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.profile-image-frame {
		position: relative;
		width: 400px;
		height: 400px;
		border-radius: var(--radius-full);
		padding: 8px;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600), var(--primary-700));
		box-shadow:
			0 20px 40px rgba(var(--primary-500-rgb), 0.2),
			0 8px 16px rgba(0, 0, 0, 0.1);
		animation: gentle-float 6s ease-in-out infinite;
	}

	.profile-image-glow {
		position: absolute;
		inset: -20px;
		border-radius: var(--radius-full);
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		opacity: 0.3;
		filter: blur(20px);
		animation: glow-pulse 4s ease-in-out infinite alternate;
		z-index: -1;
	}
	.profile-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius-full);
		position: relative;
		z-index: 2;
		/* Artistic Film Look - Vintage Cinematic */
		/* filter: 
			contrast(1.3) 
			saturate(0.8) 
			brightness(1.1)
			sepia(0.15)
			hue-rotate(10deg)
			drop-shadow(0 0 20px rgba(255, 165, 0, 0.3)); */
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

		/* Alternative filter options - uncomment one at a time */

		/* Cyberpunk Neon Look */
		/* filter: 
			contrast(1.4) 
			saturate(1.6) 
			brightness(1.2)
			hue-rotate(270deg)
			drop-shadow(0 0 30px rgba(0, 255, 255, 0.5))
			drop-shadow(0 0 15px rgba(255, 0, 255, 0.3)); */

		/* Black & White Dramatic */
		filter: grayscale(1) contrast(1.5) brightness(1.1)
			drop-shadow(0 0 25px rgba(255, 255, 255, 0.4));

		/* Black & White Dramatic */
		/* filter: 
			grayscale(1) 
			contrast(1.5) 
			brightness(1.1)
			drop-shadow(0 0 25px rgba(255, 255, 255, 0.4)); */

		/* Warm Golden Hour */
		/* filter: 
			contrast(1.2) 
			saturate(1.4) 
			brightness(1.15)
			sepia(0.3)
			hue-rotate(25deg)
			drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)); */

		/* Cool Blue Tint */
		/* filter: 
			contrast(1.25) 
			saturate(1.1) 
			brightness(1.05)
			hue-rotate(200deg)
			drop-shadow(0 0 25px rgba(0, 150, 255, 0.4)); */

		/* Retro Polaroid */
		/* filter: 
			contrast(1.1) 
			saturate(1.3) 
			brightness(1.2)
			sepia(0.2)
			blur(0.3px)
			drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)); */

		/* Matrix Green */
		/* filter: 
			contrast(1.4) 
			saturate(0.7) 
			brightness(1.1)
			hue-rotate(90deg)
			drop-shadow(0 0 20px rgba(0, 255, 0, 0.5)); */
		/* Dreamy Soft Focus */
		/* filter: 
			contrast(0.9) 
			saturate(1.3) 
			brightness(1.2)
			blur(0.8px)
			drop-shadow(0 0 30px rgba(255, 192, 203, 0.4)); */
	}

	.profile-image-overlay {
		position: absolute;
		inset: 8px;
		border-radius: var(--radius-full);
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.1) 0%,
			rgba(255, 255, 255, 0.05) 50%,
			rgba(0, 0, 0, 0.1) 100%
		);
		pointer-events: none;
		z-index: 3;
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}
	.profile-image-frame:hover .profile-image {
		/* Enhanced Vintage Cinematic on Hover */
		/* filter: 
			contrast(1.4) 
			saturate(0.9) 
			brightness(1.2)
			sepia(0.25)
			hue-rotate(15deg)
			drop-shadow(0 0 30px rgba(255, 165, 0, 0.5))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */
		transform: scale(1.02);

		/* Hover effects for other filters - match with main filter */

		/* Cyberpunk Hover */
		/* filter: 
			contrast(1.5) 
			saturate(1.8) 
			brightness(1.3)
			hue-rotate(280deg)
			drop-shadow(0 0 40px rgba(0, 255, 255, 0.7))
			drop-shadow(0 0 20px rgba(255, 0, 255, 0.5))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */

		/* B&W to Original Color Hover - Reveals full color on hover */
		filter: grayscale(0) contrast(1.2) saturate(1.3) brightness(1.15)
			drop-shadow(0 0 30px rgba(var(--primary-500-rgb), 0.4))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3));

		/* B&W Dramatic Hover */
		/* filter: 
			grayscale(1) 
			contrast(1.7) 
			brightness(1.2)
			drop-shadow(0 0 35px rgba(255, 255, 255, 0.6))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */

		/* Golden Hour Hover */
		/* filter: 
			contrast(1.3) 
			saturate(1.6) 
			brightness(1.25)
			sepia(0.4)
			hue-rotate(30deg)
			drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */

		/* Cool Blue Hover */
		/* filter: 
			contrast(1.35) 
			saturate(1.3) 
			brightness(1.15)
			hue-rotate(210deg)
			drop-shadow(0 0 35px rgba(0, 150, 255, 0.6))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */

		/* Retro Polaroid Hover */
		/* filter: 
			contrast(1.2) 
			saturate(1.5) 
			brightness(1.3)
			sepia(0.3)
			blur(0.2px)
			drop-shadow(0 0 25px rgba(255, 255, 255, 0.5))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */

		/* Matrix Green Hover */
		/* filter: 
			contrast(1.5) 
			saturate(0.9) 
			brightness(1.2)
			hue-rotate(95deg)
			drop-shadow(0 0 30px rgba(0, 255, 0, 0.7))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */
		/* Dreamy Soft Focus Hover */
		/* filter: 
			contrast(1.0) 
			saturate(1.5) 
			brightness(1.3)
			blur(0.5px)
			drop-shadow(0 0 40px rgba(255, 192, 203, 0.6))
			drop-shadow(0 8px 16px rgba(var(--primary-500-rgb), 0.3)); */
	}

	.profile-image-frame:hover .profile-image-overlay {
		opacity: 0.9;
	}

	.profile-image-frame:hover .profile-image-glow {
		opacity: 0.5;
		transform: scale(1.1);
	}

	/* Floating Elements */
	.floating-elements {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.floating-element {
		position: absolute;
		width: 50px;
		height: 50px;
		background: rgba(var(--glass-overlay-bg-rgb, 255, 255, 255), 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(var(--glass-overlay-border-rgb, 255, 255, 255), 0.2);
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--primary-500);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		animation: float-around 12s ease-in-out infinite;
	}

	.element-1 {
		top: 20%;
		right: -10%;
		animation-delay: 0s;
		background: rgba(var(--primary-500-rgb), 0.1);
	}

	.element-2 {
		bottom: 30%;
		left: -15%;
		animation-delay: -4s;
		background: rgba(var(--primary-600-rgb), 0.1);
	}

	.element-3 {
		top: 60%;
		right: 10%;
		animation-delay: -8s;
		background: rgba(var(--primary-700-rgb), 0.1);
	}

	@keyframes gentle-float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		33% {
			transform: translateY(-10px) rotate(1deg);
		}
		66% {
			transform: translateY(5px) rotate(-1deg);
		}
	}

	@keyframes glow-pulse {
		0% {
			opacity: 0.2;
			transform: scale(0.95);
		}
		100% {
			opacity: 0.4;
			transform: scale(1.05);
		}
	}

	@keyframes float-around {
		0%,
		100% {
			transform: translateY(0px) translateX(0px) rotate(0deg);
		}
		25% {
			transform: translateY(-20px) translateX(10px) rotate(90deg);
		}
		50% {
			transform: translateY(-10px) translateX(-15px) rotate(180deg);
		}
		75% {
			transform: translateY(15px) translateX(5px) rotate(270deg);
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

		.profile-image-frame {
			width: 300px;
			height: 300px;
		}

		.floating-element {
			width: 40px;
			height: 40px;
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

		.profile-image-frame {
			width: 250px;
			height: 250px;
		}

		.floating-element {
			width: 35px;
			height: 35px;
		}

		.element-1 {
			right: -5%;
		}

		.element-2 {
			left: -10%;
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

		.profile-image-frame {
			width: 200px;
			height: 200px;
		}

		.floating-element {
			width: 30px;
			height: 30px;
		}

		.element-1,
		.element-2,
		.element-3 {
			display: none; /* Hide floating elements on very small screens */
		}
	}
</style>
