import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;

	// Handle static files that might be requested as blog posts
	const staticFiles = [
		'manifest.json',
		'robots.txt',
		'sitemap.xml',
		'favicon.ico',
		'favicon.png',
		'og-image.png',
		'og-image.svg'
	];

	// Check if someone is trying to access a static file through the blog route
	const blogStaticMatch = url.pathname.match(/^\/blog\/(.+)$/);
	if (blogStaticMatch) {
		const filename = blogStaticMatch[1];
		if (staticFiles.includes(filename)) {
			// Redirect to the static file location
			throw redirect(301, `/${filename}`);
		}
	}

	// Check if someone is trying to access a static file through the projects route
	const projectStaticMatch = url.pathname.match(/^\/projects\/(.+)$/);
	if (projectStaticMatch) {
		const filename = projectStaticMatch[1];
		if (staticFiles.includes(filename)) {
			// Redirect to the static file location
			throw redirect(301, `/${filename}`);
		}
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html;
		}
	});

	// Add security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-XSS-Protection', '1; mode=block');

	// Content Security Policy
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Allow inline scripts for Svelte
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net", // Allow Google Fonts and Devicon
		"img-src 'self' data: https:",
		"font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net", // Allow Google Fonts and Devicon fonts
		"connect-src 'self'",
		"media-src 'self'",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self' https://send.pageclip.co", // Allow form submission to Pageclip
		"frame-ancestors 'none'",
		'block-all-mixed-content',
		'upgrade-insecure-requests'
	].join('; ');

	response.headers.set('Content-Security-Policy', csp);

	return response;
};
