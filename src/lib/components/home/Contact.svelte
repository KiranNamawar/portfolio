<script lang="ts">
	import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from '$lib/utils/icons.js';
	import { contactInfo, socialLinks } from '../../data/personal.js';

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// For demo purposes, we'll just show success
		submitStatus = 'success';
		isSubmitting = false;

		// Reset form after success
		setTimeout(() => {
			formData = { name: '', email: '', subject: '', message: '' };
			submitStatus = 'idle';
		}, 3000);
	}
	// Icon mapping for contact methods
	const contactIcons: Record<string, any> = {
		email: Mail,
		phone: Phone,
		location: MapPin
	};

	// Icon mapping for social links
	const socialIcons: Record<string, any> = {
		GitHub: Github,
		LinkedIn: Linkedin,
		Twitter: Twitter
	};
</script>

<section class="contact-section" id="contact">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">Get In Touch</h2>
			<p class="section-subtitle">
				Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
			</p>
		</div>

		<div class="contact-content">
			<div class="contact-info">
				<div class="contact-card glass-card">
					<h3>Let's Connect</h3>
					<p>
						I'm always interested in hearing about new opportunities and exciting projects. Whether
						you have a question or just want to say hi, I'll try my best to get back to you!
					</p>
					<div class="contact-methods">
						{#each contactInfo as contact}
							<a href={contact.href} class="contact-method">
								<div class="contact-icon">
									<svelte:component this={contactIcons[contact.type]} size={20} />
								</div>
								<div class="contact-details">
									<span class="contact-label">{contact.label}</span>
									<span class="contact-value">{contact.value}</span>
								</div>
							</a>
						{/each}
					</div>

					<div class="social-links">
						<h4>Follow Me</h4>
						<div class="social-grid">
							{#each socialLinks as social}
								<a
									href={social.href}
									class="social-link"
									target="_blank"
									rel="noopener noreferrer"
									style="--social-color: {social.color}"
								>
									<svelte:component this={socialIcons[social.label]} size={20} />
									<span>{social.label}</span>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div class="contact-form-container">
				<form class="contact-form glass-card" on:submit={handleSubmit}>
					<h3>Send Me a Message</h3>

					{#if submitStatus === 'success'}
						<div class="success-message">
							<div class="success-icon">✓</div>
							<h4>Message Sent Successfully!</h4>
							<p>Thank you for reaching out. I'll get back to you soon.</p>
						</div>
					{:else}
						<div class="form-grid">
							<div class="form-group">
								<label for="name">Name *</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									disabled={isSubmitting}
									placeholder="Your full name"
								/>
							</div>

							<div class="form-group">
								<label for="email">Email *</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									required
									disabled={isSubmitting}
									placeholder="your.email@example.com"
								/>
							</div>

							<div class="form-group full-width">
								<label for="subject">Subject *</label>
								<input
									type="text"
									id="subject"
									bind:value={formData.subject}
									required
									disabled={isSubmitting}
									placeholder="What is this about?"
								/>
							</div>

							<div class="form-group full-width">
								<label for="message">Message *</label>
								<textarea
									id="message"
									bind:value={formData.message}
									required
									disabled={isSubmitting}
									placeholder="Tell me about your project or question..."
									rows="6"
								></textarea>
							</div>
						</div>

						<button type="submit" class="submit-btn" disabled={isSubmitting}>
							{#if isSubmitting}
								<div class="loading-spinner"></div>
								Sending...
							{:else}
								<Send size={18} />
								Send Message
							{/if}
						</button>
					{/if}
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-section {
		padding: 5rem 0;
		position: relative;
	}

	.contact-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(
			circle at 70% 70%,
			rgba(var(--primary-500), 0.05) 0%,
			transparent 50%
		);
		pointer-events: none;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		position: relative;
		z-index: 1;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: 3rem;
		font-weight: 700;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}

	.section-subtitle {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.contact-content {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 4rem;
		align-items: start;
	}

	.glass-card {
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		border-radius: 1rem;
		padding: 2.5rem;
		box-shadow: 0 8px 32px var(--glass-shadow);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.glass-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 40px var(--glass-shadow);
	}

	.contact-card h3,
	.contact-form h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 1.5rem;
	}

	.contact-card p {
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: 2rem;
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2.5rem;
	}

	.contact-method {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: rgba(var(--primary-500), 0.05);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		text-decoration: none;
		color: var(--color-text-primary);
		transition: all 0.3s ease;
	}

	.contact-method:hover {
		background: rgba(var(--primary-500), 0.1);
		border-color: var(--primary-400);
		transform: translateX(4px);
	}

	.contact-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--primary-500);
		color: white;
		border-radius: 0.5rem;
		flex-shrink: 0;
	}

	.contact-details {
		display: flex;
		flex-direction: column;
	}

	.contact-label {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.contact-value {
		color: var(--color-text-primary);
		font-weight: 600;
	}

	.social-links h4 {
		font-size: 1.125rem;
		color: var(--color-text-primary);
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.social-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.social-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 0.5rem;
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		text-decoration: none;
		color: var(--color-text-primary);
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.3s ease;
		text-align: center;
	}

	.social-link:hover {
		background: var(--social-color);
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(var(--social-color), 0.3);
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	.form-group label {
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.form-group input,
	.form-group textarea {
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
		font-size: 1rem;
		transition: all 0.3s ease;
		resize: vertical;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--primary-500);
		box-shadow: 0 0 0 3px rgba(var(--primary-500), 0.1);
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: var(--color-text-secondary);
		opacity: 0.7;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(var(--primary-500), 0.4);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.loading-spinner {
		width: 18px;
		height: 18px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.success-message {
		text-align: center;
		padding: 2rem 0;
	}

	.success-icon {
		width: 60px;
		height: 60px;
		background: var(--primary-500);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0 auto 1rem;
		animation: scale 0.5s ease;
	}

	.success-message h4 {
		color: var(--color-text-primary);
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		color: var(--color-text-secondary);
		margin: 0;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes scale {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	} /* Responsive Design */
	@media (max-width: 768px) {
		.contact-content {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.container {
			padding: 0 var(--space-4);
		}

		.glass-card {
			margin: 0;
			padding: 1.5rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.social-grid {
			grid-template-columns: 1fr;
		}

		.section-title {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 var(--space-2);
		}

		.glass-card {
			padding: 1rem;
			margin: 0;
		}

		.section-title {
			font-size: 2rem;
		}

		.contact-method {
			padding: 0.75rem;
		}

		.social-link {
			padding: 0.75rem 0.5rem;
		}
	}
</style>
