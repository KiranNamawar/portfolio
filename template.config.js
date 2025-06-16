// Template Configuration
// This file contains all the essential settings you need to customize when using this project as a template

export const templateConfig = {
	// ===== PERSONAL INFORMATION =====
	// Update these with your own details
	personal: {
		name: 'Your Name',
		title: 'Your Professional Title', // e.g., "Full Stack Developer", "UI/UX Designer"
		email: 'your.email@domain.com',
		location: 'Your City, Country',
		bio: 'Your professional bio or elevator pitch. Keep it concise but engaging.',

		// Professional tagline (appears on homepage)		tagline: 'Fresher full-stack developer focused on React and Node.js',

		// Years of experience (removed for fresher)
		// experience: 0, // Removed for fresher

		// Profile image
		profileImage: '/profile.svg' // Path to your profile image in static folder
	},

	// ===== SOCIAL MEDIA LINKS =====
	// Add or remove platforms as needed
	social: {
		github: 'https://github.com/yourusername',
		linkedin: 'https://linkedin.com/in/yourusername',
		twitter: 'https://twitter.com/yourusername',
		email: 'mailto:your.email@domain.com'
		// Optional: Add more platforms
		// dribbble: "https://dribbble.com/yourusername",
		// behance: "https://behance.net/yourusername",
		// instagram: "https://instagram.com/yourusername",
		// youtube: "https://youtube.com/@yourusername",
	},

	// ===== SITE METADATA =====
	site: {
		title: 'Your Name - Portfolio',
		description: 'Professional portfolio showcasing my work in web development and design',
		url: 'https://yoursite.com', // Your domain (for SEO)
		language: 'en',

		// SEO keywords
		keywords: [
			'web developer',
			'frontend developer',
			'javascript',
			'react',
			'svelte'
			// Add technologies you specialize in
		],

		// Open Graph image (for social media sharing)
		ogImage: '/og-image.svg'
	},

	// ===== SKILLS & TECHNOLOGIES =====
	skills: {
		// Frontend technologies
		frontend: [
			'JavaScript',
			'TypeScript',
			'React',
			'Svelte',
			'HTML5',
			'CSS3',
			'Tailwind CSS'
			// Add your frontend skills
		],

		// Backend technologies
		backend: [
			'Node.js',
			'Python',
			'PostgreSQL',
			'MongoDB'
			// Add your backend skills
		],

		// Tools and platforms
		tools: [
			'Git',
			'VS Code',
			'Figma',
			'Docker'
			// Add tools you use
		],

		// Soft skills (optional)
		soft: [
			'Problem Solving',
			'Team Collaboration',
			'Project Management',
			'Communication'
			// Add soft skills
		]
	},

	// ===== NAVIGATION =====
	// Customize your site navigation
	navigation: {
		// Main navigation items (appears in floating dock)
		main: [
			{ href: '/', label: 'Home', icon: 'Home' },
			{ href: '/blog', label: 'Blog', icon: 'FileText' },
			{ href: '/projects', label: 'Projects', icon: 'FolderOpen' },
			{ href: '/about', label: 'About', icon: 'User' }
			// Add custom pages:
			// { href: "/contact", label: "Contact", icon: "Mail" },
		],

		// Footer navigation (optional)
		footer: [
			{ href: '/sitemap.xml', label: 'Sitemap' },
			{ href: '/rss.xml', label: 'RSS Feed' }
			// Add footer links
		]
	},

	// ===== FEATURED CONTENT =====
	// Control what content is highlighted
	featured: {
		// Number of featured blog posts on homepage
		blogPosts: 3,

		// Number of featured projects on homepage
		projects: 3,

		// Show recent posts by default (if not enough featured content)
		fallbackToRecent: true
	},

	// ===== THEME CUSTOMIZATION =====
	// Basic theme settings (advanced users can modify CSS variables)
	theme: {
		// Primary brand color (affects links, buttons, accents)
		primaryColor: 'orange', // Options: "blue", "green", "purple", "orange", "red"

		// Default theme mode
		defaultMode: 'system', // Options: "light", "dark", "system"

		// Enable/disable features
		features: {
			darkMode: true,
			search: true,
			readingProgress: true,
			tableOfContents: true,
			codeHighlighting: true,
			animations: true
		}
	},

	// ===== BLOG SETTINGS =====
	blog: {
		// Posts per page
		postsPerPage: 10,

		// Enable/disable features
		showReadingTime: true,
		showTags: true,
		showAuthor: true, // Shows your name and profile
		enableComments: false, // Set to true if you implement comments

		// RSS feed settings
		rss: {
			title: 'Your Name - Blog',
			description: 'Latest blog posts about web development and technology'
		}
	},

	// ===== PROJECT SETTINGS =====
	projects: {
		// Projects per page
		projectsPerPage: 12,

		// Enable/disable features
		showTechnologies: true,
		showTimeline: true,
		showGallery: true,
		enableLightbox: true
	},

	// ===== CONTACT INFORMATION =====
	// Used for contact forms, footers, etc.
	contact: {
		// Display contact info
		showEmail: true,
		showLocation: true,
		showAvailability: true,

		// Availability status
		availability: {
			status: 'available', // "available", "busy", "unavailable"
			message: 'Open to new opportunities'
			// For freelancers: "Available for freelance projects"
			// For job seekers: "Open to new opportunities"
			// When busy: "Currently not taking new projects"
		},

		// Contact form (if you implement one)
		form: {
			enabled: false, // Set to true when you add a contact form backend
			endpoint: '/api/contact' // Your contact form endpoint
		}
	},

	// ===== ANALYTICS =====
	// Analytics and tracking (optional)
	analytics: {
		// Google Analytics
		googleAnalytics: {
			enabled: false,
			trackingId: 'GA_MEASUREMENT_ID' // Replace with your GA4 Measurement ID
		},

		// Plausible Analytics (privacy-friendly alternative)
		plausible: {
			enabled: false,
			domain: 'yoursite.com' // Your domain
		},

		// Simple Analytics
		simpleAnalytics: {
			enabled: false
		}
	},

	// ===== DEVELOPMENT SETTINGS =====
	// Settings for development and deployment
	development: {
		// Enable debug mode (shows extra info in development)
		debug: false,

		// Show draft content in development
		showDrafts: true,

		// Auto-reload on content changes
		autoReload: true
	}
};

// ===== USAGE INSTRUCTIONS =====
/*
To use this configuration:

1. Update all the fields above with your information
2. Import this config in your components:
   import { templateConfig } from '$lib/config/template.js';

3. Use the values throughout your app:
   <h1>{templateConfig.personal.name}</h1>
   <p>{templateConfig.personal.bio}</p>

4. For dynamic imports in Svelte components:
   export let config = templateConfig;

5. For theme colors, update CSS variables in src/styles/variables.css
   based on your primaryColor choice.

Remember to:
- Replace placeholder values with your real information
- Test all links and make sure they work
- Update the profile image and favicon
- Customize the color scheme if desired
- Deploy and test in production

Need help? Check the documentation:
- docs/getting-started/using-as-template.md
- docs/maintenance/personal-info.md
- docs/maintenance/theme-customization.md
*/

export default templateConfig;
