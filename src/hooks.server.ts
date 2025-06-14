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

	return resolve(event);
};
