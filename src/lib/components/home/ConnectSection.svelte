<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import {
		Mail,
		MessageCircle,
		Send,
		Github,
		Linkedin,
		Twitter,
		MapPin,
		Coffee
	} from '$lib/utils/icons.js';
	import { personalInfo, contactInfo, socialLinks } from '../../data/personal.js';
	let connectRef: HTMLElement;
	let isVisible = false;
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let formData = {
		name: '',
		email: '',
		message: ''
	};
	const socialIcons: Record<string, any> = {
		GitHub: Github,
		LinkedIn: Linkedin,
		Twitter: Twitter
	};
	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Validate form data
		if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
			submitStatus = 'error';
			setTimeout(() => {
				submitStatus = 'idle';
			}, 3000);
			return;
		}

		// Set submitting state
		isSubmitting = true;
		submitStatus = 'idle';
		try {
			const form = event.target as HTMLFormElement;

			// Create a hidden iframe for form submission
			const iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.name = 'pageclip-frame';
			document.body.appendChild(iframe);

			// Set form target to iframe
			form.target = 'pageclip-frame';

			// Submit form naturally to Pageclip
			form.submit();

			// Wait a moment, then assume success
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Clean up
			document.body.removeChild(iframe);
			form.target = '';

			// Show success
			submitStatus = 'success';
			formData = { name: '', email: '', message: '' };
		} catch (error) {
			console.error('Error submitting form:', error);
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
			// Reset status after 5 seconds for success, 3 seconds for error
			setTimeout(
				() => {
					submitStatus = 'idle';
				},
				submitStatus === 'success' ? 5000 : 3000
			);
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (connectRef) {
			observer.observe(connectRef);
		}

		return () => observer.disconnect();
	});
</script>

<section bind:this={connectRef} class="connect-section" class:visible={isVisible} id="connect">
	<div class="container">
		<header class="section-header">
			<div class="header-icon">
				<MessageCircle size={32} />
			</div>
			<h2 class="section-title">Let's Connect</h2>
			<p class="section-subtitle">
				Ready to collaborate? Let's discuss your next project or just say hello!
			</p>
		</header>

		<div class="connect-content">
			<!-- Contact Form -->
			<div class="contact-form-container">
				{#if submitStatus === 'success'}
					<!-- Success Message -->
					<div
						class="contact-form glass-card success-state"
						in:fly={{ y: 20, duration: 500 }}
						out:fly={{ y: -20, duration: 300 }}
					>
						<div class="success-content">
							<div class="success-icon" in:scale={{ duration: 600, delay: 200 }}>
								<svg
									width="48"
									height="48"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="2"
										fill="none"
									/>
									<path
										d="m9 12 2 2 4-4"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<h3 class="success-title" in:fly={{ y: 10, duration: 400, delay: 300 }}>
								Message Sent Successfully!
							</h3>
							<p class="success-message" in:fly={{ y: 10, duration: 400, delay: 400 }}>
								Thank you for reaching out! I've received your message and will get back to you
								ASAP. I'm excited to learn more about your project and discuss how we can work
								together.
							</p>
							<div class="success-actions" in:fly={{ y: 10, duration: 400, delay: 500 }}>
								<button
									class="success-button glass-button"
									on:click={() => {
										submitStatus = 'idle';
										formData = { name: '', email: '', message: '' };
									}}
								>
									<Mail size={18} />
									<span>Send Another Message</span>
								</button>
								<a href="mailto:{personalInfo.email}" class="direct-email-link">
									Or email me directly
								</a>
							</div>
						</div>
					</div>
				{:else}
					<!-- Contact Form -->
					<form
						class="contact-form glass-card"
						on:submit={handleSubmit}
						in:fly={{ y: 20, duration: 500 }}
						out:fly={{ y: -20, duration: 300 }}
						action="https://send.pageclip.co/d4DAOIRKs8mubvbpOB6Qlpm2FbG0Vpbz/default"
						method="post"
					>
						<h3 class="form-title">Send a Message</h3>

						<div class="form-group">
							<label for="name">Your Name</label>
							<input
								type="text"
								id="name"
								name="name"
								bind:value={formData.name}
								placeholder="Enter your name"
								required
								disabled={isSubmitting}
							/>
						</div>

						<div class="form-group">
							<label for="email">Email Address</label>
							<input
								type="email"
								id="email"
								name="email"
								bind:value={formData.email}
								placeholder="your.email@example.com"
								required
								disabled={isSubmitting}
							/>
						</div>

						<div class="form-group">
							<label for="message">Message</label>
							<textarea
								id="message"
								name="message"
								bind:value={formData.message}
								placeholder="Tell me about your project or just say hello..."
								rows="5"
								required
								disabled={isSubmitting}
							></textarea>
						</div>

						{#if submitStatus === 'error'}
							<div class="form-message error">
								<span>Failed to send message. Please try again or email me directly.</span>
							</div>
						{/if}

						<button
							type="submit"
							class="submit-btn glass-button"
							disabled={isSubmitting}
							class:submitting={isSubmitting}
							class:error={submitStatus === 'error'}
						>
							{#if isSubmitting}
								<div class="spinner"></div>
								<span>Sending...</span>
							{:else if submitStatus === 'error'}
								<span>Try Again</span>
							{:else}
								<Send size={18} />
								<span>Send Message</span>
							{/if}
						</button>
					</form>
				{/if}
			</div>

			<!-- Contact Info -->
			<div class="contact-info">
				<div class="info-card glass-card" style="animation-delay: 0.2s">
					<h3 class="info-title">Get In Touch</h3>
					<p class="info-description">
						I'm always interested in hearing about new opportunities and exciting projects.
					</p>

					<div class="contact-methods">
						<a href="mailto:{personalInfo.email}" class="contact-method">
							<div class="method-icon">
								<Mail size={20} />
							</div>
							<div class="method-content">
								<span class="method-label">Email</span>
								<span class="method-value">{personalInfo.email}</span>
							</div>
						</a>

						<div class="contact-method">
							<div class="method-icon">
								<MapPin size={20} />
							</div>
							<div class="method-content">
								<span class="method-label">Location</span>
								<span class="method-value">{personalInfo.location}</span>
							</div>
						</div>

						<div class="contact-method">
							<div class="method-icon">
								<Coffee size={20} />
							</div>
							<div class="method-content">
								<span class="method-label">Coffee Chat</span>
								<span class="method-value">Always up for a good conversation</span>
							</div>
						</div>
					</div>
				</div>

				<div class="social-card glass-card" style="animation-delay: 0.4s">
					<h3 class="social-title">Follow Along</h3>
					<p class="social-description">
						Connect with me on social media for updates and insights.
					</p>

					<div class="social-links">
						{#each socialLinks as social}
							{@const IconComponent = socialIcons[social.platform]}
							{#if IconComponent}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class="social-link glass-control-btn"
									aria-label={`Follow on ${social.platform}`}
								>
									<svelte:component this={IconComponent} size={20} />
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.connect-section {
		padding: var(--space-20) 0;
		position: relative;
		background: linear-gradient(
			135deg,
			rgba(var(--primary-500-rgb, 99, 102, 241), 0.03) 0%,
			transparent 50%,
			rgba(var(--primary-700-rgb, 67, 56, 202), 0.03) 100%
		);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-16);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.connect-section.visible .section-header {
		opacity: 1;
		transform: translateY(0);
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

	.section-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-4);
	}

	.section-subtitle {
		font-size: var(--font-size-xl);
		color: var(--color-text-secondary);
		max-width: 60ch;
		margin: 0 auto;
		line-height: 1.6;
	}

	.connect-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-12);
		align-items: start;
	}
	/* Contact Form */
	.contact-form-container {
		opacity: 0;
		transform: translateX(-50px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
		min-height: 400px; /* Ensure consistent height */
	}

	.connect-section.visible .contact-form-container {
		opacity: 1;
		transform: translateX(0);
	}

	.contact-form {
		padding: var(--space-8);
		border-radius: var(--radius-2xl);
		min-height: 400px; /* Match success state height */
		display: flex;
		flex-direction: column;
	}

	.form-title {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-6);
		text-align: center;
	}
	.form-group {
		margin-bottom: var(--space-6);
		flex-grow: 0;
	}

	.form-group:last-of-type {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.form-group:last-of-type textarea {
		flex-grow: 1;
		min-height: 120px;
	}

	.form-group label {
		display: block;
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: var(--space-4);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg);
		background: var(--color-surface-secondary);
		color: var(--color-text-primary);
		font-size: var(--font-size-base);
		transition: all 0.3s ease;
		resize: vertical;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--primary-500);
		box-shadow: 0 0 0 3px rgba(var(--primary-500-rgb), 0.1);
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: var(--color-text-secondary);
	}

	.submit-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-4);
		font-size: var(--font-size-base);
		font-weight: 600;
		background: var(--primary-500);
		color: white;
		border: none;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--primary-600);
		transform: translateY(-2px);
	}
	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.submit-btn.error {
		background: var(--red-500, #ef4444);
	}

	.submit-btn.error:hover:not(:disabled) {
		background: var(--red-600, #dc2626);
	}

	.form-message {
		padding: var(--space-3);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-4);
		font-size: var(--font-size-sm);
		font-weight: 500;
	}

	.form-message.error {
		background: rgba(239, 68, 68, 0.1);
		color: var(--red-600, #dc2626);
		border: 1px solid rgba(239, 68, 68, 0.2);
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* Contact Info */
	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		opacity: 0;
		transform: translateX(50px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
	}

	.connect-section.visible .contact-info {
		opacity: 1;
		transform: translateX(0);
	}

	.info-card,
	.social-card {
		padding: var(--space-6);
		border-radius: var(--radius-2xl);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.connect-section.visible .info-card,
	.connect-section.visible .social-card {
		opacity: 1;
		transform: translateY(0);
	}

	.info-card:hover,
	.social-card:hover {
		transform: translateY(-5px);
	}

	.info-title,
	.social-title {
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
	}

	.info-description,
	.social-description {
		font-size: var(--font-size-base);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-6);
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.contact-method {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4);
		border-radius: var(--radius-lg);
		background: var(--color-surface-secondary);
		text-decoration: none;
		color: inherit;
		transition: all 0.3s ease;
	}

	.contact-method:hover {
		background: var(--color-surface-tertiary);
		transform: translateY(-2px);
	}

	.method-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--primary-500);
		color: white;
		border-radius: var(--radius-lg);
		flex-shrink: 0;
	}

	.method-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.method-label {
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.method-value {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.social-links {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
	}

	.social-link {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full);
		color: var(--color-text-primary);
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.social-link:hover {
		color: var(--primary-600);
		transform: translateY(-3px);
	}

	/* Success State Styles */
	.success-state {
		min-height: 400px; /* Prevent layout shift by matching form height */
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.success-state::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			135deg,
			rgba(var(--green-500, 34, 197, 94), 0.1) 0%,
			rgba(var(--green-600, 22, 163, 74), 0.05) 100%
		);
		border-radius: var(--radius-2xl);
		animation: successGlow 3s ease-in-out infinite alternate;
	}

	@keyframes successGlow {
		0% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}

	.success-content {
		position: relative;
		z-index: 1;
		max-width: 400px;
		margin: 0 auto;
		padding: var(--space-8);
	}

	.success-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		margin: 0 auto var(--space-6);
		background: linear-gradient(135deg, var(--green-500, #22c55e), var(--green-600, #16a34a));
		border-radius: var(--radius-full);
		color: white;
		box-shadow:
			0 10px 30px rgba(var(--green-500, 34, 197, 94), 0.3),
			0 0 0 0 rgba(var(--green-500, 34, 197, 94), 0.7);
		animation: successPulse 2s infinite;
	}

	@keyframes successPulse {
		0% {
			box-shadow:
				0 10px 30px rgba(var(--green-500, 34, 197, 94), 0.3),
				0 0 0 0 rgba(var(--green-500, 34, 197, 94), 0.7);
		}
		70% {
			box-shadow:
				0 10px 30px rgba(var(--green-500, 34, 197, 94), 0.3),
				0 0 0 10px rgba(var(--green-500, 34, 197, 94), 0);
		}
		100% {
			box-shadow:
				0 10px 30px rgba(var(--green-500, 34, 197, 94), 0.3),
				0 0 0 0 rgba(var(--green-500, 34, 197, 94), 0);
		}
	}

	.success-title {
		font-size: var(--font-size-2xl);
		font-weight: 800;
		color: var(--green-600, #16a34a);
		margin-bottom: var(--space-4);
		background: linear-gradient(135deg, var(--green-600, #16a34a), var(--green-700, #15803d));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.success-message {
		font-size: var(--font-size-base);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-8);
	}

	.success-actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		align-items: center;
	}

	.success-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-6);
		font-size: var(--font-size-base);
		font-weight: 600;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		border: none;
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		min-width: 200px;
	}

	.success-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}

	.success-button:hover::before {
		left: 100%;
	}

	.success-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(var(--primary-500-rgb), 0.3);
	}

	.direct-email-link {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		text-decoration: underline;
		text-decoration-color: var(--primary-500);
		text-underline-offset: 3px;
		transition: all 0.3s ease;
	}

	.direct-email-link:hover {
		color: var(--primary-600);
		text-decoration-color: var(--primary-600);
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.connect-content {
			grid-template-columns: 1fr;
			gap: var(--space-8);
		}

		.contact-info {
			transform: translateY(50px);
		}

		.connect-section.visible .contact-info {
			transform: translateY(0);
		}
	}
	@media (max-width: 768px) {
		.connect-section {
			padding: var(--space-16) 0;
		}

		.container {
			padding: 0 var(--space-4);
		}

		.contact-form,
		.info-card,
		.social-card {
			padding: var(--space-4);
		}

		.contact-form-container,
		.contact-form,
		.success-state {
			min-height: 350px;
		}

		.success-content {
			padding: var(--space-4);
		}

		.success-icon {
			width: 60px;
			height: 60px;
			margin-bottom: var(--space-4);
		}

		.success-title {
			font-size: var(--font-size-xl);
		}

		.success-button {
			min-width: 180px;
			padding: var(--space-3) var(--space-5);
		}

		.info-title,
		.social-title {
			text-align: center;
		}

		.info-description,
		.social-description {
			text-align: center;
		}

		.section-title {
			font-size: var(--font-size-3xl);
		}

		.section-subtitle {
			font-size: var(--font-size-lg);
		}
	}
	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}

		.contact-form,
		.info-card,
		.social-card {
			padding: var(--space-3);
			border-radius: var(--radius-xl);
		}

		.contact-form-container,
		.contact-form,
		.success-state {
			min-height: 320px;
		}

		.success-content {
			padding: var(--space-3);
		}

		.success-icon {
			width: 50px;
			height: 50px;
		}

		.success-title {
			font-size: var(--font-size-lg);
		}

		.success-message {
			font-size: var(--font-size-sm);
		}

		.success-button {
			min-width: 160px;
			padding: var(--space-3) var(--space-4);
			font-size: var(--font-size-sm);
		}

		.info-title,
		.social-title {
			text-align: center;
		}

		.info-description,
		.social-description {
			text-align: center;
		}

		.contact-method {
			padding: var(--space-3);
		}

		.method-icon {
			width: 35px;
			height: 35px;
		}

		.social-link {
			width: 45px;
			height: 45px;
		}
	}
</style>
