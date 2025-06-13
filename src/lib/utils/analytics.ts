/**
 * Google Analytics integration utilities
 * Replace GA_MEASUREMENT_ID with your actual Google Analytics 4 measurement ID
 */

// Google Analytics 4 Measurement ID - replace with your actual ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 measurement ID

/**
 * Initialize Google Analytics
 */
export function initGA() {
	if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
		return;
	}

	// Load Google Analytics script
	const script1 = document.createElement('script');
	script1.async = true;
	script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
	document.head.appendChild(script1);

	// Initialize gtag
	const script2 = document.createElement('script');
	script2.innerHTML = `
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', '${GA_MEASUREMENT_ID}', {
			page_title: document.title,
			page_location: window.location.href
		});
	`;
	document.head.appendChild(script2);
}

/**
 * Track page views
 */
export function trackPageView(url: string, title?: string) {
	if (typeof window === 'undefined' || !window.gtag) {
		return;
	}

	window.gtag('config', GA_MEASUREMENT_ID, {
		page_path: url,
		page_title: title || document.title
	});
}

/**
 * Track custom events
 */
export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
	if (typeof window === 'undefined' || !window.gtag) {
		return;
	}

	window.gtag('event', eventName, parameters);
}

/**
 * Track blog post reads
 */
export function trackBlogRead(postTitle: string, postSlug: string) {
	trackEvent('blog_read', {
		post_title: postTitle,
		post_slug: postSlug,
		content_type: 'blog'
	});
}

/**
 * Track project views
 */
export function trackProjectView(projectTitle: string, projectSlug: string) {
	trackEvent('project_view', {
		project_title: projectTitle,
		project_slug: projectSlug,
		content_type: 'project'
	});
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText?: string) {
	trackEvent('click', {
		event_category: 'outbound',
		event_label: url,
		link_text: linkText
	});
}

/**
 * Track contact form submissions
 */
export function trackContactSubmission() {
	trackEvent('contact_form_submit', {
		event_category: 'engagement',
		event_label: 'contact_form'
	});
}

/**
 * Track search queries
 */
export function trackSearch(searchTerm: string, resultCount: number) {
	trackEvent('search', {
		search_term: searchTerm,
		result_count: resultCount
	});
}

// Extend Window interface for TypeScript
declare global {
	interface Window {
		gtag: (...args: unknown[]) => void;
		dataLayer: unknown[];
	}
}
